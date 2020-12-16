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
  ImageBackground,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "./utils/consts.js";
import { postFormData } from "./utils/network.js";
import { setUser, setToken } from "./utils/utils.js";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { strings } from "./translation/config";
import { AuthContext } from "./navigation/context";

function BusinessLogin({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [phCode, setPhCode] = useState("1");
  const [phone, setPhone] = useState("(877) 9951411");
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
    form.append("user_type", "1");
    form.append("device_tocken", token);
    setToken(token);
console.log(token);
    postFormData("user_login", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.status_code == 200) {
          setUser(json.data);
          if (json.data.user_type == "1") {
            signIn(json.data);
            // navigation.navigate("Business");
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

  function formatPhone(str) {
    let cleaned = str.replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d+)$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return str;
  }

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
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1, width: "90%" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 2,
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/ic_back2.png")}
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
                flex: 5,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Image
                source={require("../assets/logo.png")}
                style={{
                  width: 200,
                  height: 140,
                  marginTop: 0,
                }}
              />
            </View>

            <View style={{ flex: 2, alignItems: "center" }}>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 15 }}>
                <Text
                  style={{
                    color: "#4834A6",
                    fontSize: 18,
                  }}
                >
                  {strings.LOG_IN_AS}
                </Text>
                <Image
                  source={require("../assets/ic_open_purple.png")}
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  resizeMode={"stretch"}
                />
              </View>
            </View>

            <View
              style={{
                flex: 2,
                alignItems: "center",
                marginVertical: 5,
                marginHorizontal: 5,
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
                  <View style={{ marginTop: 22 }}>
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

              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.code}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={require("../assets/ic_call.png")}
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={{ color: "#4834A6" }}>+{phCode}</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.code2}
                  onChangeText={(text) => setPhone(text)}
                  placeholder={strings.PHONE}
                  value={formatPhone(phone)}
                  keyboardType={'phone-pad'}
                  onFocus={() => {
                    handleFocus(0);
                  }}
                  ref={(ref) => {
                    handleRef(0, ref);
                  }}
                />
              </View>
            </View>

            <View style={{ flex: 2 }}>
              <View
                style={{ flex: 1, flexDirection: "row", marginVertical: 5 }}
              >
                <Image
                  source={require("../assets/ic_password.png")}
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
                  onChangeText={(text) => setPassword(text)}
                  placeholder={strings.PASSWORD}
                  value={password}
                  textContentType="none"
                  onFocus={() => {
                    handleFocus(1);
                  }}
                  ref={(ref) => {
                    handleRef(1, ref);
                  }}
                />
              </View>
            </View>

            <View style={{ flex: 2, alignItems: "center", marginVertical: 5 }}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor:
                    phone && password ? "#4834A6" : "rgb(179,169,227)",
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 10,
                }}
                onPress={() => handleLogin()}
                disabled={!(phone && password)}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  {strings.LOGIN}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 3, alignItems: "center" }}>
              <Text
                style={{
                  marginLeft: 6,
                  color: "#4834A6",
                  textDecorationLine: "underline",
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate("BusinessForgotPassword")}
              >
                {strings.FORGOT_YOUR_PASSWORD}
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
              <Text style={{ color: "#4834A6", fontSize: 20 }}>
                {strings.DONT_ACCOUNT}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: 6,
                  color: "#4834A6",
                  textDecorationLine: "underline",
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate("BusinessSignup")}
              >
                {strings.REGISTER_BUSINESS}
              </Text>
            </View>

            <View style={{ flex: 3, alignItems: "center" }}></View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <KeyboardAccessoryNavigation
        androidAdjustResize={Platform.OS == "android"}
        avoidKeyboard={Platform.OS == "android"}
        onNext={handleFocusNext}
        onPrevious={handleFocusPrev}
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        style={Platform.OS == "android" && { top: 0 }}
      />
    </View>
  );
}

export default BusinessLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
  },
  code: {
    flexDirection: "row",
    borderRadius: 25,
    borderColor: "#4834A6",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: "#4834A6",
    width: "25%",
    height: 40,
  },
  code2: {
    flexDirection: "row",
    borderRadius: 25,
    borderColor: "#4834A6",
    borderWidth: 1,
    padding: 10,
    color: "#4834A6",
    width: "70%",
    height: 40,
    marginLeft: "5%",
  },
  code3: {
    flexDirection: "row",
    borderRadius: 25,
    borderColor: "#4834A6",
    borderWidth: 1,
    padding: 10,
    color: "#4834A6",
    width: "100%",
    height: 40,
    // marginBottom: 20
    paddingLeft: 30,
  },
});
