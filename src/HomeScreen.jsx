import React from 'react'
import {View, Text, Button} from 'react-native'

function HomeScreen({ navigation }){
  return(
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Job Seeker"
        onPress={() => navigation.navigate('SeekerLogin')}
      />
      <Button
        title="Employer"
        onPress={() => navigation.navigate('BusinessLogin')}
      />
    </View>
  )
}

export default HomeScreen;