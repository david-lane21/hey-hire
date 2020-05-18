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
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import {countries} from './utils/consts.js'
import {getUser} from './utils/utils.js';
import {postFormData} from './utils/network.js'

function SeekerEditProfile({navigation}){
  const [modalVisible, setModalVisible] = useState(false);

  function _onPress(item){
    setModalVisible(false)
    setPhCode(item.dial_code)
  }

  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [address, setAddress]     = useState('')
  const [country, setCountry]     = useState('US')
  const [state, setState]         = useState('')
  const [city, setCity]           = useState('')
  const [zipcode, setZipcode]     = useState('')
  const [phCode, setPhCode]       = useState('+1')
  const [phone, setPhone]         = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [password2, setPassword2] = useState('')

  useEffect(() => {
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)

      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('user_profile', form)
      .then(res => {
        return res.json()
      })
      .then(json => {
        // console.log(json.data)
        setProfile(json.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }, [])
  
  return(
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView>
        <View style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        // borderBottomWidth: 1, 
        // borderBottomColor: '#ccc', 
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

        <View style={{flex: 1, alignItems: 'center', padding: 20, }}>
          <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50}} />
        </View>

        <View style={styles.inputField}>
          <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={text => setFirstName(text)}
            placeholder='First Name...'
            value={firstName}
          />
        </View>

        <View style={styles.inputField}>
          <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={text => setLastName(text)}
            placeholder='Last Name...'
            value={lastName}
          />
        </View>

        <View style={styles.inputField}>
          <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={text => setAddress(text)}
            placeholder='Address...'
            value={address}
          />
        </View>

        <View style={styles.inputField}>
          <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={text => setCountry(text)}
            placeholder='Country...'
            value={country}
          />
        </View>

        <View style={styles.inputField}>
          <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={text => setState(text)}
            placeholder='State...'
            value={state}
          />
        </View>

        <View style={styles.inputField}>
          <Image source={require('../assets/ic_user.png')} style={{width: 20, height: 20}} />
          <TextInput
            style={{width: '100%', paddingLeft: 10}}
            onChangeText={text => setCity(text)}
            placeholder='City...'
            value={city}
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

        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{color: '#6E5FBD'}}>* For receiving interview calls</Text>
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
    alignItems: 'center',
    width: '25%',
  },
  code2: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    padding: 13,
    marginBottom: 15,
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
    alignItems: 'center',
    width: '60%',
    marginLeft: '5%'
  },
});
