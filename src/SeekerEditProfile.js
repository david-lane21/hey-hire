import React, {useState, useEffect} from 'react'
import {
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
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {educationLevels, countries, languages} from './utils/consts.js'
import {getUser, setUser, getToken} from './utils/utils.js';
import {postFormData} from './utils/network.js'
import RNPickerSelect from 'react-native-picker-select';
import { useIsFocused } from "@react-navigation/native";


function SeekerEditProfile({navigation}){
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [error, setError]               = useState('')
  const [search, setSearch]             = useState('')
  const [filteredLangs, setFilteredLangs] = useState(languages)

  const [user, setUser1] = useState({})
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
  const [bio, setBio]             = useState('')
  const [skills, setSkills]       = useState([])
  const [eduLevel, setEduLevel]   = useState('')
  const [langs, setlangs]         = useState('')
  const [eligible, setEligible]   = useState(false)
  const [sixteen, setSixteen]     = useState(false)

  const [institution, setInstitution]   = useState('')
  const [certificate, setCertificate]   = useState('')
  const [convictions, setConvictions]   = useState(false)
  const [availability, setAvailability] = useState('')
  const [positions, setPositions]       = useState([])


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

  function dateFormat(date){
    if (date){
      let d = date.split('-')
      return `${d[1]}.${d[2]}.${d[0]}`
     }else{
       return ""
     }
  }

  function formatPhone(str){
    let cleaned = str.replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{3})(\d+)$/)
    if (match){
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return str
  }
  
  function isLangSelected(lang){
    let langList = langs.split(',').map(i => i.trim()).filter(i => i != '')
    return langList.includes(lang)
  }

  function removeFromLangs(item){
    let langList = langs.split(',').map(i => i.trim()).filter(i => i != '')
    langList = langList.filter(i => i !== item).join(', ')
    setlangs(langList)
  }

  function addToLangs(item){
    let langList = langs.split(',').map(i => i.trim()).filter(i => i != '')
    langList.push(item)
    langList = langList.join(', ')
    setlangs(langList)
  }

  function searchLangs(txt) {
    let text = txt.toLowerCase()
    setSearch(text)
    if (text == ''){
      setFilteredLangs(languages)
    }else{
      let langList = languages.filter(j => j.toLowerCase().includes(text))
      setFilteredLangs(langList)
    }
  }
  
  function toggleConvictions(){
    setConvictions(!convictions)
  }

  function toggleEligible(){
    setEligible(!eligible)
  }

  function toggleSixteen(){
    setSixteen(!sixteen)
  }

  function _availability(item){
    setAvailability(item)
  }

  function _edulevel(item){
    setEduLevel(item)
  }

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

  function _onPress3(item){
    setModalVisible2(false)
  }

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused){
      loadDate()
    }
  }, [isFocused]);

  function loadDate(){
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser1(u2)
      getToken().then(t => setDeviceToken(t))
      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('user_profile', form)
      .then(res => {
        // console.log('step 1')
        return res.json()
      })
      .then(json => {
        // console.log('step 2')
        // console.log(json.data)
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
        setBio(json.data.bio)
        setSkills(json.data.skill)
        setEduLevel(json.data.education_level)
        setInstitution(json.data.education)
        setCertificate(json.data.certificate)
        setImage(json.data.avatar_image)
        if(json.data.language){
          setlangs(json.data.language)
        }else{
          setlangs('')
        }
        
        setAvailability(json.data.availability)
        setEligible(json.data.eligible)
        setSixteen(json.data.sixteen)
        setConvictions(json.data.convictions)
        setPositions(json.data.position)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  function handleUpdate(){
    let form = new FormData()
    form.append('first_name', firstName)
    form.append('last_name', lastName)
    form.append('address', address)
    form.append('email', email)
    form.append('city', city)
    form.append('bio', bio)
    form.append('zip_code', zipcode)
    form.append('state', state)
    form.append('country', country)
    form.append('phone', phCode + ' ' + phone)
    form.append('user_type', '2')
    form.append('user_token', user.user_token)
    form.append('user_id', user.user_id)
    form.append('device_tocken', deviceToken)
    if (image){
      form.append('avatar_image', {uri: image, name: 'avatar.jpg', type: 'image/jpeg'})
    }
    
    form.append('availability', availability)
    form.append('education', institution)
    form.append('education_level', eduLevel)
    form.append('certificate', certificate)
    form.append('language', langs)
    form.append('eligible', eligible)
    form.append('sixteen', sixteen)
    form.append('convictions', convictions)
    

    postFormData('update_user', form)
    .then(res => {
      return res.json()
    })
    .then(json => {
      // console.log(json)
      if(json.status_code != '200'){
        setError(json.msg)
      }else{
        setUser(json.data)
        // navigation.goBack()
        navigation.navigate('Seeker')
      }
    })
    .catch(err => {
      console.log(err)
    })
  
  }
  
  
  return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20
        }}>
          <View style={{width: '25%', marginLeft: 15}}>
            <TouchableOpacity onPress={() => navigation.navigate('Seeker')}>
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
                <View>
                { user.avatar_image == "" ? <Image source={require('../assets/img_place.png')} style={{height: 100, width: 100, borderRadius: 50, alignSelf: 'center'}} /> 
                  :
                  <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}} />
                }
                </View>
                :
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
                <Image source={require('../assets/ic_phone.png')} style={{width: 20, height: 20, marginRight: 5}} />
                <Text style={{}}>+{phCode}</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.code2}
                onChangeText={text => setPhone(text)}
                placeholder='Phone'
                value={formatPhone(phone)}
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

          <View style={{flex: 1}}>
            <View style={{flex: 1, padding: 20}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/icon_note.png')} style={{width: 12, height: 12}} />
                <Text style={{paddingLeft: 10, fontSize: 18}}>Bio</Text>
              </View>
              <TextInput
                style={{width: '100%', color: '#666'}}
                onChangeText={text => setBio(text)}
                placeholder='Bio'
                value={bio}
                multiline={true}
                editable={true}
              />
            </View>
          </View>


          <View style={{flex: 1}}>
            <View style={{flex: 1, padding: 20}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/ic_star.png')} style={{width: 12, height: 12}} />
                <Text style={{paddingLeft: 10, fontSize: 18}}>Skills</Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'flex-start'}}
              >
                {skills.map(s => <Text key={s} style={{color: '#3482FF', borderWidth: 1, borderColor: '#3482FF', padding: 3, borderRadius: 3, marginBottom: 3, marginLeft: 3}}>{s}</Text>)}
                <Text key="Enter skill" style={{color: '#999'}}>Enter skill</Text>
              </View>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View>
              <Text style={{fontSize: 18, paddingLeft: 20}}>Level of Education</Text>
              <View style={styles.code}>
                <Image source={require('../assets/ic_educate.png')} style={{width: 20, height: 20, marginRight: 5}} />
                <RNPickerSelect
                  onValueChange={(value) => _edulevel(value)}
                  value={eduLevel}
                  items={educationLevels.map((i) => {
                    return(
                      { 
                        label: i + '                                                                                                ', 
                        value: i 
                      }
                    )
                  })}
              />
              </View>
            </View>
          </View>


          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, paddingLeft: 20}}>Name of Institution</Text>
            <View style={styles.code}>
              <Image source={require('../assets/ic_educate.png')} style={{width: 20, height: 20, marginRight: 5}} />
              <TextInput
                style={{width: '100%', color: '#000'}}
                onChangeText={text => setInstitution(text)}
                placeholder='Bio'
                value={institution}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, paddingLeft: 20}}>Certification (Optional)</Text>
            <View style={styles.code}>
              <Image source={require('../assets/ic_file_number.png')} style={{width: 17, height: 17, marginRight: 5}} />
              <TextInput
                style={{width: '100%', color: '#000'}}
                onChangeText={text => setCertificate(text)}
                placeholder='Bio'
                value={certificate}
              />
            </View>
          </View>


          <View style={{flex: 1}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible2}
              onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
            }}>
              <SafeAreaView>
                <View style={{marginTop: 22, height: '89%' }}>
                  <View>
                    <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center',
                    paddingBottom: 20,
                    paddingTop: 20
                    }}>
                      <View style={{width: '20%', marginLeft: 15}}>
                        <TouchableOpacity onPress={() => setModalVisible2(false)}>
                          <Image source={require('../assets/ic_back.png')} style={{width: 28, height: 22}} />
                        </TouchableOpacity>
                      </View>
                      <View style={{width: '60%'}}>
                        <Text style={{ color: '#4834A6', fontSize: 18}}>ADD YOUR LANGUAGES</Text>
                      </View>
                      <View style={{width: '60%'}}>
                        <TouchableOpacity onPress={() => setModalVisible2(false)}>
                          <Text style={{ color: '#4834A6', fontSize: 18}}>Done</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{width: '85%', margin: 20, backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd'}}>
                      <View style={{width: '15%'}}>
                        <Image source={require('../assets/ic_search.png')} style={{position: 'absolute'}}/>
                      </View>
                      <View style={{width: '70%', paddingLeft: 20}}>
                        <TextInput
                        style={{width: '100%', paddingLeft: 10, color: '#000'}}
                        onChangeText={text => searchLangs(text)}
                        placeholder='Search...'
                        value={search} />

                      </View>
                    </View>

                    <FlatList
                      // ItemSeparatorComponent={<Separator />}
                      data={filteredLangs}
                      keyExtractor={(item) => item.code}
                      renderItem={({item, index, separators}) => (
                        <View
                          key={index}
                          onPress={() => _onPress3(item)}
                          onShowUnderlay={separators.highlight}
                          onHideUnderlay={separators.unhighlight}>
                          <View style={{backgroundColor: 'white'}}>
                            <View style={{
                              flex: 1, 
                              flexDirection: 'row', 
                              alignItems: 'center',
                              padding: 10, 
                              borderBottomWidth: 1, 
                              borderBottomColor: '#eee',
                              
                              }}>
                              {isLangSelected(item) ?
                              <TouchableOpacity onPress={() => removeFromLangs(item)}>
                                <Image source={require('../assets/ic_selected.png')} style={{width: 17, height: 17, marginRight: 10, marginLeft: 20}} />
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => addToLangs(item)}>
                                <Image source={require('../assets/ic_add_blue.png')} style={{width: 17, height: 17, marginRight: 10, marginLeft: 20}} />
                              </TouchableOpacity>
                              }
                              
                              
                              <Text style={{
                                fontSize: 20, 
                                color: '#222'}}>{item}</Text>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Text style={{fontSize: 18, paddingLeft: 20}}>Language</Text>
            <TouchableOpacity style={styles.code} onPress={() => setModalVisible2(true)}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../assets/ic_language.png')} style={{width: 17, height: 17, marginRight: 5}} />
                <Text style={{width: '100%', color: '#000'}}>{langs}</Text>
              </View>
            </TouchableOpacity>

          </View>

        <View style={{flex: 1}}>
          <View>
            <Text style={{fontSize: 18, paddingLeft: 20}}>Availability</Text>
            <View style={styles.code}>
              <Image source={require('../assets/ic_educate.png')} style={{width: 20, height: 20, marginRight: 5}} />
              <RNPickerSelect
                  onValueChange={(value) => _availability(value)}
                  value={availability}
                  items={[
                      { label: 'Full Time                                                                                                ', value: 'Full Time' },
                      { label: 'Part Time                                                                                                ', value: 'Part Time' },
                      { label: 'Flexible                                                                                                ', value: 'Flexible' },
                  ]}
              />
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity 
          style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}
          onPress={() => toggleEligible()}>
            {eligible ?
            <Image source={require('../assets/checkbox_checked.png')} style={{width: 25, height: 25, marginRight: 5}} />
            :
            <Image source={require('../assets/checkbox_blank.png')} style={{width: 25, height: 25, marginRight: 5}} />
            }
            <Text style={{paddingLeft: 5, color: '#3482FF'}}>Are you eligible to work in the United States?</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity 
          style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}
          onPress={() => toggleSixteen()}>
            {sixteen ?
            <Image source={require('../assets/checkbox_checked.png')} style={{width: 25, height: 25, marginRight: 5}} />
            :
            <Image source={require('../assets/checkbox_blank.png')} style={{width: 25, height: 25, marginRight: 5}} />
            }
            <Text style={{paddingLeft: 5, color: '#3482FF'}}>Are you at least 16 years of age?</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity 
          style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}
          onPress={() => toggleConvictions()}>
            {convictions ?
            <Image source={require('../assets/checkbox_checked.png')} style={{width: 25, height: 25, marginRight: 5}} />
            :
            <Image source={require('../assets/checkbox_blank.png')} style={{width: 25, height: 25, marginRight: 5}} />
            }
            <View style={{flex: 1}} >
              <Text style={{paddingLeft: 5, color: '#3482FF'}}>Have you ever been convicted of a crime other</Text>  
              <Text style={{paddingLeft: 5, color: '#3482FF'}}>than a minor traffic violation?</Text>  
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginBottom: 30}}>
          <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20, marginTop: 20, paddingBottom: 20, alignItems: 'center'}}>
            <Image source={require('../assets/ic_past_positions.png')} style={{width: 20, height: 20, marginRight: 5}} />
            <Text style={{fontSize: 18, }}>Past positions (Optional)</Text>
          </View>
          <View style={{flex: 1}}>
            {positions.map(p => {
              return(
                <View key={p.category + p.company_name + p.city_name} style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingBottom: 20}}>
                  <View style={{width: '10%',paddingRight: 20}}>
                    <Image source={require('../assets/ic_edit.png')} style={{width: 20, height: 20, marginRight: 5}} />
                  </View>
                  <View style={{width: '90%'}}>
                    <Text style={{color: '#999', fontSize: 12}}>{dateFormat(p.from_date)} - {dateFormat(p.to_date)}</Text>
                    <Text style={{fontSize: 14, width: '90%'}}>{p.category}, {p.company_name}, {p.city_name} </Text>
                  </View>
                </View>
              )
            })}

            <TouchableOpacity style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}} 
            onPress={() => navigation.navigate('SeekerAddPastPosition')}
            >
              <Text style={{color: '#4E35AE', fontSize: 16}}>+ Add past position</Text>
            </TouchableOpacity>
          </View>
        </View>




      </View>

      </SafeAreaView>
    </ScrollView>

    <SafeAreaView>
    <View style={{position: 'absolute' , bottom: 20, width: '100%'}}>
        {error ? <Text style={{color: 'red', padding: 20, backgroundColor: '#fff'}}>{error}</Text> : null}
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
    </View>
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
