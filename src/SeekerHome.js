import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native'
import {getUser} from './utils/utils.js';
import {postFormData} from './utils/network.js'
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useIsFocused } from "@react-navigation/native";

function SeekerHome({navigation}){
  const isFocused = useIsFocused();
  const [user, setUser1] = useState({})
  const [profile, setProfile] = useState({})
  const [location, setLocation] = useState({latitude: 32.7767, longitude: -96.7970,});
  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState(undefined)
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
      }

      let loc = await Location.getCurrentPositionAsync({});
      // console.log(loc.coords)
      setLocation(loc.coords);
    })();
  }, []);

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
        postFormData('get_all_business', form)
        .then(json2 => {
          return json2.json()
        })
        .then(json2 => {
          // console.log(json2.data)
          let bizList = json2.data.filter(b => parseFloat(b.latitude) && parseFloat(b.longitude)  )
          setBusinesses(bizList)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  useEffect(()=>{
    
    // return () => setProfile({})
  }, [])

  function hasImage(biz){
    biz != null && biz.avatar_image != "" && biz.avatar_image != null
  }

  function currentLocation(){
    if (selectedBusiness == undefined){
      // console.log(location)
      return {
        // latitude: 32.7767,
        // longitude: -96.7970,
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      }
    }else{
      let lat = parseFloat(businesses[selectedBusiness].latitude)
      let lng = parseFloat(businesses[selectedBusiness].longitude)
      return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      }
    }
  }
  
  function dateFormat(date){
    if (date){
      let d = date.split('-')
      return `${d[1]}.${d[2]}.${d[0]}`
     }else{
       return ""
     }
  }
  
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
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={{paddingLeft: 10, color: '#fff', fontSize: 18}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '33.3%'}}>
            <Image source={require('../assets/title_header.png')} style={{width: 120, height: 25}} />
          </View>
          <View style={{width: '33.3%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('SeekerLinks', { screen: 'SeekerEditProfile'})}>
              <Text style={{paddingRight: 10, textAlign: 'right', color: '#fff', fontSize: 18}}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center', padding: 20, }}>
          <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50}} />
        </View>

        <View style={{flex: 1, alignItems: 'center', }}>
          <Text style={{color: '#fff', fontSize: 22}}>{user.first_name} {user.last_name}</Text>
        </View>

        <View style={{flex: 1, flexDirection:'row', alignItems: 'center', alignSelf: 'center', marginTop: 5}}>
          <Image source={require('../assets/ic_graduation.png')} style={{width: 15, height: 15}} />
          <Text style={{color: '#fff', marginLeft: 5}}>{user.education}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#715FCB', marginTop: 5}}>
            <View style={{flex: 1, flexDirection:'row', alignItems: 'center', alignSelf: 'center'}}>
              <Image source={require('../assets/ic_location.png')} style={{width: 15, height: 15}} />
              <Text style={{color: '#fff', marginLeft: 5}}>{user.city}, {user.state}, {user.country}</Text>
            </View>
        </View>

        <View style={{flex: 1, alignItems: 'flex-start', borderBottomWidth: 1, 
          borderBottomColor: '#715FCB', }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginTop: 10}}>
            <Image source={require('../assets/ic_star_white.png')} style={{width: 14, height: 12, marginLeft: 8,}} />
            <Text style={{color: '#fff', fontSize: 18, marginLeft: 8}}>Bio</Text> 
          </View>
          <Text style={{color: '#fff', fontSize: 13, paddingBottom: 30, paddingLeft: 30, paddingTop: 10, paddingRight: 10 }}>{user.bio}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-start', borderBottomWidth: 1,
          borderBottomColor: '#715FCB', paddingBottom: 10}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center',}}>
            <Image source={require('../assets/ic_past_positions_white.png')} style={{width: 14, height: 12, marginLeft: 8,}} />
            <Text style={{color: '#fff', fontSize: 18, marginLeft: 8}}>Past positions</Text> 
          </View>
          
          {profile.position ? profile.position.map((position) => {
            return(
              <View style={{flex: 1, paddingLeft: 30, paddingTop: 15, paddingBottom: 5, width: '90%'}} key={position.post_id}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#fff', fontSize: 13, paddingBottom: 3}}>{dateFormat(position.from_date)} - </Text>
                  <Text style={{color: '#fff', fontSize: 13, paddingBottom: 3}}>{dateFormat(position.to_date)}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', width: '80%', flexWrap: 'wrap'}}>
                  <Text style={{color: '#fff', fontSize: 13, paddingBottom: 3}}>{position.category} - </Text>
                  <Text style={{color: '#fff', fontSize: 13, paddingBottom: 3}}>{position.company_name} - </Text>
                  <Text style={{color: '#fff', fontSize: 13, paddingBottom: 3}}>{position.city_name}</Text>
                </View>
                <View style={{flex: 1, borderBottomColor: '#715FCB', borderBottomWidth: 1,}}></View>
              </View>
            )
          }) : null}
        </View>

        <View style={{flex: 1, }}>
          <View style={{flex: 1, width: '100%', backgroundColor: '#fff'}}>
            <MapView
              style={{width: '100%', height: 500}}
              provider={PROVIDER_GOOGLE}
              region={currentLocation()}
              customMapStyle={MapStyle}
            >
              {businesses.map(mkr => {
                return(
                  <Marker 
                    draggable 
                    key={mkr.user_id} 
                    image={require('../assets/ic_pin_purple.png')}
                    coordinate={{latitude: parseFloat(mkr.latitude), longitude: parseFloat(mkr.longitude)}} />
                )
              })}
            </MapView>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex: 1, position: 'absolute', bottom: 5, backgroundColor: 'rgba(0,0,0,0)'}}>
            {businesses.map((biz, idx) => {
              if (selectedBusiness == idx){
                return(
                  <TouchableHighlight key={biz.user_id} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.01)'}}>
                    <View style={{flex: 1, alignItems: 'center', margin: 10, width: 125, height: 120, borderRadius: 8, backgroundColor: '#3C2E8F', padding: 10}}>
                      <Text style={{flex: 1, color: '#fff', fontSize: 20, fontWeight: '400', marginTop: 20, textAlign: 'center'}}>View Available Positions</Text>
                    </View>
                  </TouchableHighlight>
                )
              }else{
                return (
                  <TouchableHighlight key={biz.user_id} onPress={() => setSelectedBusiness(idx)} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.01)'}}>
                    <View style={{flex: 1, alignItems: 'center', margin: 10, width: 125, height: 120, borderRadius: 8, backgroundColor: '#fff', padding: 10}}>
                      {biz.avatar_image ?
                        <Image source={{uri: biz.avatar_image}} style={{width: 50, height: 50, margin: 10}} />
                      : 
                        <Image source={require('../assets/ApployMeLogo.png')} style={{width: 50, height: 50, margin: 10}} />
                      }
                      <Text style={{flex: 1, fontSize: 12, color: '#444'}}>{biz.business_name}</Text>
                    </View>
                  </TouchableHighlight>
                )
              }
            })}
          </ScrollView>
        </View>

      </SafeAreaView>

    </ScrollView>
    </LinearGradient>
  )
}

