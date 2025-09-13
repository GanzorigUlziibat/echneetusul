import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Page = () => {
  return (
    <view style={styles.container}>
      <text>Category</text>
    </view>
  )
}

export default Page
const styles = Stylesheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})