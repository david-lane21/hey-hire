import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Alert,
  RefreshControl,
  Dimensions
} from "react-native";
import { getUser } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
const window = Dimensions.get("window");
import Header from "./components/Header";
import {strings} from './translation/config';


function SeekerAvailableJobs({ route, navigation }) {

    // const [bizId, setBizId] = useState(route.params.biz_id)
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [jobError,setJobError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // console.log(isFocused)   }
    loadDate()
  }, [isFocused]);

  function loadDate() {
    setRefresh(true);
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      // console.log(u2)
      setUser(u2);

      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id2", u2.user_id);
      form.append("user_id", route.params.biz_id);
      postFormData("get_business_detail", form)
        .then((res) => {
          return res.json();
        })
        .then((json) => { 
          setRefresh(false);

          // console.log("-----------");
          // console.log(json.data);
          // console.log("+++++++++++");

          if(json.data && typeof json.data=="object"){
                      setProfile(json.data);

          if (json.data.is_active == "1") {
            if(json.data.job_count == 0){
              setJobError( "This business is currently not hiring. But don't worry, there are many more businesses to work at on our network! Keep hunting!");
            }else{
            setJobs(json.data.job);
            }
          } else if (json.data.is_active == "1" && json.data.job_count == 0) {
            setError("We're sorry, this business is currently inactive.");
          } else if (is_active == 0 || job_count == 0) {
            setJobError(
              "This business is currently not hiring. But don't worry, there are many more businesses to work at on our network! Keep hunting!"
            );
          }
        }
          else  {
            setError("We're sorry, this business is currently inactive.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function isApplied(job) {
    const findJob = jobs.find((item) => item.id == job.id);
    if (findJob.wishlist) {
      return true;
    }
    return false;
  }

  function getHired(job) {
    let tempJob = job;
    tempJob.business = profile;
    if (route.name == "SeekerHomeAvailableJobs") {
      navigation.navigate("SeekerHomeJobDetail", { job: tempJob });
    } else {
      navigation.navigate("SeekerAppliedJobs0", {
        screen: "SeekerJobDetail",
        params: { job: tempJob },
      });
    }

    
  }

  function addWishlist(job) {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("job_id", job.id);

    let url = 'add_like';
    if(job.like==1){
      url="remove_like"
    }

    postFormData(url, form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log('-----------')
        console.log(url,json);
        if (json.status_code == 200) {
          let findJob = jobs.map((item) => {
            if (item.id == job.id) {
              if(job.like==1){
              item.like = 0;
              }else{
                item.like = 1;

              }
            }
            return item;
          });
          setJobs((jobs) => [...findJob]);
        }
        // Alert.alert("", json.msg);
        // console.log('+++++++++++')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <LinearGradient
    style={{flex:1}}
    colors={["#4E35AE", "#775ED7"]}
  >
    <SafeAreaView>

       <View
            style={{
              backgroundColor: "#4E35AE",
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              paddingBottom: 10,
              paddingTop: 20,
            }}
          >
            <View style={{ width: "33.3%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/ic_back_w.png")}
                  style={{ width: 28, height: 25, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "33.3%" }}>
              <Image
                source={require("../assets/title_header.png")}
                style={{ width: 120, height: 25 }}
              />
            </View>
            <View
              style={{
                width: "33.3%",
                alignItems: "flex-end",
                paddingRight: 15,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SeekerLinks", {
                    screen: "SeekerEditProfile",
                  })
                }
              >
                
              </TouchableOpacity>
            </View>
          </View>
      <ScrollView horizontal={false}  
      style={{marginBottom:50}}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => { loadDate() }} tintColor={'#fff'}
        />
      }>
         
          {error ? (
            <View
              style={{
                // justifyContent: "center",
                alignItem: "center",
                 marginTop:window.height/2-100,
                 marginHorizontal:20,
                 minHeight:window.height/2,
                 backgroundColor:'#fff'
              }}
            >
              <Text style={{ textAlign: "center" }}>{error}</Text>
            </View>
          ) : (
            <View>
              <LinearGradient
                style={{ flex: 1, alignItems: "center" }}
                colors={["#4E35AE", "#775ED7"]}
              >
                <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
                  <ImageBackground
                    source={require("../assets/img_ring.png")}
                    style={{
                      width: 136,
                      height: 136,
                      paddingTop: 17,
                      paddingLeft: 17,
                    }}
                  >
                    <Image
                      source={{ uri: profile.avatar_image }}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                  </ImageBackground>
                </View>

                <View style={{ flex: 1, alignItems: "center",marginHorizontal:20 }}>
                  <Text style={{ color: "#fff", fontSize: 22,textAlign:'center' }}>
                    {profile.business_name}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../assets/ic_location.png")}
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: 10,
                      marginRight: 6,
                    }}
                  />
                  <Text style={{ color: "#fff", marginTop: 10 }}>
                    {profile.address}
                  </Text>
                </View>

                {/* <View style={{ flex: 1, marginTop: 30 }}>
                  <View
                    style={{
                      borderBottomColor: "#715FCB",
                      borderBottomWidth: 1,
                    }}
                  ></View>
                </View> */}

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      textAlign: "left",
                      fontSize: 13.5,
                    }}
                  >
                    {profile.business_detail}
                  </Text>
                </View>
              </LinearGradient>
              { jobError ?
               <View
               style={{
                //  justifyContent: "center",
                 alignItem: "center",
                   paddingTop:100,
                  marginHorizontal:20,
                  minHeight:400
               }}
             >
               <Text style={{ textAlign: "center" }}>{jobError}</Text>
             </View> :
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  minHeight: 450,
                  padding: 20,
                }}
              >
                <View style={{ maxWidth: "100%" }}>
                  <Text style={{ fontSize: 22, paddingBottom: 5 }}>
                    Currently hiring for:
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#888", marginBottom: 30 }}
                  >
                    {strings.TAP_JOB_TO_APPLY}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  {jobs.map((j) => {
                    return (
                      <View
                        key={j.id}
                        style={{
                          padding: 15,
                          borderWidth: 1,
                          borderColor: "#eee",
                          borderRadius: 12,
                          marginBottom: 5,
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View style={{ width: "15%" }}>
                            <Image
                              source={{ uri: profile.avatar_image }}
                              style={{
                                width: 40,
                                height: 40,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 50,
                              }}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => getHired(j)}
                            style={{ width: "77%" }}
                          >
                            <View>
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: "#444",
                                  marginBottom: 5,
                                }}
                              >
                                {j.position}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignContent: "center",
                                }}
                              >
                                <Image
                                  source={require("../assets/ic_location.png")}
                                  style={{
                                    width: 13,
                                    height: 13,
                                    marginRight: 5,
                                  }}
                                />
                                <Text style={{ fontSize: 12, color: "#999" }}>
                                  {profile.address}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => addWishlist(j)}
                          
                          >
                            <View style={{ width: 40 }}>
                              {j.like != "0" ? (
                                <Image
                                  source={require("../assets/ic_heart_purple_header.png")}
                                  style={{ width: 30, height: 30 }}
                                  resizeMode={"stretch"}
                                />
                              ) : (
                                <Image
                                  source={require("../assets/ic_heart_gray_header.png")}
                                  style={{ width: 30, height: 30 }}
                                  resizeMode={"stretch"}
                                />
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
          }
            </View>
          )}
      </ScrollView>
      </SafeAreaView>

    </LinearGradient>
    // </LinearGradient>
  );
}

export default SeekerAvailableJobs;
