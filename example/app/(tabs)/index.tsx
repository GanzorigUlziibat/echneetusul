import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons/";
import React from "react";

const index = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          marginBottom: 5,
          backgroundColor: "#42c41bff",
          width: "100%",
          flexDirection: "row",
          // flex: 1,
        }}
      >
        <View
          style={{
            width: 50,
            backgroundColor: "#929475",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed");
            }}
            onLongPress={() => {
              console.log("LongPressed");
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#978caaff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{}}>BBB</Text>
        </View>
        <View
          style={{
            width: 50,
            backgroundColor: "#929475",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>CCC</Text>
        </View>
      </View>
      <Text style={styles.txt}>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  txt: { color: "green" },
});
