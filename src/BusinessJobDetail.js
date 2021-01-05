import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import { getUser } from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';

function BusinessJobDetail({ route, navigation }) {
  const isFocused = useIsFocused();

  const [job, setJob] = useState({});
  const [business, setBusiness] = useState(route.params.job.business);
  const [user, setUser1] = useState({});

  useEffect(() => {

    if (isFocused) {
      console.log(route.params.job)
      getUser().then(u => {
        let u2 = JSON.parse(u)
        // console.log(u2)
        setUser1(u2);
        let form = new FormData();
        form.append('user_token', u2.user_token)
        form.append('job_id', route.params.job.id);
        console.log(form);
        postFormData('/job_detail', form)
          .then(res => {
            return res.json()
          })
          .then(json => {
            console.log(json.data)
            const tempJob = Object.assign(route.params.job, json.data)
            setJob(tempJob);
          })
          .catch(err => {
            console.log(err)
          });
      });
    }
  }, [isFocused]);

  function suspendJob() {
    let suspension = job.suspension == 1 ? "0" : "1";
    let form = new FormData();

    form.append("user_token", user.user_token);
    form.append("suspension", suspension);
    form.append("job_id", job.id)

    postFormData("/suspension_job", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log('Response', json);

        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function archivePosition() {
    Alert.alert(
      'Confirm',
      'Are you sure you want to close this?',
      [

        {
          text: 'Cancel',
          onPress: () => {


          },
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            let form = new FormData();

            form.append("user_token", user.user_token);
            form.append("job_id", job.id)
            postFormData("/close_job", form)
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                console.log('Response', json);

                if (json.status_code == "200") {
                  Alert.alert('Successful', json.msg, [

                    { text: 'Done', onPress: () => console.log('OK Pressed') }
                  ])
                  navigation.goBack();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      ],
      { cancelable: false }
    );
  }

  function dateFormat(date) {
    if (date) {
      let d = date.split("-");
      return `${d[1]}/${d[2]}/${d[0]}`;
    } else {
      return "";
    }
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#4E35AE", "#775ED7"]}
    >
      <SafeAreaView>

        <View
          style={{
            // backgroundColor: '#4E35AE',
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#715FCB",
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <View style={{ width: "33.3%", alignContent: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/ic_back_w.png")}
                style={{
                  width: 28,
                  height: 25,
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
              style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: 'flex-end', marginRight: 10 }}
            >
              <TouchableOpacity onPress={() => archivePosition()}>
                <Text style={{ color: '#fff' }}>{strings.ARCHIVE_POSITION}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{marginBottom:40}}>


          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <TouchableOpacity
              style={{ position: "absolute", top: 20, left: 5 }}
              onPress={() => navigation.navigate('BusinessJobEdit', { job: job })}
            >
              <Text style={{ paddingLeft: 10, color: "#fff", fontSize: 14 }}>
                {strings.EDIT_DESCRIPTION}
              </Text>
            </TouchableOpacity>
            <Image
              source={{ uri: business.avatar_image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 15, top: 20 }}
              onPress={() => suspendJob()}
            >
              <Text style={{ paddingLeft: 10, color: "#fff", fontSize: 14 }}>
                {job.hasOwnProperty('suspension') && (job.suspension == "1" ? strings.UNSUSPEND_JOB : strings.SUSPEND_JOB)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ color: '#fff', fontSize: 22 }}>{job.position}</Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {business.business_name}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
            }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={require("../assets/ic_location.png")}
                style={{ width: 13, height: 13 }}
              />
              <Text style={{ color: "#fff", marginLeft: 5 }}>
                {business.address}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => navigation.navigate('BusinessEmployeesApplication', { job: job })}>
              <Image
                source={require("../assets/ic_people_light.png")}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ color: "#fff", fontSize: 16 }}>{job.hired_count}</Text>

              <Text style={{ color: "#fff", fontSize: 12 }}>{strings.EMPLOYEES}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => navigation.navigate('BusinessSubmittedApplication', { job: job })}>
              <Image
                source={require("../assets/ic_profile_light.png")}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ color: "#fff", fontSize: 16 }}>{job.cv_count}</Text>

              <Text style={{ color: "#fff", fontSize: 12 }}>
                {strings.SUBMITTED_APPLICATION}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 40,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/ic_category.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}
                >
                  {strings.ABOUT_COMPANY}
                </Text>
              </View>
              <Text style={{ marginBottom: 10, marginTop: 10 }}>
                {business.business_detail}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 50,
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                minHeight: 300,
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/ic_calender.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}
                >
                  {strings.START_DATE}
                </Text>
              </View>
              <Text style={{ marginBottom: 30, marginTop: 10 }}>
                {dateFormat(job.start_date)}
              </Text>

              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/ic_category.png")}
                  style={{ width: 15, height: 15 }}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}
                >
                  {strings.POSITION_DESCRIPTION}
                </Text>
              </View>
              <Text style={{ marginBottom: 30, marginTop: 10 }}>
                {job.position_desc}
              </Text>

              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/ic_mind.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}
                >
                  {strings.REQUIRED_EXPERIENCE}
                </Text>
              </View>
              <Text style={{ marginBottom: 30, marginTop: 10 }}>
                {job.experience}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

export default BusinessJobDetail;
