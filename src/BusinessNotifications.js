import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment';
import { postFormData } from './utils/network.js'
import { getUser } from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import { strings } from './translation/config';


const data = [
  { img: 'url', name: 'absd1', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd2', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd3', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd4', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd5', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd6', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd7', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd8', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd9', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd10', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd11', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd12', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd13', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd14', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd15', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd16', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd17', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd18', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd19', detail: 'lorem ipsum dollar sit amit' },
  { img: 'url', name: 'absd20', detail: 'lorem ipsum dollar sit amit' },
]


function BusinessNotifications({ navigation }) {

  const isFocused = useIsFocused();



  const [user, setUser] = useState({})

  const [notifications, setNotification] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused) {
      loadData()
    }
  }, [isFocused]);

  function loadData() {
    setRefresh(true);
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)

      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)
      form.append('type', u2.user_type)

      postFormData('all_recieved_cv_list', form)
        .then(res => {

          return res.json()
        })
        .then(json => {
          console.log('+++++++++++++++++++')
          console.log(json)
          console.log('+++++++++++++++++++')

          // setNotification(json.data);
          sortNotification(json.data)
          setRefresh(false);


        })
        .catch(err => {
          console.log(err)
        });

      let form2 = new FormData();
      form2.append('user_token', u2.user_token)
      form2.append('user_id', u2.user_id)
      postFormData('business_visiter_list', form2)
        .then(res => {

          return res.json()
        })
        .then(json => {
          console.log('Visitor +++++++++++++++++++')
          console.log(json)
          console.log('+++++++++++++++++++')
          let tempVisitors = [];

          json.data.forEach((item)=>{
            if(item.user_detail){
              tempVisitors.push(item);
            }
          })

          setVisitors(tempVisitors);

        })
        .catch(err => {
          console.log(err)
        });


    })
  }

  function sortNotification(data) {
    let tempNotifications = data.sort((a, b) => {
      let dateA = new Date(a.created_date);
      let dateB = new Date(b.created_date);
      return dateB - dateA;
    });
    setNotification(tempNotifications);  
  }


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
        <View style={{ width: '20%' }} key={item.name}>
          <Image
            source={{ uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
            style={{ width: 40, height: 40, backgroundColor: '#444', borderRadius: 40 }} />
        </View>
        <View style={{ width: '80%' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: '#444' }}>{item.detail}</Text>
            <Text style={{ fontSize: 12, textAlign: 'right',fontWeight:'bold' }}>2 months ago</Text>
          </View>
        </View>
      </View>
    )
  }))

  function renderItem(item) {
    return (
      <TouchableOpacity style={{
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
        alignItems: 'center',
        marginHorizontal: 20
      }}
      onPress={()=>
        {
          let tempUser = item.item.user_detail;
          tempUser.job_detail= [item.item.job_detail];
        navigation.navigate('BusinessSeekerProfileMain',{seeker:tempUser});

        }
      
      }
      >
        <View style={{ flex: 1 }}>
          <Image source={{ uri: item.item.user_detail.avatar_image }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
        </View>
        <View style={{ flex: 8, marginHorizontal: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.item.position_name}</Text>
          <Text style={{ marginRight: 10 }}>{item.item.message}</Text>
          <Text style={{ fontSize: 12, textAlign: 'right' ,fontWeight:'bold'}}>{moment.utc(item.item.created_date).fromNow()}</Text>
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => { loadData() }}
        />
      }>



        <View style={{ padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 13, color: '#888' }}>Visitors (QR scanned, Application not yet submitted) {visitors.length}</Text>
          <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>

          <FlatList
            style={{ backgroundColor: '#red', marginBottom: 20 }}
            data={visitors}
            keyExtractor={(item) => item.visiter_id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
              <TouchableOpacity style={{flex:1}} onPress={()=> navigation.navigate('BusinessVisitorDetail',{seeker:item.user_detail})}>
              <Image
              source={{ uri: item.user_detail.avatar_image?item.user_detail.avatar_image:'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
              style={{ width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
              </TouchableOpacity>)
            }}
            horizontal={true}
          />

            {/* <Image
              source={{ uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
              style={{ width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image
              source={{ uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
              style={{ width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image
              source={{ uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
              style={{ width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image
              source={{ uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
              style={{ width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} />
            <Image
              source={{ uri: 'https://ya-webdesign.com/images600_/avatar-png-1.png' }}
              style={{ width: 60, height: 60, marginRight: 10, backgroundColor: '#444', borderRadius: 50, borderWidth: 1, borderColor: '#000' }} /> */}
          </View>
        </View>


        <View style={{ padding: 0 }}>
          <Text style={{ padding: 20, color: '#888' }}>Notifications {notifications.length}</Text>


          <FlatList
            style={{ backgroundColor: '#fff', marginBottom: 140 }}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={(item) => renderItem(item)}

          />

        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default BusinessNotifications;


function Header() {
  return (
    <View style={{
      // flex: 1, 
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
      paddingTop:10
    }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#4E35AE', fontSize: 18 }}>Notifications</Text>
      </View>
    </View>
  )
}