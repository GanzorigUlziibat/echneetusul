import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';



const Page = () => {
  return (
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => {}}>
          <Image 
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png"
            }}
            style={{width:40, height: 40, borderRadius:10}}
          />
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