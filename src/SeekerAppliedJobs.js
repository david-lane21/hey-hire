import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import {postFormData} from './utils/network.js'
import {getUser} from './utils/utils.js';

function SeekerAppliedJobs({navigation}){
  const [appliedJobs, setAppliedJobs] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)

      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('job_list', form)
      .then(res => {
        return res.json()
      })
      .then(json => {
        // console.log(json.data)
        setAppliedJobs(json.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }, [])

  const list = appliedJobs.map((item => {
    // console.log(item)
    return (
      <TouchableOpacity key={item.id} onPress={() => navigation.navigate('SeekerAppliedJobs0', {
        screen: 'SeekerJobDetail', 
        params: {job: item}
        }
      )}>
        <View  style={{
          backgroundColor: '#F4F5FA',
          borderColor: '#eee',
          padding: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderRadius: 10,
          shadowColor: "#888",
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
        }}>
          <View style={{width: '20%'}}>
            <Image 
              source={{uri: item.business.avatar_image}} 
              style={{width: 40, height: 40, backgroundColor: '#444', borderRadius: 40, borderWidth: 1, borderColor: '#888' }} />
          </View>
          <View style={{width: '80%'}}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>{item.position}</Text>
                {item.aplied === '1' ? 
                <Image source={require('../assets/ic_applied.png')} style={{width: 60, height: 15, marginLeft: 15,}} />
                : null}
              </View>
              
              <Text style={{fontSize: 14, color: '#555'}}>{item.business.business_name}</Text>
              <Text style={{fontSize: 12, color: '#888'}}>{item.business.address}</Text>
            </View>
          </View>
          
        </View>
      </TouchableOpacity>
    )
  }))
  
  return(
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView>
        <View style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
        paddingBottom: 10,
        }}>
          <View style={{width: '35%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{paddingLeft: 10}}></Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{ color: '#4834A6', fontSize: 18}}>apployMe</Text>
          </View>
        </View>

        <View style={{padding: 20, backgroundColor: '#F4F5FA'}}>
          {list}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SeekerAppliedJobs;