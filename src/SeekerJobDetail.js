import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  Linking,
} from "react-native";
import { getUser, setUser } from "./utils/utils.js";
import { postFormData, getRequest, postJSON } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import ConfirmationAlert from "./components/ConfirmationAlert";
import AlertPopup from "./components/AlertPopup";
import { strings } from "./translation/config";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import InstagramLoginPopup from "./components/InstagramLogin.js";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';

function SeekerJobDetail({ route, navigation }) {
  const isFocused = useIsFocused();

  const tempJob = Object.assign({}, route.params.job, {});
  const [user, setUser1] = useState({});
  const [business, setBusiness] = useState(tempJob.business);
  const [job, setJob] = useState(tempJob);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [instaModalShow, setInstaModalShow] = useState(false);
  const userData = useSelector(state => state.UserData)

  useEffect(() => {
    Linking.addEventListener("url", handleOpenURL);
      loadData();
    return () => {
      Linking.removeEventListener("url", handleOpenURL);
    };
  }, [isFocused]);
  console.log('job', job);
  console.log('route.params.job', route.params.job);
  function loadData() {
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      console.log("Local user", u2);
      console.log('route.params.job.id', route.params.job);
      setUser1(u2);
      getRequest(`/job-seeker/job-position/${route.params.job.id}`, userData.token)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log("Detail after updates in api ", json);
          setJob(
            Object.assign(json.data, { like: tempJob.like ? tempJob.like : 0 })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleOpenURL(event) {
    let businessId = event.url.split("/").filter(Boolean).pop();
    console.log("Hand", event.url, businessId);
    if (businessId == "instagram-success") {
      Alert.alert("Instagram connected successfully");
      onCloseInstagramConnect();
    } else if (businessId == "instagram-failure") {
      Alert.alert("Instagram not connected");
    }
  }

  function handlePostCV() {
    setModal1(true);
  }

  function onCloseInstagramConnect() {
    console.log(user);
    setInstaModalShow(false);

    getUser().then((u) => {
      let u2 = JSON.parse(u);
      console.log("Local user", u2);
      setUser1(u2);
      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id", u2.user_id);
      console.log("profile data", form);
      postFormData("user_profile", form)
        .then((res) => {
          console.log("Prifile data", res);
          return res.json();
        })
        .then((json) => {
          console.log("Profile data", json);
          var tempUserData = u2;
          tempUserData.instagram_connected = json.data.instagram_connected;
          console.log("tem", tempUserData);
          setUser1(tempUserData);
          setUser(tempUserData);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  async function onSendCV() {
    try {
      const body = {
        "job_id": job.id
      }
      console.log('body', body);
      const res = await postJSON('/job-seeker/application/', body, userData.token);
      const json = await res.json()
      setModal2(true);
      const tempJob = Object.assign({}, job, { application: {status: "applied", applied_at: new Date()} });
      console.log('onSendCV -> tempJob', tempJob);
      console.log('onSendCV -> json', json);
      setJob(tempJob);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    setJob(job);
  }, [job]);
/*
  function addWishlist() {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("job_id", job.id);

    let url = "add_like";
    if (job.like == "1") {
      url = "remove_like";
    }

    postFormData(url, form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(job.like, url, json);
        if (json.status_code == 200) {
          const tempJob = Object.assign({}, job, {});
          if (tempJob.like == "1") {
            tempJob.like = 0;
          } else {
            tempJob.like = "1";
          }
          setJob((job) => tempJob);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
*/
  function onCancelCV() {
    Alert.alert(
      "Confirm",
      "Are you sure you want to revoke your application?",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            getRequest(`/job-seeker/application/cancel/${job.id}`, userData.token)
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              console.log("onCancelCV -> json", json);
             // if (json.status_code === 200) {
               if (json.data.status == "canceled") {
                Alert.alert("Successful", json.msg);

                navigation.goBack();
              } else {
                Alert.alert("Error", json.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  function onNudge() {
    console.log(job);
    const appliedDate = moment(new Date(job.application.applied_at));
    const currentDate = moment();

    var dayDiff = currentDate.diff(appliedDate, "days");
    if (dayDiff > 4) {
      //let form = new FormData();
      //form.append("user_token", user.user_token);
      //form.append("user_id", user.user_id);
      //form.append("job_id", job.id);

      postFormData("nudge_job", form)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json);
          if (json.status_code == 200) {
            Alert.alert("", json.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const days = 5 - dayDiff;
      Alert.alert(
        "",
        "You can only nudge the manager after 5 business days. Please try again in " + days + (days > 1 ? " days." : " day.")
      );
    }
  }

  console.log('user', user);

  function dateFormat(date) {
    if (date) {
      let d = date.split("-");
      return `${d[1]}/${d[2]}/${d[0]}`;
    } else {
      return "";
    }
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#4E35AE", "#775ED7"]}>
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
          <View style={{ width: "33.3%" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/ic_back_w.png")}
                style={{ width: 20, height: 20, marginLeft: 10, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "33.3%" }}>
            <Image
              source={require("../assets/heyhireFullWhite.png")}
              style={{ width: 120, height: 25, resizeMode: 'contain' }}
            />
          </View>
          <View style={{ width: "33.3%" }}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ flex: 2 }}></View>
              <TouchableOpacity style={{ flex: 1 }}>
                <Image
                  source={require("../assets/ic_share_w.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  route.params.callBack(route.params.job);
                  if (job.like && job.like == 1) {
                    setJob(
                      Object.assign({}, job, {like: 0})
                    );
                  } else {
                    setJob(
                      Object.assign({}, job, {like: 1})
                    );
                  }
                  console.log('_tempJob', job);
                }}
              >
                {job.like & job.like == 1 ? (<Image
                  source={require("../assets/ic_heart_filled_w.png")}
                  style={{ width: 28, height: 25, marginRight: 5, resizeMode: 'contain' }}
                />) : (
                <Image
                  source={require("../assets/ic_heart_blank.png")}
                  style={{ width: 28, height: 25, marginRight: 5, resizeMode: 'contain' }}
                />)}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 50 }}>
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <ImageBackground
              source={require("../assets/buisness_image_container.png")}
              style={{
                width: 136,
                height: 136,
                paddingTop: 17,
                paddingLeft: 17,
              }}
            >
              <Image
                source={{ uri: business.avatar_image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </ImageBackground>
          </View>

          <View style={{ flex: 1, alignItems: "center", marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={{ color: "#fff", fontSize: 22, textAlign: "center", fontWeight: 'bold' }}>
              {job.title}
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'center', marginHorizontal: 20, marginVertical: 2 }}>
            <Image
              source={require('../assets/ic_calendar_w.png')}
              style={{ width: 9, height: 9, resizeMode: 'contain' }}
            />
            <Text style={{ color: "#fff", marginLeft: 5, fontSize: 11 }}>
              {strings.START_DATE}:
            </Text>
            <Text style={{ color: "#fff", marginLeft: 5, fontSize: 11 }}>
              {moment(job.start_date).format("MM/DD/YYYY")}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center", marginVertical: 2 }}>
            <Text style={{ color: "#fff", fontSize: 11, fontWeight: 'bold' }}>
              {business.company.name}
            </Text>
          </View>

          {job.application && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 2
              }}
            >
              <Text style={{ color: "#fff", fontSize: 11 }}>{strings.APPLIED_ON}: </Text>

              <Text style={{ color: "#fff", fontSize: 11 }}>
                {moment(job.application.applied_at).format("MM/DD/YYYY")}
              </Text>
            </View>
          )}

          {job.application && job.application.viewed_at && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 2
              }}
            >
              <Text style={{ color: "#fff" }}>{strings.VIEWED_ON}: </Text>

              <Text style={{ color: "#fff", fontSize: 14 }}>
                {moment(job.application.viewed_at).format("MM/DD/YYYY")}
              </Text>
            </View>
          )}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              marginVertical: 2
            }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={require("../assets/location_white.png")}
                style={{ width: 12, height: 12, resizeMode: 'contain' }}
              />
              <Text style={{ color: "#fff", marginLeft: 5, fontSize: 11 }}>
                {business.address.address}
              </Text>
            </View>
          </View>


          {business.website && (<View
            style={{
              flex: 1,
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 11, fontWeight: 'bold', textAlign: 'left' }}>{business.website}</Text>
          </View>)}


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
                padding: 10,
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
                  source={require("../assets/ic_category_yellow.png")}
                  style={{ width: 15, height: 15, resizeMode: 'contain' }}
                />
                <Text
                  style={{ fontSize: 14, marginLeft: 10, fontWeight: "bold", color: '#594A9E' }}
                >
                  {strings.POSITION_DESCRIPTION}
                </Text>
              </View>
              <Text style={{ marginBottom: 30, marginTop: 2, fontSize: 13, color: '#3D3B4E' }}>
                {job.description}
              </Text>

              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/ic_mind_yellow.png")}
                  style={{ width: 15, height: 15, resizeMode: 'contain' }}
                />
                <Text
                  style={{ fontSize: 14, marginLeft: 10, fontWeight: "bold", color: '#594A9E' }}
                >
                  {strings.REQUIRED_EXPERIENCE}
                </Text>
              </View>
              <Text style={{ marginBottom: 30, marginTop: 2, fontSize: 13, color: '#3D3B4E' }}>
                {job.experience}
              </Text>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../assets/ic_certificate_yellow.png")}
                  style={{ width: 15, height: 15, resizeMode: 'contain' }}
                />
                <Text
                  style={{ fontSize: 14, marginLeft: 10, fontWeight: "bold", color: '#594A9E' }}
                  >
                  {strings.REQUIRED_CERTIFICATIONS}
                </Text>
              </View>
              <Text style={{ marginBottom: 30, marginTop: 10, fontSize: 15 }}>
                {job.required_certifications
                  ? job.required_certifications.map((item) => item + "\n")
                  : ""}
              </Text>
              {job.instagram_required ? (
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/*<Image
                      source={require("../assets/instagram-brands.png")}
                      style={{ width: 20, height: 20, tintColor: "#4834A6" }}
                  />*/}
                    <Text
                      style={{
                        fontSize: 14,
                        // marginLeft: 10,
                        fontWeight: "bold",
                        color: '#594A9E'
                      }}
                    >
                      {"Instagram required"}
                    </Text>
                  </View>

                  <Text
                    style={{ marginBottom: 30, marginTop: 10, fontSize: 13, color: '#3D3B4E' }}
                  >
                    {business.name}{" "}
                    {
                      "is requesting that you connect your Instagram account to your profile to apply for this position."
                    }
                  </Text>
                  {user && user.profile && !user.profile.instagram_connected ? (
                    <View>
                      <Text
                        style={{ marginBottom: 20, marginTop: 5, fontSize: 13, color: '#3D3B4E' }}
                      >
                        {"Please connect your Instagram"}
                      </Text>
                      <ImageBackground
                        source={require("../assets/insta-connect-bg.png")}
                        style={{
                          borderRadius: 40,
                        }}
                        resizeMode={"stretch"}
                      >
                        <TouchableOpacity
                          style={{
                            padding: 12,
                            flexDirection: "row",
                            paddingVertical: 15,
                            alignItems: "center",
                            // justifyContent: 'center'
                          }}
                          onPress={() => {
                            setInstaModalShow(true);
                          }}
                        >
                          <AntDesign
                            name="instagram"
                            size={32}
                            color="white"
                            style={{ position: "absolute", left: 20 }}
                          />
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              marginLeft: 50,
                              fontWeight: "bold",
                            }}
                          >
                            {strings.CONNECT_YOUR_INSTAGRAM}
                          </Text>
                          <MaterialCommunityIcons
                            name={"checkbox-blank-circle-outline"}
                            size={32}
                            color="white"
                            style={{ position: "absolute", right: 20 }}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontSize: 15, marginRight: 5 }}>
                        {"Your account is connected to Instagram"}
                      </Text>
                      <Image
                        source={require("../assets/checkbox_checked.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  )}
                </View>
              ) : null}
            </View>
            {job.application && job.application.status == "applied" ? (
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
                    backgroundColor: "#ff0",
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderRadius: 50,
                    marginBottom: 10,
                    justifyContent: "center",
                  }}
                  onPress={() => onNudge()}
                >
                  <Image
                    source={require("../assets/Bell.png")}
                    style={{
                      height: 25,
                      width: 25,
                      position: "absolute",
                      left: 20,
                    }}
                  />
                  <Text
                    style={{ textAlign: "center", fontSize: 18, color: "#000" }}
                  >
                    {strings.SEND_NUDGE}
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, color: "#666", marginBottom: 10, marginHorizontal: 5, opacity: 0.7 }}>{strings.NUDGE_DESCRIPTION}</Text>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: "#f00",
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderRadius: 50,
                  }}
                  onPress={() => onCancelCV()}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                  >
                    {strings.CANCEL_APPLICATION}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
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
                    backgroundColor:
                      job.instagram_required && !user.profile.instagram_connected
                        ? "#a8a4a6"
                        : "#4834A6",
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderRadius: 50,
                  }}
                  onPress={tempJob && tempJob.application !== null ? tempJob.application.status === "applied" ? () => onCancelCV() : () => handlePostCV() : () => handlePostCV()}
                  disabled={job.instagram_required && !user.profile.instagram_connected}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                  >
                    {tempJob && tempJob.application !== null ? tempJob.application.status === "applied" ? strings.CANCEL_APPLICATION : strings.SEND_APPLICATION  : strings.SEND_APPLICATION}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ConfirmationAlert
            visible={modal1}
            job={job}
            business={business}
            onClose={() => setModal1(false)}
            onSendCV={() => onSendCV()}
          />
          <AlertPopup
            visible={modal2}
            job={job}
            business={business}
            onClose={() => setModal2(false)}
          />
          {/*<InstagramLoginPopup
            userId={userData.profile.id}
            visible={instaModalShow}
            onClose={() => {
              onCloseInstagramConnect();
            }}
          />*/}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default SeekerJobDetail;
