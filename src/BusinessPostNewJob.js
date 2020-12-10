import React, { useState, useEffect } from "react";
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
  Alert  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { useIsFocused } from "@react-navigation/native";
import { getUser, setUser, getToken } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import {strings} from './translation/config';

function BusinessPostNewJob({ navigation }) {
  const isFocused = useIsFocused();

  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(null);

  const [user, setUser1] = useState({});
  const [deviceToken, setDeviceToken] = useState("");
  const [userToken, setUserToken] = useState("");

  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");

  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  function loadData() {
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      setUserToken(u2.user_token);
      setUser1(u2);
      getToken().then((t) => setDeviceToken(t));
    });
  }

  function hideDate(i) {
    if (i) setDate(i);
    setShowDate(false);
  }

  function formatDate(d) {
    return `${d.getFullYear()}-${('0'+(d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
  }

  function handlePostJob() {
    let form = new FormData();
    form.append("position", position);
    form.append("position_desc", description);
    form.append("experience", experience);
    form.append("start_date", formatDate(date));

    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);

    postFormData("add_job", form)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log("Response", json,form);
        if(json.status_code==200){
        navigation.goBack();
        }else{
          Alert.alert("",json.msg);
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <SafeAreaView>

      <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 20,
              justifyContent: "center",
              paddingBottom: 10,
              borderBottomWidth: 0.25,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
          >
            <View style={{position:'absolute', left: 15 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/ic_back2.png")}
                  style={{ width: 28, height: 22 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent:'center'}}>
              <Text style={{ color: "#4834A6", fontSize: 18 }}>{strings.POST_A_JOB}</Text>
            </View>
            <View
              style={{
               position:'absolute',
                alignItems: "flex-end",
                right: 15,
                top:20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClosedJobs", {
                    screen: "BusinessClosedJobs",
                  });
                }}
              >
                <Text style={{ color: "#4834A6" }}>{strings.ARCHIVED_POSTS}</Text>
              </TouchableOpacity>
            </View>
          </View>
      <ScrollView showsVerticalScrollIndicator={false}>
          

          <View style={{ flex: 1, width: "100%", paddingTop: 20 }}>
            <View
              style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}
            >
              <View style={styles.inputField}>
                <Image
                  source={require("../assets/ic_title.png")}
                  style={{ width: 20, height: 20 }}
                />
                <TextInput
                  style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                  placeholder={strings.POSITON_TITLE}
                  onChangeText={(text) => setPosition(text)}
                  value={position}
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
              style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}
            >
              <View
                style={[
                  styles.inputField,
                  { flexDirection: "row", alignItems: "flex-start" },
                ]}
              >
                <Image
                  source={require("../assets/ic_category.png")}
                  style={{ width: 20, height: 20 }}
                />
                <TextInput
                  style={{
                    width: "100%",
                    color: "#666",
                    paddingLeft: 10,
                    paddingVertical: 0,
                    top: -2,
                    minHeight: 100,
                  }}
                  placeholder={strings.POSITION_DESCRIPTION}
                  multiline={true}
                  editable={true}
                  numberOfLines={5}
                  onChangeText={(text) => setDescription(text)}
                  value={description}
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
              style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}
            >
              <View
                style={[
                  styles.inputField,
                  { flexDirection: "row", alignItems: "flex-start" },
                ]}
              >
                <Image
                  source={require("../assets/ic_mind.png")}
                  style={{ width: 20, height: 20 }}
                />
                <TextInput
                  style={{
                    width: "100%",
                    color: "#666",
                    paddingLeft: 10,
                    paddingVertical: 0,
                    top: -2,
                    minHeight: 100,
                  }}
                  placeholder={strings.REQUIRED_EXPERIENCE}
                  multiline={true}
                  editable={true}
                  numberOfLines={5}
                  onChangeText={(text) => setExperience(text)}
                  value={experience}
                  onFocus={() => {
                    handleFocus(2);
                  }}
                  ref={(ref) => {
                    handleRef(2, ref);
                  }}
                />
              </View>
            </View>

            <View
              style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}
            >
              <View
                style={[
                  styles.inputField,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Image
                  source={require("../assets/ic_calender.png")}
                  style={{ width: 20, height: 20 }}
                />
                <TouchableOpacity
                  style={{ width: "100%", paddingLeft: 10 }}
                  onPress={(val) => setShowDate(!showDate)}
                >
                  {date == null ? (
                    <Text style={{ width: 120, color: "#666" }}>
                      {strings.START_DATE}
                    </Text>
                  ) : (
                    <Text style={{ width: 120 }}>
                      {date == null ? strings.START_DATE: formatDate(date)}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
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
                  backgroundColor: "#4834A6",
                  paddingTop: 12,
                  paddingBottom: 12,
                  borderRadius: 50,
                }}
                onPress={() => handlePostJob()}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  {strings.POST_JOB}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={showDate}
              mode="date"
              // isDarkModeEnabled={isDark}
              onConfirm={(i) => hideDate(i)}
              onCancel={(i) => hideDate(i)}
            />
          </View>
      </ScrollView>
      </SafeAreaView>

      <KeyboardAccessoryNavigation
        onNext={handleFocusNext}
        onPrevious={handleFocusPrev}
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        androidAdjustResize={Platform.OS == "android"}
        avoidKeyboard={Platform.OS == "android"}
        style={{ top: -220 }}
      />
    </View>
  );
}

export default BusinessPostNewJob;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    padding: 13,
    marginBottom: 15,
    marginLeft: 10,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});


