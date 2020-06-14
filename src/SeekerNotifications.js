import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

function SeekerNotifications({navigation}){
  return(
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text  style={{color: '#6F5EC0', fontSize: 16, fontWeight: 'bold'}}>Notifications</Text>
        </View>

        <View style={{flex: 1, marginTop: 30}}>
          <Text  style={{color: '#999', fontSize: 13, paddingLeft: 20}}>Notifications</Text>
        </View>

        <View style={{flex: 1, marginTop: 200}}>
          <Text  style={{color: '#999', fontSize: 13, textAlign: 'center'}}>No notification yet!</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SeekerNotifications;