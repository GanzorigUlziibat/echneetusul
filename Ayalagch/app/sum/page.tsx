import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { sumDB, db } from "@/app/database/sum";

export default function SumList() {
  const [sums, setSums] = useState<any[]>([]);

  useEffect(() => {
    sumDB(); // хүснэгт үүсгэж өгөгдөл нэмэх
    const rows = getSums(); // SQLite → бүх сумыг унших
    setSums(rows);
  }, []);

  const getSums = () => {
    return db.getAllSync("SELECT * FROM sum");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Сумдын жагсаалт
      </Text>

      <FlatList
        data={sums}
        keyExtractor={(item) => item.sid.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.sname}
            </Text>
            <Text>Аймаг ID: {item.aid}</Text>
            <Text>{item.swiki}</Text>
          </View>
        )}
      />
    </View>
  );
}
