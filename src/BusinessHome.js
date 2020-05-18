import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native'
import {getUser} from './utils/utils.js';
import {postFormData} from './utils/network.js'
import { LinearGradient } from 'expo-linear-gradient';
import { ceil } from 'react-native-reanimated';

function BusinessHome({navigation}){
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})

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
    <LinearGradient 
      style={{flex: 1, alignItems: 'center'}} 
      colors={['#4E35AE', '#775ED7']}>
      <ScrollView style={{flex: 1, }}>
        <SafeAreaView>
          <View style={{
            // backgroundColor: '#4E35AE',
            flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            borderBottomWidth: 1, 
            borderBottomColor: '#715FCB', 
            paddingBottom: 10,
            paddingTop: 15
          }}>
            <View style={{width: '33.3%'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{paddingLeft: 10, color: '#fff', fontSize: 18}}>Logout</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '33.3%'}}>
              <Image source={require('../assets/title_header.png')} style={{width: 120, height: 25}} />
            </View>
            <View style={{width: '33.3%', alignItems:'flex-end', paddingRight: 15}}>
              <TouchableOpacity onPress={() => navigation.navigate('SeekerLinks', { screen: 'SeekerEditProfile'})}>
                <Image source={require('../assets/ic_settings.png')} style={{width: 20, height: 20}} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center', padding: 20, }}>
            <ImageBackground source={require('../assets/img_ring.png')} style={{
              width: 136, height: 136, paddingTop: 17, paddingLeft: 17}}>
              <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50}} />
            </ImageBackground>
          </View>

          <View style={{flex: 1, alignItems: 'center', }}>
            <Text style={{color: '#fff', fontSize: 22}}>{user.business_name}</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: '#fff'}}>Proprieter: </Text>
            <Text style={{color: '#fff'}}>{user.first_name} {user.last_name}</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 30 }}>
            {/* <Text style={{color: '#fff'}}>Proprieter: </Text> */}
            <Text style={{color: '#fff'}}>{user.address}</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            {/* <Text style={{color: '#fff'}}>Proprieter: </Text> */}
            <Text style={{color: '#fff', textAlign: 'center'}}>{user.business_detail}</Text>
          </View>

          <View style={{flex: 1, backgroundColor: '#fff', minHeight: 350, padding: 20 }}>
            <View style={{flex: 1, flexDirection: 'row', maxWidth: '100%' }}>
              <View>
                <Text style={{fontSize: 18, paddingBottom: 5}}>Current job Openings</Text>
                <Text style={{fontSize: 12, color: '#888'}}>5 positions available</Text>
              </View>
              <View style={{flex: 1,alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.navigate('SeekerLinks', { screen: 'SeekerEditProfile'})}>
                  <Image source={require('../assets/btn_add_new_job.png')} style={{ width: 140, height: 28}} />
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
          
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  )
}

export default BusinessHome;