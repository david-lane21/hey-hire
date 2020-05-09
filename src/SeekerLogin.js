import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, SafeAreaView, Image, TouchableOpacity, BackHandler} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from "native-base";
import {countries} from './utils/consts.js'

function SeekerLogin({ navigation }){
  const [phCode, setPhCode] = useState('+1')

  function handleLogin(){
    console.log('+++++++++++++++++')
  }
  return(
    <LinearGradient style={styles.container} colors={['#4E35AE', '#775ED7']}>
      <SafeAreaView style={{flex: 1, width: '90%'}}>
        <View style={{flex: 2, alignItems: 'flex-start'}}>
          <TouchableOpacity
          style={{height: 30, width: 40}}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../assets/ic_back_w.png')} 
              style={{
                width: 40, 
                height: 30, 
                marginTop: 20,
                // position: 'absolute', 
                // left: 0,
                // top: 20
                }} />
          </TouchableOpacity>
        </View>
      
        <View style={{flex: 6, alignItems: 'center'}}>
          <Image source={require('../assets/logo_white_2.png')} style={{width: 150, height: 170, marginTop: 0}} />
        </View>
        
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 18}}>Log in as a job seeker</Text>
        </View>

        <View style={{flex: 3, alignItems: 'center'}}>
          <Picker
            mode="dropdown"
            iosHeader="Country"
            // iosIcon={<Icon name="arrow-down" />}
            style={{ }}
            selectedValue={phCode}
            onValueChange={(val) => setPhCode(val)}
          >
            {countries.map(cnty => {
              return(
                <Picker.Item key={cnty.code} label={cnty.name + '   ' + cnty.dial_code} value={cnty.code} />
              )
            })}
          </Picker>
        </View>

        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity 
          style={{width:'100%', backgroundColor: '#fff', paddingTop: 12, paddingBottom: 12, borderRadius: 10, backgroundColor: '#fff'}}
          onPress={() => handleLogin()}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#4834A6'}}>Login</Text>
          </TouchableOpacity>

        </View>

        <View style={{flex: 3, alignItems: 'center'}}>
          <Text
              style={{marginLeft: 6, color: '#fff', textDecorationLine: 'underline', fontSize: 16}}
              onPress={() => navigation.navigate('ForgotPassword')}
            >Forgot you password?</Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: 16}}>Dont have an account yet?</Text>
          <Text
            style={{marginLeft: 6, color: '#fff', textDecorationLine: 'underline', fontSize: 16}}
            onPress={() => navigation.navigate('SeekerSignup')}
            >Sign up</Text>
        </View>
        
        <View style={{flex: 3, alignItems: 'center'}}></View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SeekerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'flex-start'
  },
});