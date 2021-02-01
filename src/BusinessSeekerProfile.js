import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Alert,
  Linking
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { postFormData } from "./utils/network.js";
import { func } from "prop-types";
import { useIsFocused } from "@react-navigation/native";
import { getUser } from "./utils/utils.js";
import Header from "./components/Header";
import { strings } from './translation/config';

function BusinessSeekerProfile({ route, navigation }) {
  console.log(route);
  const isFocused = useIsFocused();

  const [user, setUser1] = useState(route.params.seeker);
  const [businessUser, setBusinesUser] = useState(route.params.business);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (isFocused) {
      getUser().then((u) => {
        let u2 = JSON.parse(u);
        // console.log(u2)
        setUserToken(u2.user_token);
      });
    }
  }, [isFocused]);

  function formatDate(d) {
    return `${("0" + (d.getMonth() + 1)).slice(-2)}/${("0" + d.getDate()).slice(-2)}/${d.getFullYear()}`;
  }

  function handleUnemploy() {
    let form = new FormData();
    form.append("user_token", businessUser.user_token);
    form.append("user_id", businessUser.user_id);
    form.append("emp_id", user.user_id);

    postFormData("get_fired", form)
      .then((res) => {
        console.log("step 1");
        return res.json();
      })
      .then((json) => {
        console.log("step 2");
        console.log(json);
        Alert.alert(json.msg);
        if (json.status_code == 200) {
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleHire() {

    Alert.alert('ApployMe',

      `You are about to hire ${user.first_name} ${user.last_name} For The Following ${user.job_detail[0].position}.  Proceed?`
      , [
        {
          text: 'Yes', onPress: () => {


            let form = new FormData();
            form.append("user_token", userToken);
            form.append("user_id", user.user_id);
            form.append("job_id", user.job_detail[0].id);
            form.append("status", "1");
            postFormData("/get_hired", form)
              .then((res) => {
                console.log("step 1");
                return res.json();
              })
              .then((json) => {
                console.log("step 2");
                console.log(json);
                Alert.alert("", json.msg);
                if (json.status_code == 200) {
                  navigation.goBack();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
        { text: 'Not Now', onPress: () => console.log('OK Pressed') }
      ])


  }



  function onPressCall() {
    // Linking.openURL(`tel:${user.phone}`);

    let form = new FormData();
    form.append("phone", '+1 5417083275');
    form.append("business_id", user.user_id);
    form.append("message", 'Ready for interview');

    postFormData("/send_sms", form)
      .then((res) => {
        console.log("step 1");
        return res.json();
      })
      .then((json) => {
        console.log("step 2");
        console.log(json);
        Alert.alert("", json.msg);
        if (json.status_code == 200) {
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }


  function notRelevant() {

    let form = new FormData();
    form.append("user_token", userToken);
    form.append("user_id", user.user_id);
    form.append("job_id", user.job_detail[0].id);
    form.append("status", "0");

    postFormData("/get_hired", form)
      .then((res) => {
        console.log("step 1");
        return res.json();
      })
      .then((json) => {
        console.log("step 2");
        console.log(json);

        Alert.alert("", json.msg);
        if (json.status_code == 200) {
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#4E35AE", "#775ED7"]}
    >
      <SafeAreaView>

        <View
          style={{
            backgroundColor: "#4E35AE",
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            paddingBottom: 10,
            paddingTop: 15,
            borderBottomColor: "#715FCB",
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require("../assets/title_header.png")}
              style={{ width: 120, height: 25 }}
            />
          </View>
          <View style={{ position: 'absolute' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
              <Image
                source={require("../assets/ic_back_w.png")}
                style={{
                  width: 28,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>


        </View>
        <ScrollView style={{ marginBottom: 50 }}>
          {/* <View
            style={{
              backgroundColor: "#4E35AE",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              paddingBottom: 10,
              paddingTop: 15,
              borderBottomColor: "#715FCB",
            }}
          >
            <View style={{ width: "33.3%", alignContent: "center" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/ic_back_w.png")}
                  style={{
                    width: 40,
                    height: 30,
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
          </View> */}

          {/* <View style={{ flex: 1, alignItems: "center", padding: 20 }}> */}

          <LinearGradient
            style={{
              flex: 1,
              alignItems: "center",
              padding: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
            colors={["#4E35AE", "#4E35AE", "#775ED7"]}
          >
            <Image
              source={{ uri: user.avatar_image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {user.first_name} {user.last_name}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>
                {user.address}
              </Text>
            </View>
            {route.name != "BusinessSeekerProfileMain" && <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>{strings.APPLIED_FOR}: </Text>

              <Text style={{ color: "#fff", fontSize: 14 }}>
                {user.job_detail
                  ? user.job_detail.length > 0 && user.job_detail[0].position
                  : ""}
              </Text>
            </View>}

            {route.name != "BusinessSeekerProfileMain" && route.params.job && route.params.job.active_date && <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>{strings.APPLIED_ON}: </Text>

              <Text style={{ color: "#fff", fontSize: 14 }}>
                {formatDate(new Date(route.params.job.active_date))}
              </Text>
            </View>}
          </LinearGradient>
          {/* </View> */}
          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
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
                  source={require("../assets/icon_note.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}
                >
                  {strings.BIO}
                </Text>
              </View>
              <Text style={{ marginBottom: 10, marginTop: 10 }}>
                {user.bio}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
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
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Image
                  source={require("../assets/ic_star.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}
                >
                  {strings.SKILLS}
                </Text>
              </View>
              {user.skill.map((item) => (
                <View
                  key={item}
                  style={{
                    marginBottom: 10,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      backgroundColor: "#4E35AE",
                      paddingHorizontal: 5,
                      borderRadius: 5,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 5 }}>{strings.EDUCATIONS}</Text>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_educate.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {user.education}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 5 }}>{strings.CERTIFICATION}</Text>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_company_file.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {user.certificate}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 5 }}>{strings.LANGUAGE}</Text>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_language.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {user.language}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 5 }}>{strings.LEVEL_OF_EDUCATION}</Text>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_language.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {user.education_level}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 5 }}>{strings.NAME_OF_INSTITUTION}</Text>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_language.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {user.education}
                </Text>
              </View>
            </View>
          </View>




          <View
            style={{
              alignItems: "flex-start",
              backgroundColor: "#f6f6f6",
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 5 }}>{strings.AVAILABILITY}</Text>
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderColor: "#eee",
                borderWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_language.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {user.availability}
                </Text>
              </View>
            </View>
          </View>


          {businessUser && (
            <View
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",

              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "#4834A6",
                  paddingVertical: 10,
                  borderRadius: 50,
                }}
                onPress={() => handleUnemploy()}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  {strings.UNEMPLOY}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!businessUser && (
            <View
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                paddingBottom: 10
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: '#fff'
                }}
                onPress={() => handleHire()}
              >
                <LinearGradient
                  colors={["#4E35AE", "#775ED7"]}
                  style={{
                    width: "100%",
                    // backgroundColor: "#4834A6",
                    paddingVertical: 10,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                  >
                    {strings.HIRE}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
          {!businessUser && (

            <View
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                paddingVertical: 5,

              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  borderColor: "#4834A6",
                  paddingVertical: 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => onPressCall()}
              >
                <Text
                  style={{ width: '95%', textAlign: "center", fontSize: 18, color: "#4834A6" }}
                >{strings.INTERVIEW_OPTIONS}</Text>
                <Image
                  source={require("../assets/ic_call.png")}
                  style={{ width: 20, height: 20, right: 20, }}
                />
              </TouchableOpacity>
            </View>
          )}
          {!businessUser && (
            <View
              style={{
                width: "100%",
                padding: 20,
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingBottom: 30
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingVertical: 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => notRelevant()}
              >
                <Text
                  style={{ width: '95%', textAlign: "center", fontSize: 18, color: "#000" }}
                >
                  {strings.NOT_RELEVANT}
                </Text>
                <Image
                  source={require("../assets/ic_close_black.png")}
                  style={{ width: 20, height: 20, right: 20, }}
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

export default BusinessSeekerProfile;
