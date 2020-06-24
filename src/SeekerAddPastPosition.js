import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View, 
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

function SeekerAddPastPosition({navigation}){
  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')


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
          <View style={{flexDirection: 'row'}}>
            <View style={styles.inputField}>
              <Image source={require('../assets/ic_calendar.png')} style={{width: 20, height: 20}} />
              <TextInput
                style={{width: '37%', paddingLeft: 10, color: '#000'}}
                onChangeText={text => setFrom(text)}
                placeholder='From'
                value={from}
              />
            </View>
            <View style={{width: '6%'}}></View>
            <View style={styles.inputField}>
              <Image source={require('../assets/ic_calendar.png')} style={{width: 20, height: 20}} />
              <TextInput
                style={{width: '37%', paddingLeft: 10, color: '#000'}}
                onChangeText={text => setTo(text)}
                placeholder='To'
                value={to}
              />
            </View>
          </View>

          <TouchableOpacity style={{width: '100%', backgroundColor: '#5F46BF', alignItems: 'center', padding: 15, borderRadius: 50}}>
            <Text style={{color: '#fff', fontSize: 18}}>Add Position</Text>
          </TouchableOpacity>
        </View>

        
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
