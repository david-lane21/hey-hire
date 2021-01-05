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
  Linking,
} from "react-native";
import { strings } from "./translation/config";

function BusinessVisitorDetail({ navigation, route }) {
  const [user, setUser1] = useState(route.params.seeker);
console.log(route.params.seeker)
  return (
    <View style={{flex:1}}>
    <SafeAreaView >
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingBottom: 20,
          paddingTop: 20
        }}
      >
       

        <View
          style={{
            // width: "100%",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: 10,
            flex: 1,
          }}
        >
          <Text style={{ color: "#4E35AE", fontSize: 18 }}>Profile</Text>
        </View>
        <View style={{ position: "absolute" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 30, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={require("../assets/ic_back2.png")}
              style={{ width: 28, height: 22, position: 'absolute', top: 20, zIndex: -223 }}
              onPress={() => navigation.goBack()}

            />
          </TouchableOpacity>
        </View>

      </View>
      
      <ScrollView style={{ backgroundColor: "#fff", paddingBottom: 50 }}>
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
              <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}>
                {strings.BIO}
              </Text>
            </View>
            <Text style={{ marginBottom: 10, marginTop: 10 }}>{user.bio}</Text>
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
              <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}>
                {strings.SKILLS}
              </Text>
            </View>
            {user.skill && user.skill.split(",").map((item,index) => (
              <View
                key={item+""+index}
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
          <Text style={{ fontSize: 18,marginLeft: 10 ,marginBottom:5 }}>
            {strings.EDUCATIONS}
          </Text>
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
          <Text style={{ fontSize: 18, marginLeft: 10 ,marginBottom:5 }}>
            {strings.CERTIFICATION}
          </Text>
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
          <Text style={{ fontSize: 18, marginLeft: 10 ,marginBottom:5 }}>
            {strings.LANGUAGE}
          </Text>
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
          <Text style={{ fontSize: 18, marginLeft: 10 ,marginBottom:5 }}>{strings.LEVEL_OF_EDUCATION}</Text>
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
            marginBottom:100
          }}
        >
          <Text style={{ fontSize: 18, marginLeft: 10 ,marginBottom:5 }}>{strings.AVAILABILITY}</Text>
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
      </ScrollView>
    </SafeAreaView>
    </View>
  );
}

function Header() {
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
      }}
    >
      <View style={{ position: "absolute", alignContent: "center" }}>
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
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ color: "#000", fontSize: 18 }}>Profile</Text>
      </View>
    </View>
  );
}

export default BusinessVisitorDetail;
