import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";
import { Audio } from "expo-av";
import { MODES, Mode, useTimerSettings } from "../../TimerSettingsContext";

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function PomodoroScreen() {
  const { durations } = useTimerSettings(); // 👈 Context-оос уншиж байна

  const [mode, setMode] = useState<Mode>(MODES.POMODORO);
  const [secondsLeft, setSecondsLeft] = useState<number>(
    durations[MODES.POMODORO]
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedPomos, setCompletedPomos] = useState<number>(0);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const soundRef = useRef<Audio.Sound | null>(null);

  // ⏱ Timer loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          handleTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  // durations өөрчлөгдөхөд, таймер зогсонги (pause) байвал шинэ утгаар нь sync хийх
  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(durations[mode]);
    }
  }, [durations, mode, isRunning]);

  // Sound preload
  useEffect(() => {
    let isMounted = true;

    const loadSound = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          allowsRecordingIOS: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/beep.mp3")
        );

        if (isMounted) {
          soundRef.current = sound;
        }
      } catch (e) {
        console.log("Error loading sound:", e);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      } else {
        console.log("Sound not loaded yet");
      }
    } catch (error) {
      console.log("Sound error:", error);
    }
  };

  const handleTimerEnd = () => {
    setIsRunning(false);
    playSound(); // 🔔

    if (mode === MODES.POMODORO) {
      setCompletedPomos((prev) => prev + 1);
    }
  };

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setSecondsLeft(durations[nextMode]); // 👈 context-ийн durations ашиглаж байна
    setIsRunning(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    return `${mm}:${ss}`;
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: newTask.trim(), done: false },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const resetTimer = () => {
    setSecondsLeft(durations[mode]); // 👈
    setIsRunning(false);
  };
  const bgColor =
    mode === MODES.POMODORO
      ? "#ba4949" // улаан
      : mode === MODES.SHORT_BREAK
      ? "#38858a" // ногоон-хөх
      : "#397097"; // цэнхэр

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.inner}>
        {/* Title */}
        <Text style={styles.title}>Pomodoro Clone</Text>

        {/* Mode tabs */}
        <View style={styles.modeContainer}>
          <ModeButton
            label="Pomodoro"
            active={mode === MODES.POMODORO}
            onPress={() => switchMode(MODES.POMODORO)}
          />
          <ModeButton
            label="Short Break"
            active={mode === MODES.SHORT_BREAK}
            onPress={() => switchMode(MODES.SHORT_BREAK)}
          />
          <ModeButton
            label="Long Break"
            active={mode === MODES.LONG_BREAK}
            onPress={() => switchMode(MODES.LONG_BREAK)}
          />
        </View>

        {/* Timer */}
        <View style={styles.timerCard}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>

          {/* Start / Pause */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setIsRunning((prev) => !prev)}
          >
            <Text style={styles.mainButtonText}>
              {isRunning ? "PAUSE" : "START"}
            </Text>
          </TouchableOpacity>

          {/* Reset */}
          <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>

          <Text style={styles.counterText}>
            Pomodoros finished: {completedPomos}
          </Text>
        </View>

        {/* Tasks */}
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>Tasks</Text>

          <View style={styles.addTaskRow}>
            <TextInput
              style={styles.input}
              placeholder="What are you working on?"
              placeholderTextColor="#ddd"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <FlatList<Task>
            data={tasks}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No tasks yet. Add one to stay focused.
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.taskRow}>
                <TouchableOpacity onPress={() => toggleTask(item.id)}>
                  <View
                    style={[styles.checkbox, item.done && styles.checkboxDone]}
                  >
                    {item.done && <Text style={styles.checkboxCheck}>✓</Text>}
                  </View>
                </TouchableOpacity>
                <Text
                  style={[styles.taskText, item.done && styles.taskTextDone]}
                >
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

type ModeButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function ModeButton({ label, active, onPress }: ModeButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.modeButton, active && styles.modeButtonActive]}
    >
      <Text
        style={[styles.modeButtonText, active && styles.modeButtonTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  modeContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 999,
    padding: 4,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  modeButtonActive: {
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  modeButtonText: {
    color: "#eee",
    fontSize: 14,
    fontWeight: "500",
  },
  modeButtonTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  timerCard: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    color: "#fff",
    fontSize: 64,
    fontWeight: "700",
    letterSpacing: 4,
    marginBottom: 16,
  },
  mainButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginBottom: 8,
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#ba4949",
  },
  resetButton: {
    marginBottom: 8,
  },
  resetText: {
    color: "#f5f5f5",
    opacity: 0.8,
  },
  counterText: {
    color: "#f5f5f5",
    opacity: 0.8,
    marginTop: 8,
  },
  tasksContainer: {
    flex: 1,
    marginTop: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  addTaskRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#ba4949",
    fontWeight: "700",
  },
  emptyText: {
    color: "#eee",
    opacity: 0.7,
    marginTop: 8,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#eee",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  checkboxCheck: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  taskText: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  deleteText: {
    color: "#ffdddd",
    fontSize: 16,
    marginLeft: 8,
  },
});
