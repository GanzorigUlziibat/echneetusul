import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import { MODES, Mode, useTimerSettings } from "../../TimerSettingsContext";

export default function SettingsScreen() {
  const { durations, setDurations } = useTimerSettings();

  const [pomodoro, setPomodoro] = useState(
    (durations.pomodoro / 60).toString()
  );
  const [shortBreak, setShortBreak] = useState(
    (durations.short_break / 60).toString()
  );
  const [longBreak, setLongBreak] = useState(
    (durations.long_break / 60).toString()
  );

  // context өөрчлөгдвөл input-уудыг sync
  useEffect(() => {
    setPomodoro((durations.pomodoro / 60).toString());
    setShortBreak((durations.short_break / 60).toString());
    setLongBreak((durations.long_break / 60).toString());
  }, [durations]);

  const updateDuration = (mode: Mode, value: string) => {
    const mins = parseInt(value, 10);
    if (isNaN(mins) || mins <= 0) return;

    setDurations((prev) => ({
      ...prev,
      [mode]: mins * 60,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Pomodoro (min)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pomodoro}
          onChangeText={setPomodoro}
          onBlur={() => updateDuration(MODES.POMODORO, pomodoro)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Short Break (min)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={shortBreak}
          onChangeText={setShortBreak}
          onBlur={() => updateDuration(MODES.SHORT_BREAK, shortBreak)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Long Break (min)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={longBreak}
          onChangeText={setLongBreak}
          onBlur={() => updateDuration(MODES.LONG_BREAK, longBreak)}
        />
      </View>

      <Text style={styles.hint}>
        * Input-оос гарахад (onBlur) хадгалагдана. Timer tab руу очоод Reset
        дарж шинэ хугацаагаар эхлүүлж болно.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 16,
    paddingTop: 32,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  row: {
    marginBottom: 16,
  },
  label: {
    color: "#e5e7eb",
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 16,
  },
  hint: {
    color: "#9ca3af",
    marginTop: 24,
    fontSize: 13,
  },
});
