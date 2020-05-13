import React, {useState} from 'react'
import {
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TextInput, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  TouchableHighlight
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {countries} from './utils/consts.js'
import {postFormData} from './utils/network.js'
import {
  setUser,
  setToken,
} from './utils/utils.js';

function BusinessLogin({navigation}){
  const [modalVisible, setModalVisible] = useState(false);
  const [phCode, setPhCode] = useState('1')
  const [phone, setPhone] = useState('(214) 9985600')
  const [password, setPassword] = useState('12345678')

  function _onPress(item){
    setModalVisible(false)
    setPhCode(item.dial_code)
  }

  function deviceToken(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
  function handleLogin(){
    let token = deviceToken(128)
    let form = new FormData()
    form.append('phone', phCode + ' ' + phone)
    form.append('password', password)
    form.append('user_type', '1')
    form.append('device_tocken', token)
    
    postFormData('user_login', form)
    .then(res => {
      return res.json()
    })
    .then(json => {
      // setUser(json.data)
      // setToken(token)
      console.log(json.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  return(
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, width: '90%'}}>
        <View style={{
          flex: 2, 
          alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{height: 30, width: 40}}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../assets/ic_back2.png')} 
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
      
        <View style={{
          flex: 6, 
          alignItems: 'center'}}>
          <Image 
            source={require('../assets/logo.png')} 
            style={{
              width: 200, 
              height: 140, 
              marginTop: 0}} />
        </View>
        
        <View 
          style={{
            flex: 1, 
            alignItems: 'center'}}>
          <Text 
            style={{
              color: '#4834A6', 
              fontSize: 18}}>Log in as a business</Text>
        </View>

        <View 
          style={{
            flex: 2, 
            alignItems: 'center'}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}>
            <SafeAreaView>
              <View style={{ marginTop: 22 }}>
                <View>
                  <FlatList
                    // ItemSeparatorComponent={<Separator />}
                    data={countries}
                    keyExtractor={(item) => item.code}
                    renderItem={({item, index, separators}) => (
                      <TouchableHighlight
                        key={index}
                        onPress={() => _onPress(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{backgroundColor: 'white'}}>
                          <View style={{
                            flex: 1, 
                            flexDirection: 'row', 
                            justifyContent:'space-between', 
                            padding: 10, 
                            borderBottomWidth: 1, 
                            borderBottomColor: '#eee',
                            
                            }}>
                            <Text style={{
                              fontSize: 20, 
                              color: '#222'}}>{item.name}</Text>
                            <Text style={{
                              fontSize: 20, 
                              color: '#666'}}>+{item.dial_code}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    )}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={styles.code} onPress={() => setModalVisible(true)}>
              <Image source={require('../assets/ic_call.png')} style={{width: 20, height: 20, marginRight: 5}} />
              <Text style={{color: '#4834A6'}}>+{phCode}</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.code2}
              onChangeText={text => setPhone(text)}
              placeholder='Phone'
              value={phone}
            />
          </View>
        </View>

        <View style={{flex: 2}}>
          <TextInput
              style={styles.code3}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              placeholder='Password'
              value={password}
            />
        </View>

        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity 
          style={{width:'100%', backgroundColor: '#4834A6', paddingTop: 12, paddingBottom: 12, borderRadius: 10,}}
          onPress={() => handleLogin()}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 3, alignItems: 'center'}}>
          <Text
              style={{
                marginLeft: 6, 
                color: '#4834A6', 
                textDecorationLine: 'underline', 
                fontSize: 16}}
              onPress={() => navigation.navigate('ForgotPassword')}
            >Forgot you password?</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: "#4834A6", fontSize: 20}}>Dont have an account?</Text>
        </View>

        <View style={{
          flex: 1, 
          alignItems: 'center'
          }}>
          <Text
            style={{
              marginLeft: 6, 
              color: '#4834A6', 
              textDecorationLine: 'underline', 
              fontSize: 16}}
            onPress={() => navigation.navigate('SeekerSignup')}
            >Register Your Business</Text>
        </View>
        
        <View style={{flex: 3, alignItems: 'center'}}></View>
      </SafeAreaView>
    </View>
  )
}

export default BusinessLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'flex-start'
  },
  code: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: '#4834A6',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: '#4834A6',
    width: '25%',
    height: 40
  },
  code2: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: '#4834A6',
    borderWidth: 1,
    padding: 10,
    color: '#4834A6',
    width: '70%',
    height: 40,
    marginLeft: '5%'
  },
  code3: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: '#4834A6',
    borderWidth: 1,
    padding: 10,
    color: '#4834A6',
    width: '100%',
    height: 40,
    // marginBottom: 20
  }
});