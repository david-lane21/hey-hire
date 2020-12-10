import React, {useState, useEffect} from 'react'
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

import {postFormData} from './utils/network.js'
import {getUser} from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';

function SeekerNotifications({navigation}){
  const isFocused = useIsFocused();

  const [user, setUser] = useState({})

  const [notifications,setNotification] = useState([]);
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused){
      loadData()
    }
  }, [isFocused]);

  function loadData(){
    setRefresh(true);
    getUser().then(u => {
      let u2 = JSON.parse(u)
      // console.log(u2)
      setUser(u2)

      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)
      form.append('type',u2.user_type)

      postFormData('all_recieved_cv_list', form)
      .then(res => {

        return res.json()
      })
      .then(json => {
        console.log('+++++++++++++++++++')
        console.log(json)
        console.log('+++++++++++++++++++')

        setNotification(json.data);
       setRefresh(false);

     
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  function renderItem(item){
    return (
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
        alignItems: 'center',
        marginHorizontal:20
      }}>
        <View style={{flex:1}}>
          <Image source={require('../assets/ApployMeLogo.png')} style={{width:40,height:40,borderRadius:20,marginRight:10}} />
        </View>
        <View style={{flex:8,marginHorizontal:20}}>
        <Text style={{fontWeight:'bold',fontSize:16}}>{item.item.position_name}</Text>
        <Text style={{marginRight:10}}>{item.item.message}</Text>
        </View>
        
      </View>
    )
  }

  return(
    // <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
    //   <SafeAreaView style={{flex: 1}}>
    //     <View style={{flex: 1, alignItems: 'center'}}>
    //       <Text  style={{color: '#6F5EC0', fontSize: 16, fontWeight: 'bold'}}>Notifications</Text>
    //     </View>

    //     <View style={{flex: 1, marginTop: 30}}>
    //       <Text  style={{color: '#999', fontSize: 13, paddingLeft: 20}}>Notifications</Text>
    //     </View>

    //     <View style={{flex: 1, marginTop: 200}}>
    //       <Text  style={{color: '#999', fontSize: 13, textAlign: 'center'}}>No notification yet!</Text>
    //     </View>
    //   </SafeAreaView>
    // </ScrollView>
  //   <LinearGradient
  //   colors={["#4E35AE", "#775ED7"]}
  // >
            <SafeAreaView style={{backgroundColor:'#4E35AE'}}>

      <View style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#6652C2', 
        paddingBottom: 10,
        backgroundColor: '#4E35AE',
        paddingTop:20
        }}>
          <View style={{width: '35%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{paddingLeft: 10}}></Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{ color: '#fff', fontSize: 18}}>{strings.NOTIFICATIONS}</Text>
          </View>
        </View>

    <ScrollView style={{ backgroundColor: '#fff'}} refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={()=>{loadData()}}
        />
       }>
  
       <FlatList
                      style={{backgroundColor:'#fff',marginBottom:140,marginTop:20}}        
       data={notifications}
       keyExtractor={(item) => item.id}
       renderItem={(item)=>renderItem(item)}
      
      />
         
      </ScrollView>

      </SafeAreaView>
      // </LinearGradient>
  )
}

export default SeekerNotifications;