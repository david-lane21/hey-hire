import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function ForgotPassword({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>ForgotPassword</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword;