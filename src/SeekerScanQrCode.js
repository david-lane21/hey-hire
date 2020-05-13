import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function SeekerScanQrCode({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>SeekerScanQrCode</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SeekerScanQrCode;