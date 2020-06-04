import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  StyleSheet,
  View, 
  Modal,
  Image,
  FlatList,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {countries} from './utils/consts.js'
import {getUser, getToken} from './utils/utils.js';
import {postFormData} from './utils/network.js'

function SeekerEditProfile({navigation}){
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError]               = useState('')

  const [user, setUser] = useState({})
  const [deviceToken, setDeviceToken] = useState('')
  const [profile, setProfile] = useState({})
  const [image, setImage] = useState(null);

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

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    // console.log(image)
  };

  function _onPress(item){
    setModalVisible(false)
    setCountry(item.name)
    setPhCode(item.dial_code)
  }

  function _onPress2(item){
    setModalVisible(false)
    setPhCode(item.dial_code)
    setCountry(item.name)
  }

  useEffect(() => {
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)
      getToken().then(t => setDeviceToken(t))
      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('user_profile', form)
      .then(res => {
        return res.json()
      })
      .then(json => {
        setProfile(json.data)
        let p = json.data.phone.split(' ')
        let p1 = p[0].replace(/\+/g, '')
        let p2 = p[1] + ' ' + p[2]
        setFirstName(json.data.first_name)
        setLastName(json.data.last_name)
        setAddress(json.data.address)
        setCountry(json.data.country)
        setState(json.data.state)
        setCity(json.data.city)
        setZipcode(json.data.zip_code)
        setPhCode(p1)
        setPhone(p2)
        setEmail(json.data.email)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }, [])

  function handleUpdate(){
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
    form.append('user_token', user.user_token)
    form.append('user_id', user.user_id)
    form.append('device_tocken', deviceToken)
    form.append('avatar_image', image)
    
    postFormData('update_user', form)
    .then(res => {
      return res.json()
    })
    .then(json => {
      console.log(json)
      if(json.status_code != '200'){
        // setUser(json.data)
        // setToken(token)
        setError(json.msg)
      }else{
        setError('Profile updated')
        // console.log(json)
      }
    })
    .catch(err => {
      console.log(err)
    })
  
  }
  
  return(
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView>
        <View style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20
        }}>
          <View style={{width: '25%', marginLeft: 15}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../assets/ic_back.png')} style={{width: 28, height: 22}} />
            </TouchableOpacity>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{ color: '#4834A6', fontSize: 18}}>EDIT YOUR PROFILE</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', padding: 20, }}>
            <View style={{width: 150, height: 150, alignSelf: 'center'}}>
              {/* <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}} /> */}
              {image == null ? 
                <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}} /> :
                <Image source={{uri: image}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}} />
                }
              <TouchableOpacity onPress={pickImage} style={{position: 'absolute', top: 0, right: 0}}>
                <Image source={require('../assets/ic_camera.png')} style={{width: 60, height: 60,}} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputField}>
            <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setFirstName(text)}
              placeholder='First Name...'
              value={firstName}
            />
          </View>

          <View style={styles.inputField}>
            <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setLastName(text)}
              placeholder='Last Name...'
              value={lastName}
            />
          </View>

          <View style={styles.inputField}>
            <Image source={require('../assets/ic_address.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setAddress(text)}
              placeholder='Address...'
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
                              color: '#000'}}>+{item.dial_code}</Text>
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
            <Image source={require('../assets/ic_country.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setState(text)}
              placeholder='State...'
              value={state}
            />
          </View>

          <View style={styles.inputField}>
            <Image source={require('../assets/ic_country.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setCity(text)}
              placeholder='City...'
              value={city}
            />
          </View>

          <View style={styles.inputField}>
            <Image source={require('../assets/ic_zip.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setZipcode(text)}
              placeholder='Zip...'
              value={zipcode}
            />
          </View>

          <View style={{flex: 1,}}>
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
                                color: '#000'}}>+{item.dial_code}</Text>
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

          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{color: '#6E5FBD'}}>* For receiving interview calls</Text>
          </View>

          <View style={styles.inputField}>
            <Image source={require('../assets/ic_mail.png')} style={{height: 20, width: 20}} />
            <TextInput
              style={{paddingLeft: 10, width: '100%', color: '#000'}}
              onChangeText={text => setEmail(text)}
              placeholder='Email'
              value={email}
              type='email'
            />
          </View>

      </View>

        <View style={{}}>
          {error ? <Text style={{color: 'red', padding: 20}}>{error}</Text> : null}
          <TouchableOpacity 
          style={{
            flex: 1, 
            alignContent: 'center',
            backgroundColor: '#5B42BB',
            padding: 15,
            
          }}
          onPress={() => handleUpdate()}>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 18}}>Update Profile</Text>
          </TouchableOpacity>
        </View>
        


      </SafeAreaView>
    </ScrollView>
  )
}

export default SeekerEditProfile;


const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    padding: 13,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  code: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    padding: 13,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1, 
    flexDirection: 'row',
    // alignItems: 'center',
    // width: '25%',
  },
  code2: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#eee',
    padding: 13,
    marginBottom: 15,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 4, 
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '50%',
    marginLeft: 5
  },
});
