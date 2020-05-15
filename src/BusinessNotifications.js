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
  {img: 'url', name: 'absd1', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd2', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd3', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd4', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd5', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd6', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd7', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd8', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd9', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd10', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd11', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd12', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd13', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd14', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd15', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd16', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd17', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd18', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd19', detail: 'lorem ipsum dollar sit amit'},
  {img: 'url', name: 'absd20', detail: 'lorem ipsum dollar sit amit'},
]


function BusinessNotifications({navigation}){
  const list = data.map((item => {
    return (
      <View key={item.name} style={{
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
        <View style={{width: '20%'}} key={item.name}>
        <Image 
            source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
            style={{width: 40, height: 40, backgroundColor: '#444', borderRadius: 40 }} />
        </View>
        <View style={{width: '80%'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18}}>{item.name}</Text>
            <Text style={{color: '#444'}}>{item.detail}</Text>
            <Text style={{fontSize: 12, textAlign: 'right'}}>2 months ago</Text>
          </View>
        </View>
      </View>
    )
  }))

  return(
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView>
        <Header />

        <View style={{padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
          <Text style={{fontSize: 13, color: '#888'}}>Visitors (QR scanned, Application not yet submitted) 97</Text>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
            <Image 
            source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
            style={{width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image 
            source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
            style={{width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image 
            source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
            style={{width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image 
            source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
            style={{width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image 
            source={{uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png'}} 
            style={{width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
          </View>
        </View>
        

        <View style={{padding: 20}}>
          <Text style={{paddingBottom: 20, color: '#888'}}>Notifications 21</Text>
          {list}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default BusinessNotifications;


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
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{ color: '#000', fontSize: 18}}>Notifications</Text>
      </View>
    </View>
  )
}