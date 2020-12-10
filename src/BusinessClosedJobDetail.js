import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import {getUser} from './utils/utils.js';
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';

function BusinessJobDetail({ route, navigation }) {
  const isFocused = useIsFocused();

  console.log(route.params.job)
  const [job, setJob] = useState(route.params.job);
  const [business, setBusiness] = useState(route.params.job.business);


  
  return (
    
    <LinearGradient
      style={{ flex: 1,  }}
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
              paddingTop: 20,
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
          </View>
      <ScrollView style={{marginBottom:40}}>         

          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
         
            <Image
              source={{ uri: business.avatar_image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
             
          </View>
          <View style={{flex: 1, alignItems: 'center',marginBottom:5 }}>
            <Text style={{color: '#fff', fontSize: 22}}>{job.position}</Text>
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
                {job.start_date}
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
