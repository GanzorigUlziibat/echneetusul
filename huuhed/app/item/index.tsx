import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";

const index = () => {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>ITEM</Text>
      <Text>id: {params.id}</Text>
      <Text>sid: {params.sid}</Text>
      <Text>sid: {params.iid}</Text>
    </View>
  );
};

export default index;
