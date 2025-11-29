// app/subcat/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { data } from "@/app/data/data";
import { SafeAreaView } from "react-native-safe-area-context";

const SubcatPage = () => {
  const { id, sid } = useLocalSearchParams();

  const catId = Number(id);
  const subId = Number(sid);

  const sub =
    data
      .find(cat => cat.id === catId)
      ?.subcategories.find(s => s.sid === subId);

  if (!sub) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Өгөгдөл олдсонгүй</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{sub.sname}</Text>

      <FlatList
        data={sub.items}
        keyExtractor={item => String(item.iid)}
        numColumns={2}                       // ⬅️ 2 багана – утасанд багтана
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/item",
              params: {
                id: String(catId),
                sid: String(subId),
                iid: String(item.iid),
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.iname}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

export default SubcatPage;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, backgroundColor: "#f3f3f3" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
});
