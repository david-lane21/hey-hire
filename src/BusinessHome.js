import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  RefreshControl
} from "react-native";
import { getUser,getToken,removeUser } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';
import { AuthContext } from "./navigation/context";

function BusinessHome({ navigation }) {
  const isFocused = useIsFocused();

  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [deviceToken, setDeviceToken] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { signOut } = React.useContext(AuthContext);


  useEffect(() => {
    // if (isFocused) {

    getUser().then((u) => {

      let u2 = JSON.parse(u);
      // console.log(u2)
      setUser(u2);
      console.log(u2)
      getToken().then((t) => {
        setDeviceToken(t)
      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id", u2.user_id);
      form.append("device_tocken",t);
      console.log(form);

      postFormData("business_profile", form)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log('Business Profile',json)
          setProfile(json.data);
        })
        .catch((err) => {
          setRefresh(false);
          console.log(err);
        });
      });
    });
  // }
  }, []);


  useEffect(() => {
    console.log(isFocused)
    if (isFocused) {
      loadData();

    }
  }, [isFocused]);


  function loadData() {
    setRefresh(true);
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      console.log(u2)
      setUser(u2);  
      getJob(u2);
   
    });
  }

  function getJob(tempUser) {
    let form = new FormData();

    form.append("user_token", tempUser.user_token);
    form.append("user_id", tempUser.user_id);

    postFormData("user_job_list", form)
      .then((res) => {
       return res.json();
      })
      .then((json) => {
        console.log("Response", json.data.length);
        const suspendJob = json.data.filter((item)=>item.suspension==1);
        const unuspendJob = json.data.filter((item)=>item.suspension==0);

        setJobs([...unuspendJob,...suspendJob]);
        setRefresh(false);
      })
      .catch((err) => {
        setRefresh(false);
        console.log(err);
      });
  }

  return (
    <LinearGradient
      style={{ flex: 1}}
      colors={["#4E35AE", "#775ED7"]}
    >
      <SafeAreaView>
     
      <View
            style={{
              // backgroundColor: '#4E35AE',
             // flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              paddingBottom: 10,
              paddingTop: 20,
            }}
          >
            <View style={{ width: "33.3%" }}>
              <TouchableOpacity
                onPress={() =>{
                  removeUser();
                  signOut();
                }}
              >
                <Text style={{ paddingLeft: 10, color: "#fff", fontSize: 18 }}>
                  {strings.LOGOUT}
                </Text>
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
                  navigation.navigate("BusinessLinks", {
                    screen: "BusinessEditAccount",
                  })}
              >
                <Image
                  source={require("../assets/ic_settings.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
      <ScrollView style={{marginBottom:50}} refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => { loadData() }}  tintColor={'#fff'}   />
      }
      
      >
           
          <View
            style={{
              flex: 1,
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 20, left: 10 }}
              onPress={() => navigation.navigate("BusinessEdit")}

            >
              <Text style={{ paddingLeft: 10, color: "#fff", fontSize: 16 }}>
                {strings.EDIT}
              </Text>
            </TouchableOpacity>
            <ImageBackground
              source={require("../assets/img_ring.png")}
              style={{
                width: 136,
                height: 136,
                paddingTop: 17,
                paddingLeft: 17,
                alignSelf: "center",
              }}
            >
              <Image
                source={{ uri: user.avatar_image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </ImageBackground>
            <TouchableOpacity
              style={{ position: "absolute", right: 15, top: 20 }}
              onPress={() => navigation.navigate("BusinessEmployees")}

            >
              <Text style={{ paddingLeft: 10, color: "#fff", fontSize: 16 }}>
                {strings.EMPLOYEES}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {user.business_name}
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
            <Text style={{ color: "#fff" }}>Proprieter: </Text>
            <Text style={{ color: "#fff" }}>
              {user.first_name} {user.last_name}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 30,
            }}
          >
            {/* <Text style={{color: '#fff'}}>Proprieter: </Text> */}
            <Image
              source={require("../assets/ic_location.png")}
              style={{ width: 15, height: 15, marginRight: 5 }}
            />
            <Text style={{ color: "#fff" }}>{user.address}</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              borderTopColor: "rgba(255,255,255,0.1)",
              borderTopWidth: 0.75,
            }}
          >
            {/* <Text style={{color: '#fff'}}>Proprieter: </Text> */}
            <Text style={{ color: "#fff", textAlign: "center" }}>
              {user.business_detail}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              // minHeight: 50,
              padding: 20,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row", maxWidth: "100%" }}>
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    paddingBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  {strings.CURRENT_JOB_OPENINGS}
                </Text>
                <Text style={{ fontSize: 12, color: "#888" }}>
                  {jobs.length} {strings.POSITIONS_AVAILABLE}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => {
                     navigation.navigate("BusinessHomeStack", {
                      screen: "BusinessHomePostNewJob",
                    })
                  }}
                >
                  <Image
                    source={require("../assets/btn_add_new_job.png")}
                    style={{ width: 120, height: 28 }}
                    resizeMode={"stretch"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <FlatList
              data={jobs}
              keyExtractor={(item) => item.created_date}
              style={{minHeight:300}}
              renderItem={({ item, index, separators }) => (
                <TouchableOpacity onPress={()=> {
                  let job = item;
                  job.business = user;
                  navigation.navigate("BusinessHomeStack", {
                  screen: "BusinessJobDetail",
                  params: {job: job}
                })
                }}>
                <View
                  style={{
                    backgroundColor: item.suspension==1? "#e2e2e2":"#fff",
                    borderColor: "#eee",
                    padding: 10,
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
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 20,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "20%" }}>
                      <Image
                        source={{ uri: user.avatar_image }}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#444",
                          borderRadius: 40,
                        }}
                      />
                    </View>
                    <View style={{ width: "65%" }}>
                      <Text style={{ fontSize: 16 }}>{item.position}</Text>
                    </View>
                    <View style={{ width: "15%", flexDirection: "row" }}>
                      <Image
                        source={require("../assets/ic_profile.png")}
                        style={{ width: 20, height: 20, marginRight: 5 }}
                      />
                      <Text style={{ fontSize: 16, color: "#4834A6" }}>
                        {item.cv_count}
                      </Text>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              )}
            />
          </View>
      </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

export default BusinessHome;
