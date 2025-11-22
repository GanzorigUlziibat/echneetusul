import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { data } from "@/app/data/data";
import { Image } from "expo-image";
import { router } from "expo-router";

const Index = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [activeCat, setactiveCat] = useState(1);

  const toggleCategory = (id: number) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  function handlePress(catid: number, sid: number) {
    router.push({
      pathname: "/subcat",
      params: { id: String(catid), sid: String(sid) },
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setactiveCat(item.id);
            }}
          >
            <View
              style={{
                borderWidth: 1,
                height: 100,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Ionicons name={item.catIcon} size={40}></Ionicons>
              <Text>{item.catName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text>{activeCat}</Text>

      <FlatList
        data={data.find((cat) => cat.id === Number(activeCat))?.subcategories}
        keyExtractor={(item) => item.sid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handlePress(activeCat, item.sid);
            }}
          >
            <View
              style={{
                height: 70,
                alignItems: "center",
                borderBottomWidth: 0.5,
                flexDirection: "row",
              }}
            >
              <Image style={{ height: 40, width: 40 }} source={item.image} />
              <Text style={{ fontSize: 20, marginLeft: 20 }}>{item.sname}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 6,
  },
  icon: {
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 18,
    flex: 1,
    fontWeight: "600",
  },

  // SUB ITEMS
  subContainer: {
    backgroundColor: "#fafafa",
    paddingVertical: 6,
    marginLeft: 40,
  },
  subItem: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "center",
  },
  subIcon: {
    marginRight: 8,
  },
  subTitle: {
    fontSize: 15,
  },
});
