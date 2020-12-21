import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "./utils/consts.js";
import { postFormData } from "./utils/network.js";
import { setUser, setToken } from "./utils/utils.js";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { Platform } from "react-native";
import { strings } from "./translation/config";
import { AuthContext } from "./navigation/context";

function SeekerLogin({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loginBotton, setLoginButton] = useState(false);
  const [phCode, setPhCode] = useState("1");
  const [phone, setPhone] = useState("(214) 9985600");
  const [password, setPassword] = useState("12345678");
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);
  const { signIn } = React.useContext(AuthContext);

  function _onPress(item) {
    setModalVisible(false);
    setPhCode(item.dial_code);
  }

  function handlePassword(pass) {
    setLoginButton(true);
    setPassword(pass);
  }

  function deviceToken(length) {
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  function handleLogin() {
    let token = deviceToken(128);
    let form = new FormData();
    form.append("phone", phCode + " " + phone);
    form.append("password", password);
    form.append("user_type", "2");

    form.append("device_tocken", token);

    postFormData("user_login", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.data) {
          if (json.data.user_type == "2") {
            let tempUserData = json.data;
            if (tempUserData.is_verified == 0) {
              setUser(tempUserData);
              setToken(token);
              handleResend(tempUserData);
            } else {
              tempUserData.avatar_image =
                tempUserData.avatar_image +
                "?random_number=" +
                new Date().getTime();
              setUser(tempUserData);
              setToken(token);
              signIn(tempUserData);
            }
          } else {
            console.log(json.data.user_type);
          }
        } else {
          Alert.alert("", json.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleResend(tempUserData) {
    let form = new FormData();
    form.append("user_type", "1");
    form.append("phone", phCode + " " + phone);
    form.append("email", tempUserData.email);

    postFormData("send_verification_code", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.status_code == "300") {
          setError(json.msg);
        } else {
          navigation.navigate("SeekerVerificationCode", {
            number: phCode + " " + phone,
            email: tempUserData.email,
            otp: json.otp,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function formatPhone(str) {
    let cleaned = str.replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d+)$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return str;
  }

  // function _updatePhone(text){
  //   if(text.length > 3){
  //     let areaCode = text.substring(0, 3).replace(/[^0-9]/g, '')
  //     let ph = text.substring(3).replace(/[^0-9]/g, '')
  //     setPhone(areaCode + ' ' + ph)
  //   }else{
  //     setPhone(text)
  //   }

  // }

  function handleFocus(index) {
    setActiveInputIndex(index);
    setNextFocusDisabled(index === inputs.length - 1);
    setPreviousFocusDisabled(index === 0);
  }

  function handleFocusNext() {
    inputs[activeInputIndex + 1].focus();
  }

  function handleFocusPrev() {
    inputs[activeInputIndex - 1].focus();
  }

  function handleRef(index, ref) {
    let tempInputs = inputs;
    tempInputs[index] = ref;
    setInputs(inputs);
  }

  return (
    <LinearGradient style={styles.container} colors={["#4E35AE", "#775ED7"]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 2,
              alignItems: "flex-start",
              marginHorizontal: "5%",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/ic_back_w.png")}
                style={{
                  width: 40,
                  height: 30,
                  marginTop: 20,
                  // position: 'absolute',
                  // left: 0,
                  // top: 20
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              // flex: 7,
              alignItems: "center",
              marginHorizontal: "5%",
              marginVertical: "5%",
            }}
          >
            <Image
              source={require("../assets/logo_white_2.png")}
              style={{
                width: 150,
                height: 160,
                marginTop: 0,
                opacity: 1,
              }}
              resizeMode={"stretch"}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>
                {strings.LOG_IN_AS_A_JOB_SEEKER}
              </Text>
              <Image
                source={require("../assets/ic_job_seeker.png")}
                style={{ width: 20, height: 20, marginLeft: 5 }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 2,
              alignItems: "center",
              marginHorizontal: "5%",
            }}
          >
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
              }}
            >
              <SafeAreaView>
                <View style={{ marginTop: 22, marginHorizontal: "5%" }}>
                  <View>
                    <FlatList
                      // ItemSeparatorComponent={<Separator />}
                      data={countries}
                      keyExtractor={(item) => item.code}
                      renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                          key={index}
                          onPress={() => _onPress(item)}
                          onShowUnderlay={separators.highlight}
                          onHideUnderlay={separators.unhighlight}
                        >
                          <View style={{ backgroundColor: "white" }}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "#eee",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: "#222",
                                }}
                              >
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: "#666",
                                }}
                              >
                                +{item.dial_code}
                              </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      )}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <View
              style={{
                // flex: 1,
                flexDirection: "row",
                marginVertical: 5,
              }}
            >
              <TouchableOpacity
                style={styles.code}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  source={require("../assets/ic_call-1.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{ color: "#fff" }}>+{phCode}</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.code2}
                onChangeText={(text) => setPhone(text)}
                placeholder={strings.PHONE}
                value={formatPhone(phone)}
                textContentType="telephoneNumber"
                autoCompleteType={"tel"}
                keyboardType={"phone-pad"}
                onFocus={() => {
                  handleFocus(0);
                }}
                ref={(ref) => {
                  handleRef(0, ref);
                }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 2,
              marginHorizontal: "5%",
              marginVertical: 10,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image
                source={require("../assets/ic_lock.png")}
                style={{
                  width: 15,
                  height: 15,
                  position: "absolute",
                  top: 10,
                  left: 10,
                }}
              />
              <TextInput
                style={styles.code3}
                secureTextEntry={true}
                onChangeText={(text) => handlePassword(text)}
                placeholder={strings.PASSWORD}
                value={password}
                textContentType="none"
                autoCompleteType={"password"}
                onFocus={() => {
                  handleFocus(1);
                }}
                ref={(ref) => {
                  handleRef(1, ref);
                }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 2,
              alignItems: "center",
              marginHorizontal: "5%",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              style={
                loginBotton
                  ? {
                      width: "100%",
                      backgroundColor: "#fff",
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderRadius: 10,
                    }
                  : {
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderRadius: 10,
                    }
              }
              onPress={() => handleLogin()}
            >
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "#4834A6" }}
              >
                {strings.LOGIN}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 3, alignItems: "center" }}>
            <Text
              style={{
                marginLeft: 6,
                color: "#fff",
                textDecorationLine: "underline",
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("SeekerForgotPassword")}
            >
              {strings.FORGOT_YOUR_PASSWORD}
            </Text>
          </View>

          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
              }}
            >
              {strings.DONT_ACCOUNT}
            </Text>
            <Text
              style={{
                marginLeft: 6,
                color: "#fff",
                textDecorationLine: "underline",
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("SeekerSignup")}
            >
              {strings.SIGN_UP}
            </Text>
          </View>

          <View style={{ flex: 2, alignItems: "center" }}></View>
        </ScrollView>
      </SafeAreaView>
      <KeyboardAccessoryNavigation
        androidAdjustResize={Platform.OS == "android"}
        avoidKeyboard={Platform.OS == "android"}
        onNext={handleFocusNext}
        onPrevious={handleFocusPrev}
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        style={Platform.OS == "android" && { top: 0 }}
      />
    </LinearGradient>
  );
}

export default SeekerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
  },
  code: {
    flexDirection: "row",
    borderRadius: 25,
    borderColor: "#fff",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: "#fff",
    width: "25%",
    height: 40,
  },
  code2: {
    flexDirection: "row",
    borderRadius: 25,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    width: "70%",
    height: 40,
    marginLeft: "5%",
  },
  code3: {
    flexDirection: "row",
    borderRadius: 25,
    borderColor: "#fff",
    borderWidth: 1,
    color: "#fff",
    width: "100%",
    height: 40,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 30,
  },
});
