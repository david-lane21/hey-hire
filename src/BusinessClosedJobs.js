import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import { postFormData } from './utils/network.js'
import { getUser, setUser, getToken } from "./utils/utils.js";
import { strings } from './translation/config';
import { useIsFocused } from "@react-navigation/native";

function BusinessClosedJobs({ navigation }) {
  const isFocused = useIsFocused();

  const [closedJobs, setClosedJobs] = useState([])
  const [user, setUser1] = useState({});
  const [refresh, setRefresh] = useState(false);


  const list = closedJobs.map((item => {
    return (
      <TouchableOpacity key={item.id} onPress={() => {
        let job = item;
        job.business = user;
        navigation.navigate('BusinessReListJob', { job: job })
      }}>
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
          alignItems: 'center'
        }}>
          <View style={{ width: '20%' }}>
            <Image
              source={{ uri: user.avatar_image }}
              style={{ width: 40, height: 40, borderRadius: 40 }}
              resizeMode={'stretch'} />
          </View>
          <View style={{ width: '80%' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20 }}>{item.position}</Text>
              <Text>{item.start_date}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }))

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  function loadData() {

    setRefresh(true);

    getUser().then((u) => {
      let u2 = JSON.parse(u);
      setUser1(u2);
      let form = new FormData()
      form.append('user_token', u2.user_token)
      form.append('user_id', u2.user_id)

      postFormData('closed_job_list', form)
        .then(res => {
          return res.json()
        })
        .then(json => {
          setClosedJobs(json.data);
          setRefresh(false);
          })
        .catch(err => {
          console.log(err)
        })
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>

        <View
          style={{
            width: '100%',
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
            justifyContent: "center",
            paddingBottom: 10,
            borderBottomWidth: 0.25,
            borderBottomColor: "rgba(0,0,0,0.2)"
          }}
        >
          <View style={{ position: 'absolute', left: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/ic_back2.png")}
                style={{ width: 28, height: 22 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#4834A6', fontSize: 18 }}>{strings.CLOSED_JOBS}</Text>
          </View>
        </View>
        <ScrollView style={{ backgroundColor: '#fff', marginBottom: 40 }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => { loadData() }}
            />
          }
        >



          <View style={{ padding: 20 }}>
            {list}
          </View>
        </ScrollView>
      </SafeAreaView>

    </View>

  )
}

export default BusinessClosedJobs;
