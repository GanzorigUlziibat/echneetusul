import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';







const Page = () => {
  return (
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => {}} style={{marginLeft: 20}}>
          <Image 
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png"
            }}
            style={{width:40, height: 40, borderRadius:10}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() =>{}} style={{
          marginRight: 20,
          backgroundColor: "black",
          padding: 10,
          borderRadius: 10,
        }}>
          <Ionicons name="notifications" size={20} color="black" />
        </TouchableOpacity>
      ),
    }} />
  )
}

export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})