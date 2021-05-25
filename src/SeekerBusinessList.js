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
function SeekerBusinessList({ navigation }) {
  const isFocused = useIsFocused();
  const [businesses, setBusinesses] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [limit, setLimit] = useState(25);
  const [refresh, setRefresh] = useState(false);

  function searchJobs(txt) {
    setSearch(txt);

    let text = txt.toLowerCase();
    if (text == "") {
      setFilteredJobs(businesses.slice(0, limit));
    } else {
      let jobs = businesses.filter((j) =>
        j.business_name.toLowerCase().includes(text)
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

      postFormData("get_all_business", form)
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
            setBusinesses([]);
            setFilteredJobs([]);
          } else {
            setMessage(null);
            let bizList = json.data;
            bizList = bizList.map((b) => {
              b.distance_in_km = CommonUtils.distance(
                b.latitude,
                b.longitude,
                "K"
              );
              return b;
            });

            bizList = bizList.sort(
              (a, b) => a.distance_in_km - b.distance_in_km
            );

            setBusinesses(bizList);
            setFilteredJobs(bizList.slice(0, limit));
          }
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function loadMore() {
    setLimit(limit + 25);
    setFilteredJobs(businesses.slice(0, limit));
  }

  const list = filteredJobs.map((item) => {
    const distance = CommonUtils.distance(
      parseFloat(item.latitude),
      parseFloat(item.longitude),
      "K"
    );
    return (
      <TouchableOpacity
        key={item.user_id}
        onPress={() =>
          navigation.navigate("SeekerHomeAvailableJobs", {
            biz_id: item.user_id,
          })
        }
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
          <View style={{ width: "20%" }}>
            <Image
              source={{ uri: item.avatar_image }}
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
          <View style={{ width: "70%", backgroundColor: "#F4F5FA" }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                  textAlignVertical: "center",
                  fontWeight: "500",
                }}
                numberOfLines={1}
              >
                {item.business_name} {" • "} {distance} {strings.MILES_AWAY}
              </Text>
              <Text style={{ fontSize: 12, color: "#888" }}>
                {item.address}
              </Text>
            </View>
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
          <View style={{ position: "absolute", left: 5 }}>
          <TouchableOpacity onPress={navigation.goBack}>
                <Image
                  source={require("../assets/ic_back_w.png")}
                  style={{ width: 28, height: 25, marginLeft: 10 }}
                />
              </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ backgroundColor: "#fff", marginBottom: 50 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                loadData();
              }}
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
            {filteredJobs.length != businesses.length && (
              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={loadMore}
                >
                  <Text style={{ fontSize: 16 }}>Load More</Text>
                </TouchableOpacity>
              </View>
            )}

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

export default SeekerBusinessList;
