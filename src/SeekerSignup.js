import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  Linking
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from 'expo-image-picker'
import { countries } from './utils/consts.js'
import { postFormData, postJSON, putJSON } from './utils/network.js'
import * as Location from 'expo-location'
import { setUser, setToken } from './utils/utils.js'
import { KeyboardAccessoryNavigation, KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { strings } from './translation/config'
import { AuthContext } from './navigation/context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import parsePhoneNumber from 'libphonenumber-js'
import examples from 'libphonenumber-js/examples.mobile.json'
import { getExampleNumber } from 'libphonenumber-js';
// import CommonUtils from './utils/CommonUtils';
import Loader from './components/Loader';
import { heightPercentageToDP } from 'react-native-responsive-screen'
const isIphoneX = DeviceInfo.hasNotch();
function SeekerSignup({ navigation, route }) {
  const scrollViewRef = useRef();

  const [modalVisible, setModalVisible] = useState(false)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState('')
  const [image, setImage] = useState(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('US')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [phCode, setPhCode] = useState('1')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [activeInputIndex, setActiveInputIndex] = useState(0)
  const [inputs, setInputs] = useState([])
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false)
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false)

  const [currentScroll, setCurrentScroll] = useState(null);
  const [phoneMaxLength, setPhoneMaxLength] = useState(20);
  const [phCountryCode, setPhCountryCode] = useState("US");
  const [keyboardHeight, setKeyboardHeight] = useState(301);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const phoneNumber = getExampleNumber(phCountryCode, examples)
    setPhoneMaxLength(phoneNumber.formatNational().length);

    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    ; (async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
      }
      const status1 = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status1.status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }

      Location.getLastKnownPositionAsync().then((loc) => {
        setAddressField(loc)
        setLocation(loc)
      }).catch(error => {
        Location.getCurrentPositionAsync({}).then((location) => {
          setAddressField(location)
          setLocation(location)
        }).catch(err => {
          Alert.alert("", err.message)
        });
      });
    })()
  }, [])


  const _keyboardDidShow = (event) => {
    console.log("Keyboard Shown", event);
    setKeyboardHeight(event.endCoordinates.height)
  };

  const _keyboardDidHide = (event) => {
    console.log("Keyboard Hidden", event);
    setKeyboardHeight(301)

  };


  async function setAddressField(location) {


    const loc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
    console.log('setAddressField', loc);
    setTimeout(() => {
      Location.reverseGeocodeAsync(loc).then((addressObject) => {
        console.log(addressObject);
        let name = addressObject[0].name || '';
        let street = addressObject[0].street || '';


        if (street && !(name.includes(street))) {
          name = name + ' ' + street;
        }

        const country = countries.find(
          item => item.code == addressObject[0].isoCountryCode
        );
        // setAddress(name)
        setState(addressObject[0].region)
        // setCity(addressObject[0].city)
        setCountry(country.name)
        setPhCode(country.dial_code)
        // setZipcode(addressObject[0].postalCode)
      }).catch((error) => {
        console.log('setAddressField error', error);
      })
    }, 1000)

  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    })

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
    // console.log(image)
  }

  function formatPhone(str) {
    // let cleaned = str.replace(/\D/g, '')
    // let match = cleaned.match(/^(\d{3})(\d{3})(\d+)$/)
    // if (match) {
    //   return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    // }
    // return str;
    const phoneNumber = parsePhoneNumber(phone, phCountryCode);
    if (phoneNumber) {
      return (phoneNumber.formatNational().replace(/^0+/, ''));
    }
  }

  function formatPhoneAPI(str) {
    let cleaned = str.replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{3})(\d+)$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return str;
  }

  // function _updatePhone(text){
  //   if(text.length > 3){
  //     let areaCode = text.substring(0, 3).replace(/[^0-9]/g, '')
  //     let ph = text.substring(3).replace(/[^0-9]/g, '')
  //     setPhone(areaCode + ' ' + ph)
  //   }else{
  //     setPhone(text)
  //   }

  // }

  function _onPress(item) {
    setModalVisible(false)
    const phoneNumber = getExampleNumber(item.code, examples)
    setPhCountryCode(item.code);
    setPhoneMaxLength(phoneNumber.formatNational().length)
    setPhCode(item.dial_code)
  }

  function _onPress2(item) {
    setModalVisible(false)
    const phoneNumber = getExampleNumber(item.code, examples)
    setPhCountryCode(item.code);
    setPhoneMaxLength(phoneNumber.formatNational().length)
    setCountry(item.name)
    setPhCode(item.dial_code)
  }

  function deviceToken(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = ''
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

  createAccount = async () => {
    if (validation() == true) {
      if (
        firstName &&
        lastName &&
        address &&
        city &&
        state &&
        email &&
        phone
      ) {
      try {
        const body = {
          first_name: firstName,
          last_name: lastName,
          address: address,
          zip_code: zipcode,
          state: state,
          city: city,
          email: email,
          phone: phone
      }
        console.log('body in signup page ', body);
        console.log("route ", route)
        const res = await postJSON("/job-seeker/profile", body)
        console.log('res in signup page ',res)
        const json = await res.json();
        console.log('json data ',json)
        if (res.status == 200) {
          navigation.navigate('SeekerFinishRegistration',{token: defaultToken})
        }
      } catch (error) {
        Alert.alert('Error Over Here ',error)
        console.log('error while creating profile',error)
      }
      }
      else{
        setError(strings.PLEASE_FILL_MISSING)
      }
    }
  }

  function handleSignup() {

    navigation.navigate('SeekerFinishRegistration')
    return 

    if (validation() == true) {
      if (
        firstName &&
        lastName &&
        address &&
        city &&
        state &&
        email 
      ) {
        if (password == password2 && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
          let token = deviceToken(128)
          // let token = CommonUtils.deviceToken;
          let form = new FormData()
          form.append('first_name', firstName)
          form.append('last_name', lastName)
          form.append('address', address)
          form.append('email', email)
          form.append('city', city)
          form.append('state', state)
          form.append('country', country)
          form.append('phone', phCode + ' ' + formatPhone(phone))
          form.append('user_type', '2')
          form.append('password', password)
          form.append('device_tocken', token)
          if (image) {
            form.append('avatar_image', {
              uri: image,
              name: 'avatar.jpg',
              type: 'image/jpeg'
            })
          }

          form.append('zip_code', zipcode)
          console.log(form);
          setLoading(true);

          postFormData('user_register', form)
            .then(res => {
              if(res.status==200){
                return res.json();
              }else{
                setLoading(false);
          Alert.alert('Error','Profile image is too large.')

          return res.text()
              }
            })
            .then(json => {
              console.log('Registration', json)
              if (json.status_code == '200') {
                setError('')
                setUser(json.data)
                setToken(token);
                setLoading(false);

                navigation.navigate('SeekerVerificationCode', {
                  number: phCode + ' ' + phone,
                  email: email,
                  otp: json.otp,
                  userId: json.data.user_id
                })
              } else {
                if (json.msg) {
                  setError(json.msg)
                } else {
                  setError(json)
                }
              }
            })
            .catch(err => {
              console.log(err)
            });
            
        } else {
          if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            Alert.alert("Error", strings.PASSWORD_ERROR_2);
          } else {
            Alert.alert("Error", strings.PASSWORD_ERROR);
          }
        }
      } else {
        if (password !== password2) {
          setError(strings.PASSWORD_ERROR)
        } else {
          setError(strings.PLEASE_FILL_MISSING)
        }
      }
    }
  }

  function isValidatePresence(string) {

    return string.trim();

  }

  function validation() {
    // if (!image) {
    //   Alert.alert("Error...", "Please select profile picture before continuing!")
    //   return false
    // }

    if (!firstName || isValidatePresence(firstName) == "") {
      Alert.alert("Error...", "Enter a valid First name before continuing!")
      return false
    }
    else if (!lastName || isValidatePresence(lastName) == "") {
      Alert.alert("Error...", "Enter a valid Last name before continuing!")
      return false
    }
    else if (!country || isValidatePresence(country) == "") {
      Alert.alert("Error...", "Enter a valid Country before continuing!")
      return false
    }
    else if (!address || isValidatePresence(address) == "") {
      Alert.alert("Error...", "Enter a valid Address before continuing!")
      return false
    }
    else if (!state || isValidatePresence(state) == "") {
      Alert.alert("Error...", "Enter a valid State name before continuing!")
      return false
    }
    else if (!zipcode || isValidatePresence(zipcode) == "") {
      Alert.alert("Error...", "Enter a valid Zipcode before continuing!")
      return false
    }
    else if (!city || isValidatePresence(city) == "") {
      Alert.alert("Error...", "Enter a valid City name before continuing!")
      return false
    }

    else if (!phone || isValidatePresence(phone) == "") {
      Alert.alert("Error...", "Enter a valid Phone Number before continuing!")
      return false
    }
    else if (!email || isValidatePresence(email) == "") {
      Alert.alert("Error...", "Enter a valid Email before continuing!")
      return false
    }
    else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      Alert.alert("Error...", "Enter a valid email before continuing!")
      return false
    }

    // else if (!password || isValidatePresence(password) == "") {
    //   Alert.alert("Error...", "Enter a valid password before continuing!")
    //   return false
    // }
    // else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
    //   Alert.alert("Error...", strings.PASSWORD_ERROR_2)
    //   return false
    // }

    // else if (password !== password2) {
    //   Alert.alert("Error...", "Passwords don't match")
    //   return false
    // }


    else {
      return true
    }
  }




  // function onSelectCountry(country){
  //   setCountry(country);
  //   setPhCode(country);
  // }

  function handleFocus(index) {
    setActiveInputIndex(index);
    setNextFocusDisabled(index === inputs.length - 1);
    setPreviousFocusDisabled(index === 0);

  }

  function handleFocusNext() {
    inputs[activeInputIndex + 1].focus()
  }

  function handleFocusPrev() {
    inputs[activeInputIndex - 1].focus()
  }

  function handleRef(index, ref) {
    let tempInputs = inputs
    tempInputs[index] = ref
    setInputs(inputs)
  }

  function gotoPrivacyPolicy() {
    Linking.openURL('https://app.apployme.com/privacy_policy')
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={[styles.container]} extraScrollHeight={Platform.OS === "ios" ? 50 : 0} extraHeight={Platform.OS === "ios" ? 140 : null} >
      <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#4834A6",
              fontSize: hp("2.1%"),
              fontWeight: "600",
            }}
          >
            {strings.REGISTRATION}
          </Text>
        </View>

        <Loader loading={loading} />

        <View style={{ flex: 1, alignItems: 'center', padding: 20, marginBottom: heightPercentageToDP(5) }} />

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_user.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000', borderWidth: 0 }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setFirstName(text)}
            placeholder={strings.FIRSTNAME}
            value={firstName}
            textContentType='givenName'
            autoCompleteType={'name'}
            keyboardType={'default'}
            autoCapitalize={'words'}
            onFocus={() => {
              handleFocus(0)
            }}
            ref={ref => {
              handleRef(0, ref)
            }}
          />
        </View>

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_user.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000' }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setLastName(text)}
            placeholder={strings.LASTNAME}
            value={lastName}
            textContentType='familyName'
            autoCompleteType={'name'}
            keyboardType={'default'}
            autoCapitalize={'words'}
            onFocus={() => {
              handleFocus(1)
            }}
            ref={ref => {
              handleRef(1, ref)
            }}
          />
        </View>

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_address.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000' }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setAddress(text)}
            placeholder={strings.ADDRESS}
            value={address}
            textContentType='fullStreetAddress'
            autoCompleteType={'street-address'}
            keyboardType={'default'}
            onFocus={() => {
              handleFocus(2)
            }}
            ref={ref => {
              handleRef(2, ref)
            }}
          />
        </View>

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_country.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000' }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setCity(text)}
            placeholder={strings.CITY}
            value={city}
            textContentType='addressCity'
            keyboardType={'default'}
            onFocus={() => {
              handleFocus(4)
            }}
            ref={ref => {
              handleRef(4, ref)
            }}
          />
        </View>

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_country.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000' }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setState(text)}
            placeholder={strings.STATE}
            value={state}
            textContentType='addressState'
            keyboardType={'default'}
            autoCompleteType={'street-address'}
            onFocus={() => {
              handleFocus(3)
            }}
            ref={ref => {
              handleRef(3, ref)
            }}
          />
        </View>

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_zip.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000' }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setZipcode(text)}
            placeholder={strings.ZIP}
            value={zipcode}
            keyboardType='number-pad'
            textContentType='postalCode'
            autoCompleteType={'postal-code'}
            onFocus={() => {
              handleFocus(5)
            }}
            ref={ref => {
              handleRef(5, ref)
            }}
          />
        </View>

        <View
          style={{
            flex: 2,
            alignItems: 'center'
          }}
        >
          <View style={styles.inputField}>
            <Image
              source={require('../assets/ic_call.png')}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={[{ paddingLeft: 10, width: '100%', color: '#000' }, Platform.OS === "ios" && { height: 30 }]}
              onChangeText={text => setPhone(text)}
              placeholder={strings.PHONE}
              value={formatPhone(phone)}
              maxLength={phoneMaxLength}

              keyboardType={'phone-pad'}
              textContentType='telephoneNumber'
              autoCompleteType={'tel'}
              onFocus={() => {
                handleFocus(6)
              }}
              ref={ref => {
                handleRef(6, ref)
              }}
            />
          </View>
        </View> 

        {/* <Text
          style={{ color: '#7364BF', paddingTop: 10, paddingBottom: 20 }}
        >
          {strings.FOR_RECEIVING_INTERVIEW_CALLS}
        </Text> */}

        <View style={styles.inputField}>
          <Image
            source={require('../assets/ic_mail.png')}
            style={{ height: 20, width: 20 }}
          />
          <TextInput
            style={[{ paddingLeft: 10, width: '100%', color: '#000', }, Platform.OS === "ios" && { height: 30 }]}
            onChangeText={text => setEmail(text)}
            placeholder={strings.EMAIL}
            value={email}
            type='email'
            textContentType='username'
            keyboardType={'email-address'}
            autoCompleteType={'email'}
            onFocus={() => {
              handleFocus(7)
            }}
            ref={ref => {
              handleRef(7, ref)
            }}

          />
        </View>

        {error ? (
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : null}

        <View style={{ flex: 1, marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignContent: 'center',
              backgroundColor: '#5B42BB',
              padding: 15,
              borderRadius: 30,
              marginTop: 20
            }}
            onPress={() => createAccount()}
          >
            <Text
              style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}
            >
              {strings.CREATE_ACCOUNT}
            </Text>
          </TouchableOpacity>
          <Text style={styles.terms} onPress={gotoPrivacyPolicy}>{strings.VIEW_TERMS_PRIVACY}</Text>
        </View>
        <View style={{ height: 50 }}></View>
      </KeyboardAwareScrollView>
      <KeyboardAccessoryNavigation
        onNext={handleFocusNext}
        onPrevious={handleFocusPrev}
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        androidAdjustResize={Platform.OS == 'android'}
        avoidKeyboard={Platform.OS == 'android'}
        style={Platform.OS == "android" ? { top: 0 } : { top: isIphoneX ? keyboardHeight > 301 ? -310 : -270 : keyboardHeight > 216 ? -260 : -230 }}
      />
    </SafeAreaView>
  )
}

export default SeekerSignup

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  inputField: {
    height: Platform.OS == "ios" ? 40 : 50,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: "#eee",
    // borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: 'center',
    paddingVertical: 5

  },
  terms: {
    marginTop: heightPercentageToDP(3),
    color: '#A9A9A9',
    textAlign: 'center',
    textDecorationLine: 'underline'
    //textDecorationStyle: 'under'

  },
  code: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: "#eee",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    // color: '#fff',
    width: '25%',
    height: Platform.OS == "ios" ? 40 : 50,
    marginBottom: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,

  },
  code2: {
    color: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 10,
    // color: '#fff',123
    width: '69%',
    // height: 40,
    marginLeft: '5%',
    marginBottom: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }
})
