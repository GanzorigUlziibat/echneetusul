import { View, Text, StyleSheet, Button, Image } from "react-native";
import React from "react";
import {
  SafeAreaView,
  // SafeAreaProvider,
  // SafeAreaInsetsContext,
  // useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Aimgiin jagsaalt</Text>
      <Link
        href={{
          pathname: "/aimag/page",
          params: { id: 1, sid: 101 },
        }}
        style={styles.link}
      >
        Aimag
      </Link>
      <Link
        href={{
          pathname: "/aimagochih/page",
          params: { id: 1, sid: 101 },
        }}
        style={styles.link}
      >
        aimagochih
      </Link>
      <Link
        href={{
          pathname: "/sum/page",
          params: { id: 1, sid: 101 },
        }}
        style={styles.link}
      >
        sum
      </Link>
      <Link
        href={{
          pathname: "/sumochih/page",
          params: { aid: 1 },
        }}
        style={styles.link}
      >
        sumochih
      </Link>
      <Link
        href={{
          pathname: "/dursgalt/page",
          params: { id: 1, sid: 101 },
        }}
        style={styles.link}
      >
        dursgalt gazar
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
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
