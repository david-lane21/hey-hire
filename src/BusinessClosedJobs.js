import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

const data = [
  {img: 'url', name: 'absd1', date: '2020-05-15'},
  {img: 'url', name: 'absd2', date: '2020-05-15'},
  {img: 'url', name: 'absd3', date: '2020-05-15'},
  {img: 'url', name: 'absd4', date: '2020-05-15'},
  {img: 'url', name: 'absd5', date: '2020-05-15'},
  {img: 'url', name: 'absd6', date: '2020-05-15'},
  {img: 'url', name: 'absd7', date: '2020-05-15'},
  {img: 'url', name: 'absd8', date: '2020-05-15'},
  {img: 'url', name: 'absd9', date: '2020-05-15'},
  {img: 'url', name: 'absd10', date: '2020-05-15'},
  {img: 'url', name: 'absd11', date: '2020-05-15'},
  {img: 'url', name: 'absd12', date: '2020-05-15'},
  {img: 'url', name: 'absd13', date: '2020-05-15'},
  {img: 'url', name: 'absd14', date: '2020-05-15'},
  {img: 'url', name: 'absd15', date: '2020-05-15'},
  {img: 'url', name: 'absd16', date: '2020-05-15'},
  {img: 'url', name: 'absd17', date: '2020-05-15'},
  {img: 'url', name: 'absd18', date: '2020-05-15'},
  {img: 'url', name: 'absd19', date: '2020-05-15'},
  {img: 'url', name: 'absd20', date: '2020-05-15'},
]


function BusinessClosedJobs({navigation}){
  const list = data.map((item => {
    return (
      <View  key={item.name} style={{
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
            <Text style={{fontSize: 20}}>{item.name}</Text>
            <Text>{item.date}</Text>
          </View>
        </View>
      </View>
    )
  }))
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