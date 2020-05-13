import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function SeekerEditProfile({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>SeekerEditProfile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SeekerEditProfile;