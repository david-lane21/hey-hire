import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { getUser } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import ConfirmationAlert from "./components/ConfirmationAlert";
import AlertPopup from "./components/AlertPopup";
import { strings } from './translation/config';
import { useIsFocused } from "@react-navigation/native";


function SeekerJobDetail({ route, navigation }) {
  const isFocused = useIsFocused();

  const tempJob = Object.assign({}, route.params.job, {}) ;
  const [user, setUser] = useState({});
  const [job, setJob] = useState(tempJob);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getUser().then((u) => {
        let u2 = JSON.parse(u);
        // console.log(u2)
        setUser(u2);
        let form = new FormData();
        form.append("user_token", u2.user_token);
        form.append("job_id", route.params.job.id);

        postFormData("/job_detail", form)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // console.log("Detail", json.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [isFocused]);

  function handlePostCV() {
    setModal1(true);
  }

  function onSendCV() {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("job_id", job.id);

    postFormData("send_cv", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log("-----------");
        console.log(json.status_code);
        if (json.status_code != 200) {
          Alert.alert("", json.msg);
        } else {
          setModal2(true);
        }

        console.log("+++++++++++");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setJob(job);
  }, [job]);

  function addWishlist() {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("job_id", job.id);

    let url = 'add_like';
    if (job.like == '1') {
      url = "remove_like"
    }



    postFormData(url, form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(job.like, url, json);
        if (json.status_code == 200) {
          const tempJob = Object.assign({}, job, {}) ;
          if (tempJob.like == '1') {
            tempJob.like = 0;
          } else {
            tempJob.like = '1';
          }
          setJob((job) => tempJob);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onCancelCV() {
    Alert.alert(
      'Confirm',
      'Are you sure you want to revoke your application?',
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
            form.append("user_id", user.user_id);
            form.append("job_id", job.id);
            form.append("cv_id", job.cv_id)

            postFormData("cancel_cv", form)
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                console.log("-----------");
                console.log(json.status_code);
                if (json.status_code == 200) {
                  Alert.alert("Successful", json.msg)

                  navigation.goBack();
                } else {
                  Alert.alert("Error", json.msg)
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
            paddingBottom: 10,
            paddingTop: 15,
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
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ flex: 2 }}></View>
              {job.aplied == '1' ?
                <TouchableOpacity style={{ flex: 1 }} onPress={() => onCancelCV()}>
                  <Image
                    source={require("../assets/ic_checked_white.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity> : job.like == 1 ? <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => addWishlist()} >
                  <Image
                    source={require("../assets/ic_heart_filled_w.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode={'stretch'}
                  />
                </TouchableOpacity> : null
              }
              <TouchableOpacity style={{ flex: 1 }}>
                <Image
                  source={require("../assets/ic_share_w.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView       style={{marginBottom:50}}
>


          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Image
              source={{ uri: job.business.avatar_image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center", marginHorizontal: 20 }}>
            <Text style={{ color: "#fff", fontSize: 22, textAlign: 'center' }}>
              {job.business.business_name}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#fff" }}>
              {strings.CURRENTLY_VIEWING_POSTION}: {job.position}
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
                {job.business.address}
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
            }}
          >
            <Text style={{ color: "#fff" }}>
              {job.business.business_detail}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 40,
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

            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 20,
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "#4834A6",
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 50,
                }}
                onPress={() => handlePostCV()}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  {strings.SEND_APPLICATION}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ConfirmationAlert
            visible={modal1}
            job={job}
            onClose={() => setModal1(false)}
            onSendCV={() => onSendCV()}
          />
          <AlertPopup
            visible={modal2}
            job={job}
            onClose={() => setModal2(false)}
          />
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

export default SeekerJobDetail;
