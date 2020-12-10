import React from 'react'
import {
  StyleSheet, 
  View, 
  Image, 
  Text, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {strings} from './translation/config';
const window = Dimensions.get("window");

function HomeScreen({ navigation }){

  return(
    <View style={{flex:1, flexDirection: 'column', backgroundColor: '#F1F2F9'}}>
      <View style={{ flexDirection: 'row',height:window.height-250}}>
        <Image 
        style={{width:'100%',height:'100%', borderBottomLeftRadius: 8,borderBottomRightRadius:8,opacity:1}}
        source={require('../assets/home-screen-header.png')} 
        resizeMode={'cover'}
        />      
        
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#F1F2F9'}}>
        <Text style={{paddingTop: 10, fontSize: 20, color: '#4834A6'}}> {strings.I_WANT_TO_USE}</Text>
      </View>

      <View style={{ flexDirection: 'column', backgroundColor: '#F1F2F9'}}>
        <View style={{ paddingHorizontal: 25,marginTop:20}}>
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('SeekerLogin')}>
            <Image source={require('../assets/ic_user_dark.png')} style={{height: 20, width: 20}} />
  <Text style={{fontSize: 20, color: '#4834A6', marginTop: 5}}>{strings.JOB_SEEKER}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('BusinessLogin')}>
            <Image source={require('../assets/ic_open_black.png')} style={{height: 25, width: 25}} />
            <Text style={{fontSize: 20, color: '#4834A6', marginTop: 0}}>{strings.EMPLOYER}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
          onPress={() => navigation.navigate('TestLinks')}>
            <Text style={{fontSize: 20, color: '#4834A6', marginTop: 5}}>Test Links</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    //flex: 1,
    // flexDirection: 'column',
    height:70,
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
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
    elevation:5
  }
});
