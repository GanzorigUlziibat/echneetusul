import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { sumDB, db } from "@/app/database/sum";

export default function SumList() {
  const [sums, setSums] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      await sumDB();
      const rows = await db.getAllAsync(
        `SELECT 
           aimag.aid,
           aname,
           awiki,
           COUNT(sid) AS niitsum,
           SUM(IIF(sgone = 1, 1, 0)) AS ochsonsum
         FROM aimag 
         INNER JOIN sum ON aimag.aid = sum.aid 
         GROUP BY aimag.aid`
      );

      setSums(rows);
    };

    init();
  }, []);

  const totalNiit = sums.reduce((acc, cur) => acc + (cur.niitsum ?? 0), 0);
  const totalOchson = sums.reduce((acc, cur) => acc + (cur.ochsonsum ?? 0), 0);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>{}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Зочилсон сумууд
      </Text>
      {}
      <FlatList
        data={sums}
        keyExtractor={(item) => item.aid.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#f0f0f0",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.aname}</Text>
            <Text style={{ fontSize: 16 }}>
              {item.ochsonsum} / {item.niitsum}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
