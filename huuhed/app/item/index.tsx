import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { data } from "@/app/data/data";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ItemPage() {
  const { id, sid, iid } = useLocalSearchParams();

  const catId = Number(id);
  const subId = Number(sid);
  const itemId = Number(iid);

  const sub =
    data
      .find(cat => cat.id === catId)
      ?.subcategories.find(s => s.sid === subId);

  const items = sub?.items ?? [];

  const initialIndex = Math.max(
    items.findIndex((it) => it.iid === itemId),
    0
  );

  if (!sub) return <Text>Өгөгдөл олдсонгүй</Text>;

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔵 ДЭЭД ХЭСЭГ (ТОВШ → BACK) */}
      <Pressable
        style={styles.topBackArea}
        onPress={() => router.back()}
      >
        {/* Хоосон, харагдахгүй */}
      </Pressable>

      {/* 🔵 SWIPE БҮС */}
      <View style={styles.swipeArea}>
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.iid)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.page, { width: SCREEN_WIDTH }]}>
              <Text style={styles.title}>{item.iname}</Text>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // 🔵 ДЭЭД ТАЛД ДАРВАЛ — BACK
  topBackArea: {
    height: 120,         // ← ДЭЭД ХЭСЭГ (өндөрийг хүсвэл нэм/хас)
    width: "100%",
  },

  // 🔵 SWIPE бүс — дээд хэсэгт дарахад огт саад болохгүй
  swipeArea: {
    flex: 1,
    justifyContent: "center",
  },

  page: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  image: {
    width: 260,
    height: 260,
    borderRadius: 20,
  },
});
