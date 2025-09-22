import { StyleSheet, View, Text, FlatList } from 'react-native'
import React from 'react'

type Props = {
    listings: any[]
}

const Listings = ({listings}: Props) => {
    
    const renderItems = ({item}) => {
        return (
            <View>
                <Text>(item.)</Text>
            </View> 
        );
    }
    return (
    <View>
      <FlatList data={listings} renderItem={renderItems} />
    </View>
  )
}

export default Listings

const styles = StyleSheet.create({})