import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  FlatList,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  findNodeHandle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { educationLevels, countries, languages } from "./utils/consts.js";
import { getUser, setUser, getToken } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { strings } from "./translation/config";
import { AuthContext } from "./navigation/context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
const isIphoneX = DeviceInfo.hasNotch();
function SeekerFinishRegistration({ navigation }) {
  const scrollViewRef = useRef();

  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredLangs, setFilteredLangs] = useState(languages);

  const [user, setUser1] = useState({});
  const [deviceToken, setDeviceToken] = useState("");
  const [profile, setProfile] = useState({});
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
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [eduLevel, setEduLevel] = useState("");
  const [langs, setlangs] = useState("");
  const [eligible, setEligible] = useState(false);
  const [sixteen, setSixteen] = useState(false);

  const [institution, setInstitution] = useState("");
  const [certificate, setCertificate] = useState("");
  const [convictions, setConvictions] = useState(false);
  const [availability, setAvailability] = useState("");
  const [positions, setPositions] = useState([]);

  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiline, setMultiline] = useState(false);

  const [currentScroll, setCurrentScroll] = useState(null);

  const { signIn } = React.useContext(AuthContext);

  const BIO_PLACEHOLDER = `Example: Greetings, my name is Benjamin, I am 20 years old. I am currently studying my degree at UT, TX.
  I am a hard working overachiever. And I know I will only benefit your business goals and accomplishments. I have past experience working in the kitchen, as my past job was at Mario’s Pizza downtown. I am easy going, and will bring only good and positive vibes in to your business, I would gladly appreciate it you consider my submission and set an interview this following week! Thanks for reading and hope to see you soon!`;

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    // console.log(image)
  };

  function dateFormat(date) {
    if (date) {
      let d = date.split("-");
      return `${d[1]}/${d[2]}/${d[0]}`;
    } else {
      return "";
    }
  }

  function formatPhone(str) {
    let cleaned = str.replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d+)$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return str;
  }

  function isLangSelected(lang) {
    let langList = langs
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i != "");
    return langList.includes(lang);
  }

  function removeFromLangs(item) {
    let langList = langs
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i != "");
    langList = langList.filter((i) => i !== item).join(", ");
    setlangs(langList);
  }

  function addToLangs(item) {
    let langList = langs
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i != "");
    langList.push(item);
    langList = langList.join(", ");
    setlangs(langList);
  }

  function searchLangs(txt) {
    let text = txt.toLowerCase();
    setSearch(text);
    if (text == "") {
      setFilteredLangs(languages);
    } else {
      let langList = languages.filter((j) => j.toLowerCase().includes(text));
      setFilteredLangs(langList);
    }
  }

  function toggleConvictions() {
    setConvictions(!convictions);
  }

  function toggleEligible() {
    setEligible(!eligible);
  }

  function toggleSixteen() {
    setSixteen(!sixteen);
  }

  function _availability(item) {
    setAvailability(item);
  }

  function _edulevel(item) {
    setEduLevel(item);
  }

  function _onPress(item) {
    setModalVisible(false);
    setCountry(item.name);
    setPhCode(item.dial_code);
  }

  function _onPress2(item) {
    setModalVisible(false);
    setPhCode(item.dial_code);
    setCountry(item.name);
  }

  function _onPress3(item) {
    setModalVisible2(false);
  }

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    // console.log(isFocused)
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  function loadAllData() {
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      // console.log(u2)
      setUser1(u2);
      getToken().then((t) => setDeviceToken(t));
      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id", u2.user_id);

      postFormData("user_profile", form)
        .then((res) => {
          // console.log('step 1')
          return res.json();
        })
        .then((json) => {
          // console.log('step 2')
          console.log(json.data);
          setProfile(json.data);
          let p = json.data.phone.split(" ");
          let p1 = p[0].replace(/\+/g, "");
          let p2 = p[1] + " " + p[2];
          setFirstName(json.data.first_name);
          setLastName(json.data.last_name);
          setAddress(json.data.address);
          setCountry(json.data.country);
          setState(json.data.state);
          setCity(json.data.city);
          setZipcode(json.data.zip_code);
          setPhCode(p1);
          setPhone(p2);
          setEmail(json.data.email);
          setBio(json.data.bio);
          setSkills(json.data.skill);
          setEduLevel(json.data.education_level);
          setInstitution(json.data.education);
          setCertificate(json.data.certificate);
          setImage(json.data.avatar_image);
          if (json.data.language) {
            setlangs(json.data.language);
          } else {
            setlangs("");
          }

          setAvailability(json.data.availability);
          setEligible(json.data.eligible);
          setSixteen(json.data.sixteen);
          setConvictions(json.data.convictions);
          setPositions(json.data.position);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function loadData() {
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      // console.log(u2)
      setUser1(u2);
      getToken().then((t) => setDeviceToken(t));
      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id", u2.user_id);

      postFormData("user_profile", form)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json.data);

          setPositions(json.data.position);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleUpdate() {
    let form = new FormData();
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("address", address);
    form.append("email", email);
    form.append("city", city);
    form.append("bio", bio);
    form.append("zip_code", zipcode);
    form.append("state", state);
    form.append("country", country);
    form.append("phone", phCode + " " + phone);
    form.append("user_type", "2");
    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("device_tocken", deviceToken);
    if (image) {
      form.append("avatar_image", {
        uri: image,
        name: "avatar.jpg",
        type: "image/jpeg",
      });
    }

    form.append("availability", availability);
    form.append("education", institution);
    form.append("education_level", eduLevel);
    form.append("certificate", certificate);
    form.append("language", langs);
    form.append("eligible", eligible || false);
    form.append("sixteen", sixteen || false);
    form.append("convictions", convictions || false);
    form.append("skill", skills.toString());
    setLoading(true);

    postFormData("update_user", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setLoading(false);

        if (json.status_code != "200") {
          setError(json.msg);
        } else {
          setUser(json.data);
          // navigation.goBack()
          signIn(json.data);

          // navigation.navigate("Seeker");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFocus(index) {
    setActiveInputIndex(index);
    setNextFocusDisabled(index === inputs.length - 1);
    setPreviousFocusDisabled(index === 0);
    // const inputHandle = findNodeHandle(inputs[index]);
    // var scrollResponder = scrollViewRef.current.getScrollResponder();

    // scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
    //   inputHandle, // The TextInput node handle
    //   480, // The scroll view's bottom "contentInset" (default 0)
    //   true // Prevent negative scrolling
    // );
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
    if (index == 8) {
      setTimeout(() => {
        setMultiline(true);
      }, 1000);
    }
  }

  function addSkill() {
    let tempSkills = skills;
    if (skill && skill.trim() != "") {
      tempSkills.push(skill);
      setSkills(tempSkills);
      setSkill("");
    }
  }

  function deleteSkil(index) {
    let tempSkills = skills;
    skills.splice(index, 1);
    // setSkills(tempSkills);
    console.log(tempSkills);
    setSkills((oldArray) => [...tempSkills]);
  }

  function onChangeSkill(text) {
    console.log(text.indexOf(","));
    let commaIndex = text.indexOf(",");
    if (commaIndex > 0) {
      let tempSkills = skills;
      tempSkills.push(text.substring(0, commaIndex));
      setSkills(tempSkills);
      setSkill("");
    } else {
      setSkill(text);
    }
  }

  function renderSkill(item) {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "#3482FF",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 2,
          borderRadius: 4,
          margin: 5,
        }}
      >
        <Text
          style={{
            color: "#3482FF",
            // borderWidth: 1,
            // borderColor: "#3482FF",
            padding: 3,
            borderRadius: 3,
            marginBottom: 3,
            marginLeft: 3,
          }}
        >
          {item.item}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteSkil(item.index);
          }}
        >
          <Image
            source={require("../assets/ic_close_black.png")}
            style={{ height: 15, width: 15 }}
            resizeMode={"stretch"}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView extraScrollHeight={Platform.OS === "ios"?-60:0}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          {/* <View style={{ width: "30%", marginLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/ic_back.png")}
                style={{ width: 28, height: 22 }}
              />
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#4834A6", fontSize: 18 }}>
              {strings.REGISTRATION}
            </Text>
          </View>
        </View>
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: "100%",
              zIndex: 999,
            }}
          >
            <ActivityIndicator
              animating={true}
              size={"large"}
              style={{ top: "50%" }}
              color={"#fff"}
            />
          </View>
        )}
      

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 10,paddingHorizontal:20 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  marginBottom: 5
                }}
              >
                <Image
                  source={require("../assets/icon_note.png")}
                  style={{ width: 12, height: 12 }}
                />
                <Text style={{ paddingLeft: 10, fontSize: 18 }}>
                  {strings.BIO}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#eee",
                  padding: 5,
                  marginBottom: 15,

                  // marginRight: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  shadowColor: "#bbb",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    color: "#666",
                    textAlignVertical: "top",
                  }}
                  onChangeText={(text) => setBio(text)}
                  placeholder={BIO_PLACEHOLDER}
                  value={bio}
                  multiline={true}
                  editable={true}
                  // autoFocus={true}
                  numberOfLines={5}
                  onFocus={() => {
                    handleFocus(8);
                  }}
                  ref={(ref) => {
                    handleRef(8, ref);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/ic_star.png")}
                  style={{ width: 12, height: 12 }}
                />
                <Text style={{ paddingLeft: 10, fontSize: 18 }}>
                  {strings.SKILLS}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                      alignItems: "flex-start",
                      backgroundColor: "#fff",
                  borderColor: "#eee",
                  paddingTop: 13,
                  paddingLeft: 13,
                  marginBottom: 15,
                  borderWidth: 1,
                  borderRadius: 10,
                  shadowColor: "#bbb",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                {/* <FlatList
                    data={skills}
                    keyExtractor={(item) => item}
                    renderItem={renderSkill}
                  /> */}
                <View
                  style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
                >
                  {skills.map((item, index) => {
                    return renderSkill({ item, index });
                  })}
                </View>
                <View
                  style={{
                    borderColor: "#eee",
                    marginBottom: 5,
                    paddingHorizontal: 5,
                    // marginRight: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 5,
                  }}
                >
                  <TextInput
                    style={{ width: "100%", color: "#000" }}
                    placeholder={strings.ENTER_SKILL}
                    textContentType="none"
                    onSubmitEditing={() => addSkill()}
                    returnKeyType={"done"}
                    onEndEditing={() => addSkill()}
                    value={skill}
                    onChangeText={(text) => onChangeSkill(text)}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View>
              <Text style={{ fontSize: 18, paddingLeft: 20,marginBottom: 5 }}>
                {strings.LEVEL_OF_EDUCATION}
              </Text>
              <View style={styles.code3}>
                <Image
                  source={require("../assets/ic_educate.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <RNPickerSelect
                  onValueChange={(value) => _edulevel(value)}
                  value={eduLevel}
                  style={pickerSelectStyles}
                  items={educationLevels.map((i) => {
                    return {
                      label: i,
                      value: i,
                    };
                  })}
                  
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, paddingLeft: 20 ,marginBottom: 5}}>
              {strings.NAME_OF_INSTITUTION}
            </Text>
            <View style={styles.code}>
              <Image
                source={require("../assets/ic_educate.png")}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <TextInput
                style={{ width: "100%", color: "#000" }}
                onChangeText={(text) => setInstitution(text)}
                placeholder={strings.INSTITUTION}
                value={institution}
                textContentType="none"
                onFocus={() => {
                  handleFocus(9);
                }}
                ref={(ref) => {
                  handleRef(9, ref);
                }}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, paddingLeft: 20,marginBottom: 5 }}>
              {strings.CERTIFICATION} {strings.OPTIONAL}
            </Text>
            <View style={styles.code}>
              <Image
                source={require("../assets/ic_file_number.png")}
                style={{ width: 17, height: 17, marginRight: 5 }}
              />
              <TextInput
                style={{ width: "100%", color: "#000" }}
                onChangeText={(text) => setCertificate(text)}
                placeholder={strings.CERTIFICATE_PLACEHOLDER}
                value={certificate}
                textContentType="none"
                onFocus={() => {
                  handleFocus(10);
                }}
                ref={(ref) => {
                  handleRef(10, ref);
                }}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible2}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
              }}
            >
              <SafeAreaView>
                <View style={{ marginTop: 22, height: "89%" }}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 20,
                        paddingTop: 20,
                      }}
                    >
                      <View style={{ width: "20%", marginLeft: 15 }}>
                        <TouchableOpacity
                          onPress={() => setModalVisible2(false)}
                        >
                          <Image
                            source={require("../assets/ic_back.png")}
                            style={{ width: 28, height: 22 }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: "60%" }}>
                        <Text style={{ color: "#4834A6", fontSize: 18 }}>
                          {strings.ADD_YOUR_LANGUAGES}
                        </Text>
                      </View>
                      <View style={{ width: "60%" }}>
                        <TouchableOpacity
                          onPress={() => setModalVisible2(false)}
                        >
                          <Text style={{ color: "#4834A6", fontSize: 18 }}>
                            {strings.DONE}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        width: "85%",
                        margin: 20,
                        backgroundColor: "#fff",
                        padding: 10,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "#ddd",
                      }}
                    >
                      <View style={{ width: "15%" }}>
                        <Image
                          source={require("../assets/ic_search.png")}
                          style={{ position: "absolute" }}
                        />
                      </View>
                      <View style={{ width: "70%", paddingLeft: 20 }}>
                        <TextInput
                          style={{
                            width: "100%",
                            paddingLeft: 10,
                            color: "#000",
                          }}
                          onChangeText={(text) => searchLangs(text)}
                          placeholder={strings.SEARCH}
                          value={search}
                        />
                      </View>
                    </View>

                    <FlatList
                      // ItemSeparatorComponent={<Separator />}
                      data={filteredLangs}
                      keyExtractor={(item) => item.code}
                      renderItem={({ item, index, separators }) => (
                        <View
                          key={index}
                          onPress={() => _onPress3(item)}
                          onShowUnderlay={separators.highlight}
                          onHideUnderlay={separators.unhighlight}
                        >
                          <View style={{ backgroundColor: "white" }}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "#eee",
                              }}
                            >
                              {isLangSelected(item) ? (
                                <TouchableOpacity
                                  onPress={() => removeFromLangs(item)}
                                >
                                  <Image
                                    source={require("../assets/ic_selected.png")}
                                    style={{
                                      width: 17,
                                      height: 17,
                                      marginRight: 10,
                                      marginLeft: 20,
                                    }}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => addToLangs(item)}
                                >
                                  <Image
                                    source={require("../assets/ic_add_blue.png")}
                                    style={{
                                      width: 17,
                                      height: 17,
                                      marginRight: 10,
                                      marginLeft: 20,
                                    }}
                                  />
                                </TouchableOpacity>
                              )}

                              <Text
                                style={{
                                  fontSize: 20,
                                  color: "#222",
                                }}
                              >
                                {item}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Text style={{ fontSize: 18, paddingLeft: 20,marginBottom: 5 }}>
              {strings.LANGUAGE}
            </Text>
            <TouchableOpacity
              style={styles.code}
              onPress={() => setModalVisible2(true)}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/ic_language.png")}
                  style={{ width: 17, height: 17, marginRight: 5 }}
                />
                <Text style={{ width: "100%", color: "#000" }}>{langs}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <View>
              <Text style={{ fontSize: 18, paddingLeft: 20 ,marginBottom: 5}}>
                {strings.AVAILABILITY}
              </Text>
              <View style={styles.code3}>
                <Image
                  source={require("../assets/ic_educate.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <RNPickerSelect
                  onValueChange={(value) => _availability(value)}
                  value={availability}
                  style={pickerSelectStyles}
                  items={[
                    { label: "Full Time", value: "Full Time" },
                    { label: "Part Time", value: "Part Time" },
                    { label: "Flexible", value: "Flexible" },
                  ]}
                  
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center",
              }}
              onPress={() => toggleEligible()}
            >
              {eligible ? (
                <Image
                  source={require("../assets/checkbox_checked.png")}
                  style={{ width: 25, height: 25, marginRight: 5 }}
                />
              ) : (
                <Image
                  source={require("../assets/checkbox_blank.png")}
                  style={{ width: 25, height: 25, marginRight: 5 }}
                />
              )}
              <Text style={{ paddingLeft: 5, color: "#3482FF" }}>
                {strings.ARE_YOU_ELEGIBLE}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center",
              }}
              onPress={() => toggleSixteen()}
            >
              {sixteen ? (
                <Image
                  source={require("../assets/checkbox_checked.png")}
                  style={{ width: 25, height: 25, marginRight: 5 }}
                />
              ) : (
                <Image
                  source={require("../assets/checkbox_blank.png")}
                  style={{ width: 25, height: 25, marginRight: 5 }}
                />
              )}
              <Text style={{ paddingLeft: 5, color: "#3482FF" }}>
                {strings.ARE_YOU_AT_LEAST}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center",
              }}
              onPress={() => toggleConvictions()}
            >
              {convictions ? (
                <Image
                  source={require("../assets/checkbox_checked.png")}
                  style={{ width: 25, height: 25, marginRight: 5 }}
                />
              ) : (
                <Image
                  source={require("../assets/checkbox_blank.png")}
                  style={{ width: 25, height: 25, marginRight: 5 }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ paddingLeft: 5, color: "#3482FF" }}>
                  {strings.HAVE_YOU_EVER_BEEN_CONVICTED}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, marginBottom: 30 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 20,
                marginTop: 20,
                paddingBottom: 20,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/ic_past_positions.png")}
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              <Text style={{ fontSize: 18 }}>
                {strings.PAST_POSTIONS} {strings.OPTIONAL}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              {positions.map((p) => {
                return (
                  <View
                    key={p.post_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingLeft: 20,
                      paddingBottom: 20,
                    }}
                  >
                    <View style={{ width: "10%", paddingRight: 20 }}>
                      <Image
                        source={require("../assets/ic_edit.png")}
                        style={{ width: 20, height: 20, marginRight: 5 }}
                      />
                    </View>
                    <View style={{ width: "90%" }}>
                      <Text style={{ color: "#999", fontSize: 12 }}>
                        {dateFormat(p.from_date)} - {dateFormat(p.to_date)}
                      </Text>
                      <Text style={{ fontSize: 14, width: "90%" }}>
                        {p.category}, {p.company_name}, {p.city_name}{" "}
                      </Text>
                    </View>
                  </View>
                );
              })}

              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 160,
                }}
                onPress={() => navigation.navigate("SeekerAddPastPosition")}
              >
                <Text style={{ color: "#4E35AE", fontSize: 16 }}>
                  + {strings.ADD_PAST_POSTION}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 20 }}></View>

          </KeyboardAwareScrollView>
                  <KeyboardAccessoryNavigation
          onNext={handleFocusNext}
          onPrevious={handleFocusPrev}
          onPress={handleFocusNext}
          nextDisabled={nextFocusDisabled}
          previousDisabled={previousFocusDisabled}
          androidAdjustResize={Platform.OS == "android"}
          avoidKeyboard={true}
          style={
            Platform.OS == "android"
              ? { top: 0, position: "absolute", zIndex: 9999 }
              : { top: isIphoneX ?20:0 }
          }
        />
        {/* </KeyboardAvoidingView> */}
        <View style={{ position: "absolute", bottom: 50, width: "100%" }}>
          {error ? (
            <Text
              style={{ color: "red", padding: 20, backgroundColor: "#fff" }}
            >
              {error}
            </Text>
          ) : null}
          <TouchableOpacity
            style={{
              flex: 1,
              alignContent: "center",
              backgroundColor: "#5B42BB",
              padding: 15,
            }}
            onPress={() => handleUpdate()}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
              {strings.FINISH_REGISTRATION}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

     
  );
}

export default SeekerFinishRegistration;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    padding: 13,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
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
  },
  code: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    padding: 13,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1,
    flexDirection: "row",
    // alignItems: 'center',
    // width: '25%',
  },
  code2: {
    backgroundColor: "#fff",
    color: "#000",
    borderColor: "#eee",
    padding: 13,
    marginBottom: 15,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 4,
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '50%',
    marginLeft: 5,
  },
  code3: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    paddingTop: 13,
    paddingLeft: 13,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1,
    flexDirection: "row",
    // alignItems: 'center',
    // width: '25%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // borderColor: '#333',
    // borderWidth: 1,
    minWidth: "95%",
    paddingBottom: 13,
  },
  inputAndroid: {
    minWidth: "95%",
    paddingBottom: 13,
  },
});
