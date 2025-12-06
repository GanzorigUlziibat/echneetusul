import { useEffect, useState } from "react";
import { aimagDB, db } from "@/app/database/aimag";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLocalSearchParams, Link,router } from "expo-router";
import Checkbox from "expo-checkbox"; //expo install expo-checkbox
import { Ionicons } from "@expo/vector-icons";

export default function aList() {
  const [aimag, setAimag] = useState<any[]>([]);
  const { aid } = useLocalSearchParams();
  const aimagid = Number(aid);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    // aimagDB(); // хүснэгт үүсгэж өгөгдөл нэмэх
    const rows = getaimag(); // SQLite → бүх сумыг унших
    
    setAimag(rows);



  loadChecked();


    
  }, []);

  const getaimag = () => {
    return db.getAllSync(`SELECT * FROM aimag`);
  };
       
  
const loadChecked = () => {
  try {
    const res = db.getAllSync("SELECT aid, agone FROM aimag");
    // getAllSync => шууд rows array
    console.log('load check');
    console.log('res = ', res);

    const rows = res || [];  // энд res нь массив

    const initialState: { [key: number]: boolean } = {};

    rows.forEach((row: any) => {
      initialState[row.aid] = row.agone === 1;
    });

    setChecked(initialState);
  } catch (e) {
    console.log('load error', e);
  }
};


  const toggleCheck = (aid: number) => {
    setChecked((prev) => ({ ...prev, [aid]: !prev[aid] }));
    console.log(checked);
  };
   const handleSave = async () => {
    console.log("handla save");
    console.log(aimag);
    try {
      for (const aid in checked) {
        const agone = checked[aid] ? 1 : 0;
        await db.runAsync(
        "UPDATE aimag SET agone = ? WHERE aid = ?",
        [agone, aid]
      );
      }
      console.log("Updated successfully");

    } catch (error) {
      console.log("Update error: ", error);
    }
  };
  return (
    <View style={styles.container}>

      <Pressable style={styles.saveIconButton} onPress={()=>{handleSave();  router.replace('/aimag/page')}}>

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
        data={aimag}
        keyExtractor={(item) => item.aid.toString()}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.aname}</Text>
              <Text>Аймаг ID: {item.aid}</Text>
              {/* <Text numberOfLines={2}>{item.swiki}</Text> */}
            </View>
            <Pressable
              style={[
                styles.checkbox,
                checked[item.aid] && styles.checkboxChecked,
              ]}
              onPress={() => toggleCheck(item.aid)}
            >
              {checked[item.aid] && <Text style={styles.checkboxTick}>✓</Text>}
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
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
});