export default SeekerHome;

const MapStyle = 
[
 {
 "featureType": "water",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#e9e9e9"
             },
             {
             "lightness": 17
             }
             ]
 },
 {
 "featureType": "landscape",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#f5f5f5"
             },
             {
             "lightness": 20
             }
             ]
 },
 {
 "featureType": "road.highway",
 "elementType": "geometry.fill",
 "stylers": [
             {
             "color": "#ffffff"
             },
             {
             "lightness": 17
             }
             ]
 },
 {
 "featureType": "road.highway",
 "elementType": "geometry.stroke",
 "stylers": [
             {
             "color": "#ffffff"
             },
             {
             "lightness": 29
             },
             {
             "weight": 0.2
             }
             ]
 },
 {
 "featureType": "road.arterial",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#ffffff"
             },
             {
             "lightness": 18
             }
             ]
 },
 {
 "featureType": "road.local",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#ffffff"
             },
             {
             "lightness": 16
             }
             ]
 },
 {
 "featureType": "poi",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#f5f5f5"
             },
             {
             "lightness": 21
             }
             ]
 },
 {
 "featureType": "poi.park",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#dedede"
             },
             {
             "lightness": 21
             }
             ]
 },
 {
 "elementType": "labels.text.stroke",
 "stylers": [
             {
             "visibility": "on"
             },
             {
             "color": "#ffffff"
             },
             {
             "lightness": 16
             }
             ]
 },
 {
 "elementType": "labels.text.fill",
 "stylers": [
             {
             "saturation": 36
             },
             {
             "color": "#333333"
             },
             {
             "lightness": 40
             }
             ]
 },
 {
 "elementType": "labels.icon",
 "stylers": [
             {
             "visibility": "off"
             }
             ]
 },
 {
 "featureType": "transit",
 "elementType": "geometry",
 "stylers": [
             {
             "color": "#f2f2f2"
             },
             {
             "lightness": 19
             }
             ]
 },
 {
 "featureType": "administrative",
 "elementType": "geometry.fill",
 "stylers": [
             {
             "color": "#fefefe"
             },
             {
             "lightness": 20
             }
             ]
 },
 {
 "featureType": "administrative",
 "elementType": "geometry.stroke",
 "stylers": [
             {
             "color": "#fefefe"
             },
             {
             "lightness": 17
             },
             {
             "weight": 1.2
             }
             ]
 }
 ]
