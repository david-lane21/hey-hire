import React, {useState} from 'react'
import {View, Text, TextInput} from 'react-native'
import {Picker} from '@react-native-community/picker'
import {countries} from './utils/consts.js'

function SeekerSignup({ navigation }){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [address, setAddress]     = useState('')
  const [country, setCountry]     = useState('')
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
    <View>
      <Text>SeekerSignup</Text>
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setFirstName(text)}
        placeholder='First Name...'
        value={firstName}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setLastName(text)}
        placeholder='Last Name...'
        value={lastName}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setAddress(text)}
        placeholder='Address'
        value={address}
      />

      <Picker
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onValueChange={(text, idx) => onSelectCountry(text)}
        selectedValue={country}> 
          {countries.map(cnty => {
            return(
              <Picker.Item label={cnty.name} value={cnty.code} />
            )
          })}
      </Picker>
        

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setState(text)}
        placeholder='State'
        value={state}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setCity(text)}
        placeholder='City'
        value={city}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setZipcode(text)}
        placeholder='Zipcode'
        value={zipcode}
      />

      <Picker
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onValueChange={(text, idx) => setPhCode(text)}
        selectedValue={phCode}>
          {countries.map(cnty => {
            return(
              <Picker.Item label={cnty.dial_code} value={cnty.code} />
            )
          })}
      </Picker>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPhone(text)}
        placeholder='Phone'
        value={phone}
      />

      <Text>* For recieving interview calls</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setEmail(text)}
        placeholder='Email'
        value={email}
      />
  
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPassword(text)}
        placeholder='Enter Password'
        value={password}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPassword2(text)}
        placeholder='Confirm Password'
        value={password2}
      />

    </View>
  )
}

export default SeekerSignup;