import React, {useState} from 'react'
import {View, Text, Link, Button, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import {countries} from './utils/consts.js'

function SeekerLogin({ navigation }){
  const [phCode, setPhCode] = useState('+1')
  return(
    <Container style={styles.container}>
      <LinearGradient
          colors={['#4E35AE', '#775ED7']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // height: '100%',
          }}
        />

      <SafeAreaView>
        <TouchableOpacity
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
      </SafeAreaView>
      
      <Content>
        <View style={{}}>
          <Image source={require('../assets/logo_white_2.png')} style={{width: 150, height: 170, marginTop: 30}} />
        </View>
        
        <View style={{}}>
          <Text style={{color: '#fff', fontSize: 18}}>Log in as a job seeker</Text>
        </View>

        <Form>
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
        </Form>

        <View>
          <Text
              style={{marginLeft: 6, color: '#fff', textDecorationLine: 'underline', fontSize: 16}}
              onPress={() => navigation.navigate('ForgotPassword')}
            >Forgot you password?</Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 16}}>Dont have an account yet?</Text>
          <Text
            style={{marginLeft: 6, color: '#fff', textDecorationLine: 'underline', fontSize: 16}}
            onPress={() => navigation.navigate('SeekerSignup')}
          >Sign up</Text>
        
        </View>
      </Content>
      
    </Container>
  )
}

export default SeekerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#775ED7',
  },
});