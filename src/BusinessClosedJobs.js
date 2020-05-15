import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

const data = [
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
  {img: 'url', name: 'absd', date: '2020-05-15'},
]

function BusinessClosedJobs({navigation}){
  const list = data.map((item => {
    return (
      <View style={{
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
        // alignContent: 'center'
      }}>
        <View style={{width: '25%'}} key={item.name}>
          {/* Image url goes here */}
        </View>
        <View style={{width: '75%'}}>
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