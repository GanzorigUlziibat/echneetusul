import { View, Text, StyleSheet, Button, Image } from "react-native";
import React from "react";
import {
  SafeAreaView,
  // SafeAreaProvider,
  // SafeAreaInsetsContext,
  // useSafeAreaInsets,
} from "react-native-safe-area-context";
import { data } from "@/app/data/data";
import { Link } from "expo-router";

const index = () => {
  function handleCat() {}

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.row}>
        <Image
          source={require("../../assets/img/img1.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/img/img3.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.mainView}>
        <Link
          href={{
            pathname: "/cat",
            // params: { id: "bacon" },
          }}
          style={styles.link}
        >
          CAT
        </Link>
        <Link
          href={{
            pathname: "/subcat",
            params: { id: 1, sid: 101 },
          }}
          style={styles.link}
        >
          SUBCAT
        </Link>
        <Link
          href={{
            pathname: "/item",
            params: { id: 1, sid: 101, iid: 1011 },
          }}
          style={styles.link}
        >
          ITEM
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainView: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  link: { marginTop: 30, fontSize: 40 },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
});
