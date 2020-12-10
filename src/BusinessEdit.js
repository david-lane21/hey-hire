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
} from "react-native";
import { getUser, setUser, getToken } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {strings} from './translation/config';

export default function BusinessEdit({ navigation }) {
  const isFocused = useIsFocused();

  const [user, setUser1] = useState({});
  const [profile, setProfile] = useState({});
  const [businessDetail, setBusinessDetail] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(isFocused);
    if (isFocused) {
      getUser().then((u) => {
        let u2 = JSON.parse(u);
        console.log(u2);
        setUser1(u2);
        setBusinessDetail(u2.business_detail);
        getToken().then((t) => setDeviceToken(t));
      });
    }
  }, [isFocused]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function handlePostJob() {
    let form = new FormData();
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("business_detail", businessDetail);
    form.append("user_type", "1");
    form.append("device_tocken", deviceToken);
    if (image) {
      form.append("avatar_image", {
        uri: image,
        name: "avatar.jpg",
        type: "image/jpeg",
      });
    }

    postFormData("/update_user", form)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log("Response", json);
        setUser(json.data);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
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
              // backgroundColor: '#4E35AE',
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
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require("../assets/ic_back_w.png")}
                  style={{ width: 28, height: 25 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "66.3%" }}>
              <Image
                source={require("../assets/title_header.png")}
                style={{ width: 120, height: 25 }}
              />
            </View>
          </View>

      <ScrollView>
         

          {/* <View
            style={{
              flex: 1,
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            
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
          
          </View> */}

          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <View style={{ width: 150, height: 150, alignSelf: "center" }}>
              {/* <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}} /> */}
              <ImageBackground
                source={require("../assets/img_ring.png")}
                style={{
                  width: 136,
                  height: 136,
                  paddingTop: 18,
                  paddingRight: 2,
                  alignSelf: "center",
                }}
              >
                {image == null ? (
                  <View>
                    {user.avatar_image == "" ? (
                      <Image
                        source={require("../assets/img_place.png")}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 50,
                          alignSelf: "center",
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: user.avatar_image }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      alignSelf: "center",
                    }}
                  />
                )}
              </ImageBackground>
              <TouchableOpacity
                onPress={pickImage}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <Image
                  source={require("../assets/ic_camera.png")}
                  style={{ width: 60, height: 60 }}
                />
              </TouchableOpacity>
            </View>
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
            <Text style={{ color: "#fff" }}>{strings.PROPRIETER}: </Text>
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
              padding: 10,
              borderColor: "#eee",
              borderWidth: 1,
              margin: 10,
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          >
            {/* <Text style={{ color: "#fff", textAlign: "center" }}>
              {user.business_detail}
            </Text> */}
            <TextInput
              style={{
                width: "100%",
                color: "#fff",
                minHeight: 102,
              }}
              multiline={true}
              editable={true}
              numberOfLines={5}
              value={businessDetail}
              onChangeText={(text) => setBusinessDetail(text)}
            />
          </View>

          <View
            style={{
              flex: 3,
              alignItems: "center",
              marginHorizontal: "5%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#fff",
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 50,
              }}
              onPress={() => handlePostJob()}
            >
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "#4834A6" }}
              >
                {strings.UPDATE_PROFILE}
              </Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}
