import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View, 
  Image,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getUser, getToken} from './utils/utils.js';
import {postFormData} from './utils/network.js'

function SeekerAddPastPosition({navigation}){
  const [user, setUser] = useState({})
  const [deviceToken, setDeviceToken] = useState('')
  const [error, setError]   = useState('')

  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [from, setFrom] = useState(new Date())
  const [showFrom, setShowFrom] = useState(false)
  const [to, setTo] = useState(new Date())
  const [showTo, setShowTo] = useState(false)
  
  function hideFrom(i){
    setFrom(i)
    setShowFrom(false)
  }

  function hideTo(i){
    setTo(i)
    setShowTo(false)
  }

  function formatDate(d){
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  }

  useEffect(() => {
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)
      getToken().then(t => setDeviceToken(t))
      
    })
  }, [])

  const handleUpdate = () => {
    let form = new FormData()
    form.append('post_list[0][category]', position)
    form.append('post_list[0][from_date]', formatDate(from))
    form.append('post_list[0][to_date]', formatDate(to))
    form.append('post_list[0][company_name]', company)
    form.append('post_list[0][city_name]', city)
    
    form.append('user_type', '2')
    // form.append('user_token', user.user_token)
    form.append('user_id', user.user_id)
    form.append('device_tocken', deviceToken)
    
    
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
        // setError('Profile updated')
        // console.log(json)
        navigation.goBack()
      }
    })
    .catch(err => {
      console.log(err)
    })
  
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: 80}}>
        <View style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20
        }}>
          <View style={{width: '20%', marginLeft: 15}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../assets/ic_back.png')} style={{width: 28, height: 22}} />
            </TouchableOpacity>
          </View>
          <View style={{width: '70%'}}>
            <Text style={{ color: '#4834A6', fontSize: 18}}>ADD YOUR PAST POSITION</Text>
          </View>
        </View>
      </View>

      <View style={{height: 800, margin: 20}}>
        <View style={{}}>
          <Text>What was your position?</Text>
          <View style={styles.inputField}>
            <Image source={require('../assets/ic_description.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setPosition(text)}
              placeholder='Position'
              value={position}
            />
          </View>
        </View>

        <View style={{}}>
          <Text>Who was your employer?</Text>
          <View style={styles.inputField}>
            <Image source={require('../assets/ic_business.png')} style={{width: 20, height: 20}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setCompany(text)}
              placeholder='Company name'
              value={company}
            />
          </View>
        </View>

        <View style={{}}>
          <Text>Where was your work located?</Text>
          <View style={styles.inputField}>
            <Image source={require('../assets/ic_location_small.png')} style={{width: 12, height: 15}} />
            <TextInput
              style={{width: '100%', paddingLeft: 10, color: '#000'}}
              onChangeText={text => setCity(text)}
              placeholder='City, Country'
              value={city}
            />
          </View>
        </View>

        <View style={{}}>
          <Text>How long have you been working there?</Text>
          <View style={{flexDirection: 'row', width: '85%'}}>
            <View style={styles.inputField}>
              <Image source={require('../assets/ic_calendar.png')} style={{width: 20, height: 20}} />
              <TouchableOpacity style={{width: '48%', paddingLeft: 10}} onPress={val => setShowFrom(!showFrom)}>
                <Text style={{width: 120}}>{formatDate(from)}</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '2%'}}></View>
            <View style={styles.inputField}>
              <Image source={require('../assets/ic_calendar.png')} style={{width: 20, height: 20}} />
              <TouchableOpacity style={{width: '48%', paddingLeft: 10}} onPress={val => setShowTo(!showTo)}>
                <Text style={{width: 120}}>{formatDate(to)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{width: '100%', backgroundColor: '#5F46BF', alignItems: 'center', padding: 15, borderRadius: 50}} onPress={() => handleUpdate()}>
            <Text style={{color: '#fff', fontSize: 18}}>Add Position</Text>
          </TouchableOpacity>
        </View>

        
        <DateTimePickerModal
          isVisible={showFrom}
          mode="date"
          onConfirm={i => hideFrom(i)}
          onCancel={i => hideFrom(i)}
        />
        <DateTimePickerModal
          isVisible={showTo}
          mode="date"
          onConfirm={i => hideTo(i)}
          onCancel={i => hideTo(i)}
        />
      
      </View>
    </SafeAreaView>
  )
}

export default SeekerAddPastPosition;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#fff',
    borderColor: '#eee',

    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    
    marginTop: 10,
    marginBottom: 15,
    marginRight: 0,
    marginLeft: 0,

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
    // flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  }
});
