import React from 'react'
import {StyleSheet, ImageBackground, View, Text, Button} from 'react-native'

function HomeScreen({ navigation }){
  let bgImage = require('../assets/splash.png')
  return(
    <View style={styles.container}>
      {/* <View>
        <ImageBackground source={bgImage} style={{height: '400'}}>

        </ImageBackground>
      </View> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});
