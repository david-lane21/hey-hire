import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function SeekerAppliedJobs({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>SeekerAppliedJobs</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SeekerAppliedJobs;