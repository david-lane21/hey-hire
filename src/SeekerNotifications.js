import React, {useState, useEffect} from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  Alert
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

import {postFormData} from './utils/network.js'
import {getUser} from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
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
        if(json.data){
        sortNotification(json.data);
        }else{
          Alert.alert("",json.msg || json)
        }
        setRefresh(false);

     
      })
      .catch(err => {
        console.log(err)
      })
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
          <Image source={{uri:item.item.business_avatar}} style={{width:40,height:40,borderRadius:20,marginRight:10}} />
        </View>
        <View style={{flex:8,marginHorizontal:20}}>
        <Text style={{fontWeight:'bold',fontSize:16}}>{item.item.position_name}</Text>
        <Text style={{marginRight:10}}>{item.item.message}</Text>
        <Text style={{ fontSize: 12, textAlign: 'right' ,fontWeight:'bold'}}>{moment.utc(item.item.created_date).fromNow()}</Text>

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
        <View
          style={{
            alignItems: "center",
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#fff',
          }}
    >

          <Image
            resizeMode="contain"
            source={require("../assets/headerImage.png")}
            style={{ width: 100, alignSelf: "center", }}
          />
        <Text
          style={{
            color: "#4834A6",
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
            position: "absolute",
            top: "75%",
            left: "35%",
            textTransform: 'uppercase'
          }}
        >
          {strings.NOTIFICATIONS}
        </Text>
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