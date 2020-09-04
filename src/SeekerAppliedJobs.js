import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import {postFormData} from './utils/network.js'
import {getUser} from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";

function SeekerAppliedJobs({navigation}){
  const isFocused = useIsFocused();
  const [appliedJobs, setAppliedJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [user, setUser] = useState({})
  const [search, setSearch] = useState('')

  function searchJobs(txt) {
    let text = txt.toLowerCase()
    setSearch(text)
    if (text == ''){
      setFilteredJobs(appliedJobs)
    }else{
      let jobs = appliedJobs.filter(j => j.position.includes(text))
      setFilteredJobs(jobs)
    }
  }

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused){
      loadData()
    }
  }, [isFocused]);

  function loadData(){
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
        // console.log('+++++++++++++++++++')
        // console.log(json)
        // console.log('+++++++++++++++++++')
        if (json.msg == "No Job Available!"){
          setAppliedJobs([])
          setFilteredJobs([])
        }else{
          setAppliedJobs(json.data)
          setFilteredJobs(json.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  const list = filteredJobs.map((item => {
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
          <View style={{width: '80%', backgroundColor: '#F4F5FA',}}>
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
    <ScrollView style={{flex: 1, backgroundColor: '#4E35AE',}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#6652C2', 
        paddingBottom: 10,
        backgroundColor: '#4E35AE',
        }}>
          <View style={{width: '35%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{paddingLeft: 10}}></Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{ color: '#fff', fontSize: 18}}>apployMe</Text>
          </View>
        </View>

        <View style={{backgroundColor: '#F4F5FA', minHeight: 1000}}>
          <View style={{backgroundColor: '#4E35AE', padding: 20, borderBottomLeftRadius: 7, borderBottomRightRadius: 7}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image source={require('../assets/ic_search_w.png')} style={{alignSelf: 'flex-start'}}/>

              <TextInput
              style={{width: '85%', paddingLeft: 10, color: '#fff'}}
              onChangeText={text => searchJobs(text)}
              placeholder='Search...'
              value={search} />

              <Image source={require('../assets/ic_filter_w.png')} style={{}}/>
            </View>
          </View>

          {list}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SeekerAppliedJobs;