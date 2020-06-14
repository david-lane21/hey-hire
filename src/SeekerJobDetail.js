import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {getUser} from './utils/utils.js';
import {postFormData} from './utils/network.js'
import { LinearGradient } from 'expo-linear-gradient';

function SeekerJobDetail({route, navigation}){
  // console.log(route.params.job)
  const [job, setJob] = useState(route.params.job)

  // useEffect(() => {
    
  // }, [])

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
            <View style={{width: '33.3%', alignContent: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image 
                source={require('../assets/ic_back_w.png')} 
                style={{
                  width: 40, 
                  height: 30, 
                  marginTop: 10,
                  marginLeft: 10
                  }} />
              </TouchableOpacity>
            </View>
            <View style={{width: '33.3%'}}>
              <Image source={require('../assets/title_header.png')} style={{width: 120, height: 25}} />
            </View>
            <View style={{width: '33.3%'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                <View style={{flex: 2}}></View>
                <TouchableOpacity style={{flex: 1}}>
                  <Image source={require('../assets/ic_checked_white.png')} style={{width: 20, height: 20,}} />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}}>
                  <Image source={require('../assets/ic_share_w.png')} style={{width: 20, height: 20,}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center', padding: 20, }}>
            <Image source={{uri: job.business.avatar_image}} style={{width: 100, height: 100, borderRadius: 50}} />
          </View>

          <View style={{flex: 1, alignItems: 'center', }}>
            <Text style={{color: '#fff', fontSize: 22}}>{job.business.business_name}</Text>
          </View>

          <View style={{flex: 1, alignItems: 'center', }}>
            <Text style={{color: '#fff'}}>Currently viewing position: {job.position}</Text>
          </View>

          <View style={{flex: 1, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#715FCB', }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../assets/ic_location.png')} style={{width: 13, height: 13}} />
              <Text style={{color: '#fff', marginLeft: 5}}>{job.business.address}</Text>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center', padding: 20, borderBottomWidth: 1, 
            borderBottomColor: '#715FCB', }}>
            <Text style={{color: '#fff'}}>{job.business.business_detail}</Text>
          </View>

          <View style={{
            flex: 1, 
            alignItems: 'flex-start', 
            backgroundColor: '#f6f6f6', 
            paddingTop: 40,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 50,
            }}>
            <View style={{
              width: '100%',
              padding: 20,
              backgroundColor: '#fff', 
              minHeight: 300, 
              borderRadius: 10,
              borderColor: '#eee',
              borderWidth: 1,
            }}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/ic_calender.png')} style={{width: 20, height: 20}} />
                <Text style={{fontSize: 16, marginLeft: 5, fontWeight: 'bold'}}>Start Date</Text> 
              </View>
              <Text style={{marginBottom: 30, marginTop: 10}}>{job.start_date}</Text>

              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/ic_category.png')} style={{width: 15, height: 15}} />
                <Text style={{fontSize: 16, marginLeft: 10, fontWeight: 'bold'}}>Position description</Text> 
              </View>
              <Text style={{marginBottom: 30, marginTop: 10}}>{job.position_desc}</Text>

              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/ic_mind.png')} style={{width: 20, height: 20}} />
                <Text style={{fontSize: 16, marginLeft: 10, fontWeight: 'bold'}}>Required experience</Text> 
              </View>
              <Text style={{marginBottom: 30, marginTop: 10}}>{job.experience}</Text>

            </View>
            
            
          </View>

        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  )
}

export default SeekerJobDetail;