import React, {useState} from 'react'
import {
  View, 
  Text, 
  TextInput, 
  Picker, 
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal, 
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import {countries} from './utils/consts.js'
import {postFormData} from './utils/network.js'

function SeekerSignup({ navigation }){
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError]         = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [address, setAddress]     = useState('')
  const [country, setCountry]     = useState('US')
  const [state, setState]         = useState('')
  const [city, setCity]           = useState('')
  const [zipcode, setZipcode]     = useState('')
  const [phCode, setPhCode]       = useState('1')
  const [phone, setPhone]         = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [password2, setPassword2] = useState('')
  
  function _onPress(item){
    setModalVisible(false)
    setPhCode(item.dial_code)
  }

  function _onPress2(item){
    setModalVisible(false)
    setCountry(item.name)
    setPhCode(item.dial_code)
  }

  function deviceToken(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
  function handleSignup(){
    let token = deviceToken(128)
    let form = new FormData()
    form.append('first_name', firstName)
    form.append('last_name', lastName)
    form.append('address', address)
    form.append('email', email)
    form.append('city', city)
    form.append('state', state)
    form.append('country', country)
    form.append('phone', phCode + ' ' + phone)
    form.append('user_type', '2')
    form.append('password', password)
    form.append('device_tocken', token)
    
    postFormData('user_register', form)
    .then(res => {
      return res.json()
    })
    .then(json => {
      console.log(json)
      if(json.status_code == '300'){
        // setUser(json.data)
        // setToken(token)
        setError(json.msg)
      }else{
        setError('')
        console.log(json)
        navigation.navigate('HomeScreen')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  // function onSelectCountry(country){
  //   setCountry(country);
  //   setPhCode(country);
  // }

  return(
    <ScrollView style={styles.container}>
      <SafeAreaView>

      <View style={{height: 140, width: '100%', alignContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/img_place.png')} style={{height: 110, width: 110}} />
      </View>

      <View style={styles.inputField}>
        <Image source={require('../assets/ic_user.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setFirstName(text)}
          placeholder='First Name...'
          value={firstName}
        />  
      </View>

      

      <View style={styles.inputField}>
        <Image source={require('../assets/ic_user.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setLastName(text)}
          placeholder='Last Name...'
          value={lastName}
        />
      </View>

      <View style={styles.inputField}>
        <Image source={require('../assets/ic_address.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setAddress(text)}
          placeholder='Address'
          value={address}
        />
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
                      onPress={() => _onPress2(item)}
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
          <TouchableOpacity style={styles.inputField} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/ic_country.png')} style={{width: 20, height: 20, marginRight: 5}} />
            <Text style={{}}>{country}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputField}>
        <Image source={require('../assets/ic_country.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setState(text)}
          placeholder='State'
          value={state}
        />
      </View>

      
      <View style={styles.inputField}>
        <Image source={require('../assets/ic_country.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setCity(text)}
          placeholder='City'
          value={city}
        />
      </View>
      

      <View style={styles.inputField}>
        <Image source={require('../assets/ic_zip.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setZipcode(text)}
          placeholder='Zipcode'
          value={zipcode}
        />
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
            <Text style={{}}>+{phCode}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.code2}
            onChangeText={text => setPhone(text)}
            placeholder='Phone'
            value={phone}
          />
        </View>
      </View>
        

      
      
      <Text style={{color: '#7364BF', paddingTop: 10, paddingBottom: 20}}>* For recieving interview calls</Text>

      <View style={styles.inputField}>
        <Image source={require('../assets/ic_zip.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setEmail(text)}
          placeholder='Email'
          value={email}
          type='email'
        />
      </View>

      
      <View style={styles.inputField}>
        <Image source={require('../assets/ic_password.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setPassword(text)}
          placeholder='Enter Password'
          value={password}
          secureTextEntry={true}
        />
      </View>
  
      
      <View style={styles.inputField}>
        <Image source={require('../assets/ic_password.png')} style={{height: 20, width: 20}} />
        <TextInput
          style={{paddingLeft: 10, width: '100%', color: '#000'}}
          onChangeText={text => setPassword2(text)}
          placeholder='Confirm Password'
          value={password2}
          secureTextEntry={true}
        />
      </View>

      {error ? (
        <View style={{flex: 1, padding: 20}}>
          <Text style={{color: 'red'}}>{error}</Text>
        </View>
        
      ) : null}
    
      <View style={{flex: 1}}>
        <TouchableOpacity 
        style={{
          flex: 1, 
          alignContent: 'center',
          backgroundColor: '#5B42BB',
          padding: 15,
          borderRadius: 30
        }}
        onPress={() => handleSignup()}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 18}}>Create account</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
    </ScrollView>
  )
}

export default SeekerSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'white',
  },
  inputField: {
    // height: 40,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0
    },
    alignItems: 'flex-start',
  },
  code: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    // color: '#fff',
    width: '25%',
    height: 40,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0
    },
  },
  code2: {
    color: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    // color: '#fff',123
    width: '70%',
    height: 40,
    marginLeft: '5%',
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0
    },
  },
});
