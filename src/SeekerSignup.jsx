import React, {useState} from 'react'
import {View, Text, TextInput} from 'react-native'
import {Picker} from '@react-native-community/picker'

function SeekerSignup({ navigation }){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [address, setAddress]     = useState('')
  const [country, setCountry]     = useState('')
  const [state, setState]         = useState('')
  const [city, setCity]           = useState('')
  const [zipcode, setZipcode]     = useState('')
  const [phCode, setPhCode]       = useState('')
  const [phone, setPhone]         = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [password2, setPassword2] = useState('')

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
        onValueChange={(text, idx) => setCountry(text)}
        selectedValue={country}> 
        <Picker.Item label='Canada' value='ca' />
        <Picker.Item label='United States' value='us' />
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

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPhCode(text)}
        placeholder='PhCode'
        value={phCode}
      />

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