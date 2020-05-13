import React from 'react'
import {
  StyleSheet, 
  View, 
  Image, 
  Text, 
  TouchableOpacity
} from 'react-native'

function HomeScreen({ navigation }){

  return(
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F2F9'}}>
      <View style={{flex: 6, flexDirection: 'column'}}>
        <Image 
        style={{height: '100%', width: '100%', borderRadius: 8}}
        source={require('../assets/home-screen-header.png')} />
      </View>

      <View style={{flex: 0.5, flexDirection: 'column', alignItems: 'center', backgroundColor: '#F1F2F9'}}>
        <Text style={{paddingTop: 20, fontSize: 20, color: '#4834A6'}}> I want to use apployMe as a</Text>
      </View>

      <View style={{flex: 3, flexDirection: 'column', backgroundColor: '#F1F2F9'}}>
        <View style={{flex: 1, padding: 25}}>
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('SeekerLogin')}>
            <Image source={require('../assets/ic_user_dark.png')} style={{height: 20, width: 20}} />
            <Text style={{fontSize: 20, color: '#4834A6', marginTop: 5}}>Job Seeker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('BusinessLogin')}>
            <Image source={require('../assets/ic_open_black.png')} style={{height: 20, width: 25}} />
            <Text style={{fontSize: 20, color: '#4834A6', marginTop: 5}}>Employer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate('TestLinks')}>
            <Text style={{fontSize: 20, color: '#4834A6', marginTop: 5}}>Test Links</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    padding: 15,
    backgroundColor: '#F1F2F9',
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#aaa',
    shadowRadius: 10,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0
    },
  }
});
