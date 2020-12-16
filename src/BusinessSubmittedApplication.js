import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import { getUser } from "./utils/utils.js";
import { useIsFocused } from "@react-navigation/native";
import Header from "./components/Header";
import { strings } from "./translation/config";

function BusinessSubmittedApplication({ route, navigation }) {
  const isFocused = useIsFocused();

  const [user, setUser1] = useState({});
  const [employeesList, setEmployeesList] = useState([]);
  const [headerName] = useState(
    route.name == "BusinessEmployeesApplication"
      ? strings.EMPLOYEES
      : strings.SUBMITTED_APPLICATIONS
  );

  useEffect(() => {
    if (isFocused) {
      getUser().then((u) => {
        let u2 = JSON.parse(u);
        // console.log(u2)
        setUser1(u2);
        let form = new FormData();
        form.append("user_token", u2.user_token);
        form.append("job_id", route.params.job.id);
        console.log(route);

        let url = "/job_cv_list";
        if (route.name == "BusinessEmployeesApplication") {
          url = "job_hired_list";
        }
        console.log(url);

        postFormData(url, form)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            console.log(json.data);
            setEmployeesList(json.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [isFocused]);

  function renderItem(item) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          let tempUser = item.user;
          if (item.user) {
            tempUser.job_detail = [item.job_detail];
            navigation.navigate("BusinessSeekerProfile", {
              seeker: tempUser,
              job: item,
            });
          } else {
            tempUser = item;
            tempUser.job_detail = [route.params.job];
            navigation.navigate("BusinessSeekerProfile", {
              business: user,
              seeker: tempUser,
              job: item,
            });
          }
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
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
          }}
        >
          <View style={{ width: "20%", borderRadius: 20 }}>
            <Image
              source={{
                uri: item.user ? item.user.avatar_image : item.avatar_image,
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#666",
                borderRadius: 20,
              }}
              resizeMode={"stretch"}
            />
          </View>
          <View style={{ width: "80%" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, color: "#000" }}>
                {item.user ? item.user.first_name : item.first_name}{" "}
                {item.user ? item.user.last_name : item.last_name}
              </Text>
              <Text>
                {item.position_name
                  ? item.position_name
                  : route.params.job.position}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/ic_location.png")}
                  style={{ height: 10, width: 10, marginRight: 5 }}
                />
                <Text>{item.user ? item.user.address : item.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
            justifyContent: "center",
            paddingBottom: 10,
            borderBottomWidth: 0.25,
            borderBottomColor: "rgba(0,0,0,0.2)",
          }}
        >
         
          <View
            style={{flex:1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "#4834A6", fontSize: 18 }}>{headerName}</Text>
          </View>
          <View  style={{ position: "absolute",left:5}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 30,alignItems:'center',justifyContent:'center'}}
        >
          <Image
            source={require("../assets/ic_back2.png")}
            style={{  width: 28, height: 22,position:'absolute',top:20,zIndex:-223 }}
            onPress={() => navigation.goBack()}

          />
        </TouchableOpacity>
        </View>
        </View>
        <ScrollView>
         

          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <FlatList
              data={employeesList}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => (item.id ? item.id : item.user_id) + ""}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default BusinessSubmittedApplication;
