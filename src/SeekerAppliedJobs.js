import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { postFormData } from "./utils/network.js";
import { getUser } from "./utils/utils.js";
import { useIsFocused } from "@react-navigation/native";
import { strings } from "./translation/config";
import CommonUtils from "./utils/CommonUtils";
function SeekerAppliedJobs({ navigation }) {
  const isFocused = useIsFocused();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [likedJobs, setLikedJobs] = useState([]);
  const [viewed_jobs, setViewed_jobs] = useState([]);

  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [refresh, setRefresh] = useState(false);

  function searchJobs(txt) {
    setSearch(txt);

    let text = txt.toLowerCase();
    if (text == "") {
      setFilteredJobs([...appliedJobs, ...likedJobs]);
    } else {
      let jobs = [...appliedJobs, ...likedJobs].filter((j) =>
        j.position.toLowerCase().includes(text)
      );
      setFilteredJobs(jobs);
    }
  }

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  function loadData() {
    setRefresh(true);

    getUser().then((u) => {
      let u2 = JSON.parse(u);
      // console.log(u2)
      setUser(u2);

      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id", u2.user_id);

      postFormData("sw_job_list", form)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          // console.log('+++++++++++++++++++')
          console.log(json);
          // console.log([...json.data,...json.liked_jobs])
          // console.log('+++++++++++++++++++')
          if (json.msg == "No Job Available!") {
            setMessage(json.msg);
            setAppliedJobs([]);
            setFilteredJobs([]);
          } else {
            setMessage(null);
            setAppliedJobs(json.applied_jobs);
            setViewed_jobs(json.viewed_jobs);
            if (json.applied_jobs.length > 0) {
              const likedJobs = [];
              json.liked_jobs.map((item) => {
                const tempApplied = json.applied_jobs.filter(
                  (item1) => item1.id == item.id
                );
                if (tempApplied.length == 0) {
                  likedJobs.push(item);
                }
              });

              setLikedJobs(likedJobs);
              console.log(likedJobs);
              setFilteredJobs([...json.applied_jobs, ...likedJobs]);
            } else {
              setLikedJobs(json.liked_jobs);
              setFilteredJobs([...json.applied_jobs, ...json.liked_jobs]);
            }
          }
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
          setRefresh(false);
        });
    });
  }

  function addWishlist(job) {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("job_id", job.id);

    let url = "add_like";
    if (job.like == "1") {
      url = "remove_like";
    }
    console.log(job.like);

    postFormData(url, form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        // console.log('-----------')
        console.log(json);
        if (json.status_code == 200) {
          let findJob = filteredJobs.map((item) => {
            if (item.id == job.id) {
              if (job.like == 0) {
                item.like = 1;
              } else {
                item.like = 0;
              }
            }
            return item;
          });
          setFilteredJobs((jobs) => [...findJob]);
        }
        // loadData();
        // Alert.alert("", json.msg);
        // console.log('+++++++++++')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const list = filteredJobs.map((item) => {
    // console.log(item)
    const isLiked = likedJobs.filter((item1) => item.id == item1.id);
    const isApplied = appliedJobs.filter((item1) => item.id == item1.id);
    const isViewed = viewed_jobs.filter((item1) => item.id == item1.id);

    const distance = CommonUtils.distance(
      parseFloat(item.business.latitude),
      parseFloat(item.business.longitude),
      "K"
    );

    console.log("isViewed", isViewed, item.id);

    return (
      <TouchableOpacity
        key={item.id + "" + item.like + "" + item.aplied}
        onPress={() => {
          if (isViewed.length > 0) {
            let tempJob = isApplied.length > 0 ? isApplied[0] : item;
            tempJob.viewed_on = isViewed[0].viewed_on;
            navigation.navigate("SeekerAppliedJobs0", {
              screen: "SeekerJobDetail",
              params: { job: tempJob },
            });
          } else {
            navigation.navigate("SeekerAppliedJobs0", {
              screen: "SeekerJobDetail",
              params: { job: isApplied.length > 0 ? isApplied[0] : item },
            });
          }
        }}
      >
        <View
          style={{
            backgroundColor: "#F4F5FA",
            borderColor: "#eee",
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
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <View style={{ width: "17%" }}>
            <Image
              source={{ uri: item.business.avatar_image }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#444",
                borderRadius: 40,
                borderWidth: 1,
                borderColor: "#888",
              }}
            />
          </View>
          <View style={{ width: "65%", backgroundColor: "#F4F5FA" }}>
            <View style={{}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {item.position}
                </Text>
                {item.aplied == 1 ? (
                  <Image
                    source={require("../assets/ic_applied.png")}
                    style={{ width: 60, height: 15, marginLeft: 15 }}
                  />
                ) : null}
                 {isViewed.length > 0 && (
              <View style={{ width: 35 }}>
                <Image
                  source={require("../assets/ic-viewed.png")}
                  style={{ width: 60, height: 15,marginLeft:10 }}
                  resizeMode={"stretch"}
                />
              </View>
            )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#444",
                    fontWeight: "600",
                    textAlignVertical: "center",
                  }}
                  numberOfLines={2}
                >
                  {item.business.business_name}{" "}
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#666",
                      textAlignVertical: "center",
                      fontWeight: "500",
                    }}
                  >
                    {" • "}
                    {distance} {strings.MILES_AWAY}
                  </Text>
                </Text>
              </View>

              <Text style={{ fontSize: 12, color: "#888", marginTop: 2.5 }}>
                {item.business.address}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "18%",
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {isLiked.length > 0 && item.like == 1 ? (
              <TouchableOpacity onPress={() => addWishlist(item)}>
                <View style={{ width: 40 }}>
                  {item.like == "1" ? (
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
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#4E35AE", "#775ED7"]}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#6652C2",
            paddingBottom: 10,
            backgroundColor: "#4E35AE",
            paddingTop: 20,
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../assets/title_header.png")}
              style={{ width: 120, height: 25 }}
            />
          </View>
        </View>

        <ScrollView
          style={{ backgroundColor: "#FFF", marginBottom: 50 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                loadData();
              }}
              tintColor={"#4E35AE"}
            />
          }
        >
          <View style={{ backgroundColor: "#F4F5FA", minHeight: 1000 }}>
            <View
              style={{
                backgroundColor: "#4E35AE",
                padding: 20,
                borderBottomLeftRadius: 7,
                borderBottomRightRadius: 7,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image source={require("../assets/ic_search_w.png")} />

                <TextInput
                  style={{
                    width: "85%",
                    paddingLeft: 10,
                    color: "#fff",
                    paddingTop: 0,
                  }}
                  onChangeText={(text) => searchJobs(text)}
                  placeholder={strings.SEARCH_SPECIFIC_JOB}
                  value={search}
                  placeholderTextColor="#fff"
                />

                <Image
                  source={require("../assets/ic_filter_w.png")}
                  style={{}}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>{list}</View>

            {message != null && (
              <Text style={{ fontSize: 18, textAlign: "center" }}>
                {message}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default SeekerAppliedJobs;
