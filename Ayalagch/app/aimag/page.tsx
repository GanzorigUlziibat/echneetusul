import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { aimagDB, getAimags } from "@/app/database/aimag";

export default function App() {
  const [aimags, setAimags] = useState<any[]>([]);

  useEffect(() => {
    aimagDB();
    const rows = getAimags();
    setAimags(rows);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Аймгийн жагсаалт
      </Text>

      <FlatList
        data={aimags}
        keyExtractor={(item) => item.aid.toString()}
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
              {item.aname}
            </Text>
            <Text>{item.awiki}</Text>
          </View>
        )}
      />
    </View>
  );
}
