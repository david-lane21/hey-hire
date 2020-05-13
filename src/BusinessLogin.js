import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function BusinessLogin({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>BusinessLogin</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BusinessLogin;