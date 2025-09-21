import Colors from '@/constants/Colors';
import destinationCategories from '@/data/categories';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {  default as React, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const CategoryButtons = () => {
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex]= useState(0);
  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
  }
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        gap: 20,
        paddingVertical: 10,
        marginBottom: 10
      }}>
        {destinationCategories.map((item, index)=>(
          <TouchableOpacity key={index} ref={(el)=>{itemRef.current[index] ==el}} onPress={() => handleSelectCategory(index)}
          style={styles.categoryBtn}>
          <MaterialCommunityIcons name={item.iconName as any} size={20} color={Colors.black}/>
          <Text style={styles.categoryBtnTxt}>{item.title}</Text>
          </TouchableOpacity>
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
  },
  categoryBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 5,
    color: Colors.black,
  },
});