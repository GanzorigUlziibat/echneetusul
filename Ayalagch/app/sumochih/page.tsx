import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { sumDB, db } from "@/app/database/sum";
import { useLocalSearchParams, Link } from "expo-router";
import Checkbox from "expo-checkbox"; //expo install expo-checkbox
import { Ionicons } from "@expo/vector-icons";

export default function SumList() {
  const [sums, setSums] = useState<any[]>([]);
  const { aid } = useLocalSearchParams();
  const aimagid = Number(aid);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    sumDB(); // хүснэгт үүсгэж өгөгдөл нэмэх
    const rows = getSums(); // SQLite → бүх сумыг унших
    setSums(rows);
  }, []);

  const getSums = () => {
    return db.getAllSync(`SELECT * FROM sum where aid=${aimagid}`);
  };
  const toggleCheck = (sid: number) => {
    setChecked((prev) => ({ ...prev, [sid]: !prev[sid] }));
  };

  const filteredSums = sums.filter((item) =>
    item.sname.toLowerCase().includes(search.toLowerCase())
  );
  const handleSave = () => {
    const selected = sums.filter((s) => checked[s.sid]);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.saveIconButton} onPress={handleSave}>
        <Ionicons name="save" size={22} color="#fff" />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Сумын нэрээр хайх "
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={sums}
        keyExtractor={(item) => item.sid.toString()}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.sname}</Text>
              <Text>Аймаг ID: {item.aid}</Text>
              <Text numberOfLines={2}>{item.swiki}</Text>
            </View>
            <Pressable
              style={[
                styles.checkbox,
                checked[item.sid] && styles.checkboxChecked,
              ]}
              onPress={() => toggleCheck(item.sid)}
            >
              {checked[item.sid] && <Text style={styles.checkboxTick}>✓</Text>}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#1f2937",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fff",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#4b5563",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  checkboxChecked: {
    backgroundColor: "#4b5563",
  },
  checkboxTick: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
});
