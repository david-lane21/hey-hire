import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

function SeekerLogin({ navigation }){
  return(
    <View style={styles.container}>
      <Text>SeekerLogin</Text>

      
      <Button
        title="Signup"
        onPress={() => navigation.navigate('SeekerSignup')}
      />
    </View>
  )
}

export default SeekerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});