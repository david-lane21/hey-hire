import React, {useState} from 'react'
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
  TouchableHighlight
} from 'react-native'
import {countries} from './utils/consts.js'
import {postFormData} from './utils/network.js'
import {strings} from './translation/config';

function SeekerForgotPassword({navigation}){
  const [modalVisible, setModalVisible] = useState(false);
  const [phCode, setPhCode] = useState('1')
  const [phone, setPhone] = useState('(214) 9985600')

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

  function handleRequest(){
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

  return(
    <View style={{flex: 1, alignItems:'center'}}>
      <SafeAreaView>
        <View style={{flex: 1, alignItems: 'center', paddingTop: 30, paddingBottom: 30}}>
          <Text style={{fontSize: 20}}>{strings.ENTER_PHONE_NUMBER}</Text>
          <Text style={{fontSize: 20}}>{strings.ASSOCIATED_WITH_ACCOUNT}</Text>
        </View>

        <View 
          style={{
            flex: 1, 
            alignItems: 'center',
            padding: 20}}>
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
            {/* </SafeAreaView> */}
          </Modal>
        
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={styles.code} onPress={() => setModalVisible(true)}>
              <Image source={require('../assets/ic_phone.png')} style={{width: 20, height: 20, marginRight: 5}} />
              <Text style={{color: '#4E35AE'}}>+{phCode}</Text>
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

        <View style={{flex: 1, alignItems: 'center', padding: 20}}>
          <TouchableOpacity 
          style={{width:'100%', backgroundColor: '#4834A6', paddingTop: 15, paddingBottom: 15, borderRadius: 25,height:52}}
          onPress={() => handleRequest()}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>{strings.SEND}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 8}}></View>

      </SafeAreaView>
    </View>
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
    borderRadius: 25,
    borderColor: '#4E35AE',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: '#4E35AE',
    width: '25%',
    height: 40,
    backgroundColor: '#fff'
  },
  code2: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: '#4E35AE',
    borderWidth: 1,
    padding: 10,
    color: '#4E35AE',
    width: '70%',
    height: 40,
    marginLeft: '5%',
    backgroundColor: '#fff'
  },
  code3: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    width: '100%',
    height: 40,
    // marginBottom: 20
  }
});