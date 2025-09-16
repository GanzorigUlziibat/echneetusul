import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { StyleSheet } from 'react-native';
import destinationCategories from '@/SharedFiles/Categories';

const CategoryButtons = () => {
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView>
        {destinationCategories.map((item, index)=>(
          <Text>item.title</Text>
        ))}
      </ScrollView>
    </View>
  )
}

export default CategoryButtons
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black

  }
})