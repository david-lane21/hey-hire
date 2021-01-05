import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import {getUser} from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';

function BusinessEmployees({ route, navigation }) {
  const isFocused = useIsFocused();

  const [user, setUser1] = useState({});
  const [employeesList,setEmployeesList] = useState([])

  useEffect(() => {
    
    if (isFocused) {

    getUser().then(u => {
      let u2 = JSON.parse(u)
      console.log(u2)
      setUser1(u2);
      let form = new FormData();
      form.append('user_token', u2.user_token)
      form.append('business_id', u2.user_id )
     
      postFormData('/hired_employee_list', form)
      .then(res => {
        return res.json()
      })
      .then(json => {       
        console.log(json.data);
        setEmployeesList(json.data)
      })
      .catch(err => {
        console.log(err)
      });
    });
  }
  },[isFocused]);

 
  function renderItem(item){
    return (
      <TouchableOpacity key={item.id} onPress={() => {
       
        navigation.navigate('BusinessSeekerProfile',{business:user, seeker:item})
        }}>
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
              source={{uri: item.avatar_image}} 
              style={{width: 40, height: 40, backgroundColor: '#666', borderRadius: 20  }}
              resizeMode={'stretch'} />
           
          </View>
          <View style={{width: '80%'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20}}>{item.first_name} {item.last_name}</Text>
              <Text>{item.job_detail.length>0 && item.job_detail[0].position}</Text>
            </View>
          </View>
          
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <LinearGradient
      colors={["#4E35AE", "#775ED7"]}
    > 
       <SafeAreaView >
      <View
            style={{
               backgroundColor: '#4E35AE',
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 15,
            }}
          >
            <View style={{ width: "33.3%", alignContent: "center" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/ic_back_w.png")}
                  style={{
                    width: 28, height: 25,
                    marginTop: 10,
                    marginLeft: 10,
                    
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "33.3%" }}>
              <Image
                source={require("../assets/title_header.png")}
                style={{ width: 120, height: 25 }}
              />
            </View>
            <View style={{ width: "33.3%" }}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <View style={{ flex: 2 }}></View>
              </View>
            </View>
          </View>

      <ScrollView style={{backgroundColor:'#fff'}} >
       
          
          <View style={{ flex: 1, alignItems: "center", padding: 20,backgroundColor:'#fff' }}>
                  <FlatList
                  data={employeesList}
                  renderItem={({item})=>renderItem(item)}
                  keyExtractor={(item) => item.user_id}

                  />
          </View>
      </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

export default BusinessEmployees;
