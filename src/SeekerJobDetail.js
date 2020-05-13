import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function SeekerJobDetail({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>SeekerJobDetail</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SeekerJobDetail;