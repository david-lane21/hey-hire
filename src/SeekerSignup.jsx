import React, {useState} from 'react'
import {View, Text, TextInput, Picker, StyleSheet} from 'react-native'
// import {Picker} from '@react-native-community/picker'
import {countries} from './utils/consts.js'

function SeekerSignup({ navigation }){
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
  
  function onSelectCountry(country){
    setCountry(country);
    setPhCode(country);
  }

  return(
    <View style={styles.container}>
      <Text>SeekerSignup</Text>
      
      <TextInput
        style={styles.inputField}
        onChangeText={text => setFirstName(text)}
        placeholder='First Name...'
        value={firstName}
      />

      <TextInput
        style={styles.inputField}
        onChangeText={text => setLastName(text)}
        placeholder='Last Name...'
        value={lastName}
      />

      <TextInput
        style={styles.inputField}
        onChangeText={text => setAddress(text)}
        placeholder='Address'
        value={address}
      />

      <Picker
        style={styles.inputField}
        onValueChange={(text, idx) => onSelectCountry(text)}
        selectedValue={country}> 
          {countries.map(cnty => {
            return(
              <Picker.Item key={cnty.code} label={cnty.name} value={cnty.code} />
            )
          })}
      </Picker>
        

      <TextInput
        style={styles.inputField}
        onChangeText={text => setState(text)}
        placeholder='State'
        value={state}
      />

      <TextInput
        style={styles.inputField}
        onChangeText={text => setCity(text)}
        placeholder='City'
        value={city}
      />

      <TextInput
        style={styles.inputField}
        onChangeText={text => setZipcode(text)}
        placeholder='Zipcode'
        value={zipcode}
      />

      <Picker
        style={styles.inputField}
        onValueChange={(text, idx) => setPhCode(text)}
        selectedValue={phCode}>
          {countries.map(cnty => {
            return(
              <Picker.Item key={cnty.code} label={'+' + cnty.dial_code} value={cnty.code} />
            )
          })}
      </Picker>

      <TextInput
        style={styles.inputField}
        onChangeText={text => setPhone(text)}
        placeholder='Phone'
        value={phone}
      />

      <Text>* For recieving interview calls</Text>

      <TextInput
        style={styles.inputField}
        onChangeText={text => setEmail(text)}
        placeholder='Email'
        value={email}
      />
  
      <TextInput
        style={styles.inputField}
        onChangeText={text => setPassword(text)}
        placeholder='Enter Password'
        value={password}
      />

      <TextInput
        style={styles.inputField}
        onChangeText={text => setPassword2(text)}
        placeholder='Confirm Password'
        value={password2}
      />

    </View>
  )
}

export default SeekerSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  inputField: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: '#ccc',
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0
    },
    alignItems: 'flex-start',
  }
});
