import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {postFormData} from './utils/network.js'

function BusinessClosedJobs({navigation}){
  const [closedJobs, setClosedJobs] = useState([])

  const list = closedJobs.map((item => {
    return (
      <TouchableOpacity key={item.id} onPress={() => navigation.navigate('BusinessReListJob')}>
        <View  style={{
          backgroundColor: '#fff',
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
              source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
              style={{width: 40, height: 40, backgroundColor: '#444', borderRadius: 40 }} />
          </View>
          <View style={{width: '80%'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20}}>{item.position}</Text>
              <Text>{item.start_date}</Text>
            </View>
          </View>
          
        </View>
      </TouchableOpacity>
    )
  }))

  useEffect(() => {
    let form = new FormData()
    form.append('user_token', 'XaeEBzPu7UuWqqs1NDEZjyc2KKk')
    form.append('user_id', '181')
    
    postFormData('closed_job_list', form)
    .then(res => {
      return res.json()
    })
    .then(json => {
      setClosedJobs(json.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return(
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView>
        <Header />

        <View style={{padding: 20}}>
          {list}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default BusinessClosedJobs;

function Header(){
  return(
    <View style={{
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    paddingBottom: 10
    }}>
      <View style={{width: '35%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{paddingLeft: 10}}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '65%'}}>
        <Text style={{ color: '#4834A6', fontSize: 18}}>Closed jobs</Text>
      </View>
    </View>
  )
}