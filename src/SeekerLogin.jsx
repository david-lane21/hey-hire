import React from 'react'
import {View, Text, Button} from 'react-native'

function SeekerLogin({ navigation }){
  return(
    <View>
      <Text>SeekerLogin</Text>
      <Button
        title="Signup"
        onPress={() => navigation.navigate('SeekerSignup')}
      />
    </View>
  )
}

export default SeekerLogin;