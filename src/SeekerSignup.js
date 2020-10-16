import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { countries } from "./utils/consts.js";
import { postFormData } from "./utils/network.js";
import * as Location from "expo-location";
import { setUser, setToken } from "./utils/utils.js";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";

function SeekerSignup({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phCode, setPhCode] = useState("1");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setAddressField(location);
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const setAddressField = async (location) => {
    const loc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    let addressObject = await Location.reverseGeocodeAsync(loc);
    const street =
      (addressObject[0].name || "") +
      " " +
      (addressObject[0].street !== addressObject[0].name
        ? addressObject[0].street || ""
        : "");
    const country = countries.find(
      (item) => item.code == addressObject[0].isoCountryCode
    );
    setAddress(street);
    setState(addressObject[0].region);
    setCity(addressObject[0].city);
    setCountry(country.name);
    setPhCode(country.dial_code);
    setZipcode(addressObject[0].postalCode);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    // console.log(image)
  };

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

  function _onPress(item) {
    setModalVisible(false);
    setPhCode(item.dial_code);
  }

  function _onPress2(item) {
    setModalVisible(false);
    setCountry(item.name);
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

  function handleSignup() {
    navigation.navigate("SeekerLinks", { screen: "SeekerFinishRegistration" });

    let token = deviceToken(128);
    let form = new FormData();
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("address", address);
    form.append("email", email);
    form.append("city", city);
    form.append("state", state);
    form.append("country", country);
    form.append("phone", phCode + " " + phone);
    form.append("user_type", "2");
    form.append("password", password);
    form.append("device_tocken", token);
    if (image) {
      form.append("avatar_image", {
        uri: image,
        name: "avatar.jpg",
        type: "image/jpeg",
      });
    }

    form.append("zip_code", zipcode);

    postFormData("user_register", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.status_code == "300") {
          setError(json.msg);
        } else {
          setError("");
          setUser(json.data);
          setToken(token);
          navigation.navigate("SeekerVerificationCode", {
            number: phCode + " " + phone,
            email: email,
            otp: json.otp,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function onSelectCountry(country){
  //   setCountry(country);
  //   setPhCode(country);
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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <View style={{ width: 140, height: 140, alignSelf: "center" }}>
              {image == null ? (
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
                  source={{ uri: image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    alignSelf: "center",
                  }}
                />
              )}
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

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_user.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setFirstName(text)}
              placeholder="First Name..."
              value={firstName}
              textContentType="name"
              onFocus={() => {
                handleFocus(0);
              }}
              ref={(ref) => {
                handleRef(0, ref);
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_user.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setLastName(text)}
              placeholder="Last Name..."
              value={lastName}
              textContentType="name"
              onFocus={() => {
                handleFocus(1);
              }}
              ref={(ref) => {
                handleRef(1, ref);
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_address.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setAddress(text)}
              placeholder="Address"
              value={address}
              textContentType="fullStreetAddress"
              onFocus={() => {
                handleFocus(2);
              }}
              ref={(ref) => {
                handleRef(2, ref);
              }}
            />
          </View>

          <View
            style={{
              flex: 2,
              alignItems: "center",
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
                          onPress={() => _onPress2(item)}
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
                style={styles.inputField}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  source={require("../assets/ic_country.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{}}>{country}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_country.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setState(text)}
              placeholder="State"
              value={state}
              textContentType="addressState"
              onFocus={() => {
                handleFocus(3);
              }}
              ref={(ref) => {
                handleRef(3, ref);
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_country.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setCity(text)}
              placeholder="City"
              value={city}
              textContentType="addressCity"
              onFocus={() => {
                handleFocus(4);
              }}
              ref={(ref) => {
                handleRef(4, ref);
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_zip.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setZipcode(text)}
              placeholder="Zipcode"
              value={zipcode}
              keyboardType="numeric"
              textContentType="postalCode"
              onFocus={() => {
                handleFocus(5);
              }}
              ref={(ref) => {
                handleRef(5, ref);
              }}
            />
          </View>

          <View
            style={{
              flex: 2,
              alignItems: "center",
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
                  source={require("../assets/ic_phone.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{}}>+{phCode}</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.code2}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone"
                value={formatPhone(phone)}
                keyboardType="numeric"
                textContentType="telephoneNumber"
                onFocus={() => {
                  handleFocus(6);
                }}
                ref={(ref) => {
                  handleRef(6, ref);
                }}
              />
            </View>
          </View>

          <Text style={{ color: "#7364BF", paddingTop: 10, paddingBottom: 20 }}>
            * For recieving interview calls
          </Text>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_mail.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              value={email}
              type="email"
              textContentType="emailAddress"
              onFocus={() => {
                handleFocus(7);
              }}
              ref={(ref) => {
                handleRef(7, ref);
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_password.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter Password"
              value={password}
              secureTextEntry={true}
              textContentType="none"
              onFocus={() => {
                handleFocus(8);
              }}
              ref={(ref) => {
                handleRef(8, ref);
              }}
            />
          </View>

          <View style={styles.inputField}>
            <Image
              source={require("../assets/ic_password.png")}
              style={{ height: 20, width: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", color: "#000" }}
              onChangeText={(text) => setPassword2(text)}
              placeholder="Confirm Password"
              value={password2}
              secureTextEntry={true}
              textContentType="none"
              onFocus={() => {
                handleFocus(9);
              }}
              ref={(ref) => {
                handleRef(9, ref);
              }}
            />
          </View>

          {error ? (
            <View style={{ flex: 1, padding: 20 }}>
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          ) : null}

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignContent: "center",
                backgroundColor: "#5B42BB",
                padding: 15,
                borderRadius: 30,
              }}
              onPress={() => handleSignup()}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontSize: 18 }}
              >
                Create account
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 300 }}></View>
        </SafeAreaView>
      </ScrollView>
      <KeyboardAccessoryNavigation
        onNext={handleFocusNext}
        onPrevious={handleFocusPrev}
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        androidAdjustResize={Platform.OS == "android"}
        avoidKeyboard={Platform.OS == "android"}
        style={Platform.OS == "android" && { top: 0 }}
      />
    </View>
  );
}

export default SeekerSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
  },
  inputField: {
    // height: 40,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#ccc",
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    alignItems: "flex-start",
  },
  code: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "#fff",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    // color: '#fff',
    width: "25%",
    height: 40,
    marginBottom: 10,
    shadowColor: "#ccc",
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  code2: {
    color: "#000",
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
    // color: '#fff',123
    width: "70%",
    height: 40,
    marginLeft: "5%",
    marginBottom: 10,
    shadowColor: "#ccc",
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
