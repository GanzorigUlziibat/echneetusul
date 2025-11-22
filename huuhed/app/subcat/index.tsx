import { View, Text, StyleSheet, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import {data} from "@/app/data/data"
import {SafeAreaView} from "react-native-safe-area-context";

const index = () => {
  const params = useLocalSearchParams();
  const [datas, setDatas] = useState(data);
  useEffect (() =>{
     const result = data
     .find(cat => cat.id === Number(params.id))
     ?.subcategories.find(sub => sub.sid === Number(params.sid));
     console.log(result);
    //  setDatas(result);
  }, []
  ) 

 
  return (
     <SafeAreaView style={styles.container}>
    <View>

      <Text>id: {datas
     .find(cat => cat.id === Number(params.id))?.subcategories.find(sub => sub.sid === Number(params.sid))?.sname}</Text>

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
});