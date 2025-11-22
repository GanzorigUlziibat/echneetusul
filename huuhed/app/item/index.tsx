import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { data } from "../data/data";

export default function ItemPage() {
  const params = useLocalSearchParams();

  const catId = Number(params.id);
  const subId = Number(params.sid);
  const itemId = Number(params.iid);

  const ugugdul =
    data
      .find(cat => cat.id === catId)
      ?.subcategories.find(sub => sub.sid === subId)
      ?.items.find(it => it.iid === itemId);
  if (!ugugdul) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Өгөгдөл олдсонгүй</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ flex: 1 }}
      activeOpacity={1}
    >
      <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
          {ugugdul.iname}
        </Text>

        <Image
          source={{ uri: ugugdul.image }}
          style={{
            width: 260,
            height: 260,
            borderRadius: 12,
            marginBottom: 20,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
