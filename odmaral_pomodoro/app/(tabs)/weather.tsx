import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";

type GeoResult = {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
};

type WeatherResult = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
};

type DailyForecast = {
  date: string;
  max: number;
  min: number;
};

export default function WeatherScreen() {
  const [city, setCity] = useState("Ulaanbaatar");
  const [location, setLocation] = useState<GeoResult | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ----------------- COMMON FETCH LOGIC (lat, lon) -----------------
  const fetchWeatherForCoordinates = async (
    latitude: number,
    longitude: number,
    displayName?: string,
    country?: string
  ) => {
    setError(null);
    setWeather(null);
    setForecast([]);

    // Location name
    setLocation(
      displayName
        ? { name: displayName, country, latitude, longitude }
        : { name: "Your location", country: undefined, latitude, longitude }
    );

    // 2️⃣ Call Open-Meteo for current weather + 5-day forecast
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;

    const weatherResp = await fetch(url);
    const weatherData = await weatherResp.json();

    if (!weatherData.current_weather) {
      setError("No weather data");
      return;
    }

    const current: WeatherResult = weatherData.current_weather;
    setWeather(current);

    if (weatherData.daily) {
      const d = weatherData.daily;
      const daily: DailyForecast[] = d.time.map((t: string, idx: number) => ({
        date: t,
        max: d.temperature_2m_max[idx],
        min: d.temperature_2m_min[idx],
      }));
      setForecast(daily);
    }
  };

  // ----------------- Search by city name -----------------
  const fetchWeatherByCity = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast([]);
    setLocation(null);

    try {
      // 1️⃣ Geocoding API (city → lat/lon)
      const geoResp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city.trim()
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoResp.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found");
        return;
      }

      const first: GeoResult = geoData.results[0];
      await fetchWeatherForCoordinates(
        first.latitude,
        first.longitude,
        first.name,
        first.country
      );
    } catch (e) {
      console.log("Weather error:", e);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ----------------- GPS байршлаар авах -----------------
  const fetchWeatherByLocation = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast([]);
    setLocation(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = pos.coords;

      await fetchWeatherForCoordinates(latitude, longitude);
    } catch (e) {
      console.log("Location weather error:", e);
      setError("Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  const formatWeatherCode = (code: number) => {
    if (code === 0) return "Clear sky";
    if ([1, 2].includes(code)) return "Mostly clear";
    if (code === 3) return "Cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Unknown";
  };

  // ------ 5-day forecast graph-д зориулж maxTemp авах ------
  const maxTemp = forecast.length ? Math.max(...forecast.map((f) => f.max)) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Weather </Text>

        {/* Search Row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter city "
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.btn} onPress={fetchWeatherByCity}>
            <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* GPS Button */}
        <TouchableOpacity
          style={[styles.btn, styles.gpsBtn]}
          onPress={fetchWeatherByLocation}
        >
          <Text style={styles.btnText}>My location</Text>
        </TouchableOpacity>

        {loading && <Text style={styles.loading}>Loading...</Text>}

        {error && <Text style={styles.error}>{error}</Text>}

        {/* Current Weather + Lottie */}
        {weather && location && (
          <View style={styles.result}>
            <Text style={styles.cityName}>
              {location.name}
              {location.country ? `, ${location.country}` : ""}
            </Text>

            {/* Lottie Animation */}
            <WeatherAnimation code={weather.weathercode} />

            <Text style={styles.temp}>{weather.temperature}°C</Text>
            <Text style={styles.small}>
              Condition: {formatWeatherCode(weather.weathercode)}
            </Text>
            <Text style={styles.small}>Wind: {weather.windspeed} m/s</Text>
            <Text style={styles.time}>Time: {weather.time}</Text>
          </View>
        )}

        {/* 5-day forecast graph */}
        {forecast.length > 0 && (
          <View style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>5-day Forecast</Text>

            <View style={styles.graphRow}>
              {forecast.map((item) => {
                const barHeight = maxTemp ? (item.max / maxTemp) * 100 : 0;
                const dayLabel = item.date.slice(5); // "MM-DD"

                return (
                  <View key={item.date} style={styles.graphItem}>
                    <Text style={styles.graphTemp}>{item.max.toFixed(0)}°</Text>
                    <View style={styles.graphBarWrapper}>
                      <View
                        style={[styles.graphBar, { height: `${barHeight}%` }]}
                      />
                    </View>
                    <Text style={styles.graphDay}>{dayLabel}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ------------- Lottie Animation Component -------------
function WeatherAnimation({ code }: { code: number }) {
  // default: sunny
  let source = require("../../assets/lottie/sunny.json");

  if ([3, 45, 48].includes(code)) {
    source = require("../../assets/lottie/cloudy.json");
  } else if ([61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
    source = require("../../assets/lottie/rain.json");
  }

  return (
    <LottieView
      source={source}
      autoPlay
      loop
      style={{ width: 150, height: 150, marginBottom: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fff",
    marginRight: 8,
  },
  btn: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    height: 44,
  },
  gpsBtn: {
    marginTop: 8,
    alignSelf: "flex-end",
    flex: 1,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  loading: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
  },
  error: {
    color: "#f87171",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    alignItems: "center",
  },
  cityName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  temp: {
    color: "#3b82f6",
    fontSize: 48,
    fontWeight: "700",
    marginVertical: 8,
  },
  small: {
    color: "#d1d5db",
    fontSize: 16,
    marginTop: 4,
  },
  time: {
    color: "#9ca3af",
    marginTop: 8,
    fontSize: 13,
  },
  forecastContainer: {
    marginTop: 24,
  },
  forecastTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  graphRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  graphItem: {
    alignItems: "center",
    flex: 1,
  },
  graphTemp: {
    color: "#e5e7eb",
    fontSize: 12,
    marginBottom: 4,
  },
  graphBarWrapper: {
    height: 100,
    width: 16,
    borderRadius: 8,
    backgroundColor: "#1f2937",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  graphBar: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 8,
  },
  graphDay: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
  },
});
