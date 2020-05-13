import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function BusinessSeekerProfile({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>BusinessSeekerProfile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BusinessSeekerProfile;