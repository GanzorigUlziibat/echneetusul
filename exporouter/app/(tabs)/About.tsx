import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  FlatList,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { fetchData, ResponseInterface } from "../../utils/needful";
import AntDesign from "@expo/vector-icons/AntDesign";

const About = () => {
  const [response, setResponse] = useState<ResponseInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const data = await fetchData({
        //url: "http://127.0.0.1:8000/user/",
        url: "http://echnee.mandakh.org/user/",
        method: "POST",
        body: { action: "getdata" },
      });
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <Text style={styles.title}>{item.catname_mn}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.bagts} bagts</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        {item["subcat"].map((subcat, index) => (
          <Text>{subcat.subname_en}</Text>
        ))}
      </View>
    </View>
  );

  const keyExtractor = (item: any) => item.cid.toString();

  if (loading)
    return <ActivityIndicator size="large" style={styles.centered} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;
  if (response?.resultCode !== 1006 || !response?.data?.length)
    return <Text style={styles.noDataText}>No data available.</Text>;

  return (
    <FlatList
      data={response.data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default About;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
