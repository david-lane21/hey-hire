import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { countries } from './utils/consts.js'
import { postFormData } from './utils/network.js'
import { strings } from './translation/config';
import DeviceInfo from 'react-native-device-info';
const isIphoneX = DeviceInfo.hasNotch();
const window = Dimensions.get("window");

function SeekerForgotPassword({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [phCode, setPhCode] = useState('1')
  const [phone, setPhone] = useState('(214) 9985600')

  function _onPress(item) {
    setModalVisible(false)
    setPhCode(item.dial_code)
  }

  function deviceToken(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  function handleRequest() {
    let token = deviceToken(128)
    let form = new FormData()
    form.append('phone', phCode + ' ' + phone)
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

  return (
    <LinearGradient style={styles.container} colors={["#4E35AE", "#775ED7"]}>
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', height: window.height, position: 'absolute', top: 0, left: 0 }}>
          <Image
            style={{ width: '100%', height: '100%', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, opacity: 1 }}
            source={require('../assets/home-bg-1.png')}
            resizeMode={'cover'}
          />

        </View>



        <View
          style={{
            alignItems: "center",
            marginHorizontal: "5%",
            marginTop: '10%',
            marginVertical: 20
          }}
        >
          <Image
            source={require("../assets/home-logo.png")}
            style={{
              width: 150,
              height: 150,
              marginTop: 0,
              opacity: 1,
            }}
            resizeMode={"stretch"}
          />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{strings.FORGOT_YOUR_PASSWORD}</Text>
        </View>

        <View style={{ alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>{strings.ENTER_PHONE_NUMBER}</Text>
          <Text style={{ fontSize: 20, color: '#fff' }}>{strings.ASSOCIATED_WITH_ACCOUNT}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            padding: 20
          }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
            }}>
            {/* <SafeAreaView> */}
            <View style={{ marginTop: 22 }}>
              <View>
                <FlatList
                  // ItemSeparatorComponent={<Separator />}
                  data={countries}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => _onPress(item)}
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}>
                      <View style={{ backgroundColor: 'white' }}>
                        <View style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: '#eee',

                        }}>
                          <Text style={{
                            fontSize: 20,
                            color: '#222'
                          }}>{item.name}</Text>
                          <Text style={{
                            fontSize: 20,
                            color: '#666'
                          }}>+{item.dial_code}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )}
                />
              </View>
            </View>
            {/* </SafeAreaView> */}
          </Modal>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.code} onPress={() => setModalVisible(true)}>
              <Image source={require('../assets/ic_call-1.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
              <Text style={{ color: '#fff' }}>+{phCode}</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.code2}
              onChangeText={text => setPhone(text)}
              placeholder={strings.PHONE_NUMBER}
              value={phone}
              textContentType="telephoneNumber"
            />
          </View>
        </View>

        {/* <View style={{ alignItems: 'center', padding: 20}}>
          <TouchableOpacity 
          style={{width:'100%', backgroundColor: '#4834A6', paddingTop: 15, paddingBottom: 15, borderRadius: 25,height:52}}
          onPress={() => handleRequest()}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>{strings.SEND}</Text>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity style={styles.button}
          onPress={() => handleRequest()}>

          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{strings.SEND}</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#fff' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }} >{strings.GO_BACK}</Text>

            </TouchableOpacity>

          </View>
        </View>



      </SafeAreaView>
    </LinearGradient>
  )
}

export default SeekerForgotPassword;

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
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: 'red',
    width: '25%',
    height: 40,
  },
  code2: {
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    width: '70%',
    height: 40,
    marginLeft: '5%',
  },
  code3: {
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    width: '100%',
    height: 40,
    // marginBottom: 20
  },
  button: {
    //flex: 1,
    // flexDirection: 'column',
    // height:70,
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    paddingVertical: 15,
    backgroundColor: '#F1F2F9',
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20
  }
});