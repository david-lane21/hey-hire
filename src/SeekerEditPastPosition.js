import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getUser, getToken, setUser } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import {strings} from './translation/config';

function SeekerEditPastPosition({ route, navigation }) {
  console.log(route);
  const [user, setUser1] = useState({});
  const [deviceToken, setDeviceToken] = useState("");
  const [error, setError] = useState("");

  const [position, setPosition] = useState(route.params.position.category);
  const [company, setCompany] = useState(route.params.position.company_name);
  const [city, setCity] = useState(route.params.position.city_name);
  const [from, setFrom] = useState(new Date(route.params.position.from_date));
  const [showFrom, setShowFrom] = useState(false);
  const [to, setTo] = useState(new Date(route.params.position.to_date));
  const [showTo, setShowTo] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);

  function hideFrom(i) {
    if (i) setFrom(i);
    setShowFrom(false);
  }

  function hideTo(i) {
    if (i) setTo(i);
    setShowTo(false);
  }

  function formatDate(d) {
    return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(
      "0" + d.getDate()
    ).slice(-2)}`;
  }

  useEffect(() => {
    getUser().then((u) => {
      let u2 = JSON.parse(u);
      setUser1(u2);
      getToken().then((t) => setDeviceToken(t));
    });
  }, []);

  const handleUpdate = () => {
    if (position && from && company && city) {
      let tempPastPositions = route.params.positions;
      tempPastPositions.map((item) => {
        if (item.post_id == route.params.position.post_id) {
          item.category = position;
          item.company_name = company;
          item.city_name = city;
          item.from_date = formatDate(from);
          item.to_date = formatDate(to);
        }
      });

      if (route.params && route.params.onGoBack) {
        route.params.onGoBack(tempPastPositions);
      }
      navigation.goBack();
    }
  };

  function handleDelete() {
    let form = new FormData();

    form.append("user_token", user.user_token);
    form.append("user_id", user.user_id);
    form.append("post_id", route.params.position.post_id);

    postFormData("/delete_cv", form)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.status_code != "200") {
          setError(json.msg);
        } else {
          //setUser(json.data);
          let tempPostions = route.params.positions;
          tempPostions = tempPostions.filter(
            (item) => item.post_id != route.params.position.post_id
          );
          route.params.onGoBack(tempPostions);

          navigation.goBack();
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
              <SafeAreaView style={{ flex: 1 }}>

      <View style={{ height: 80 }}>
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
                    onPress={() => {
                      console.log(route.params);
                      navigation.goBack();
                    }}
                  >
                    <Image
                      source={require("../assets/ic_back.png")}
                      style={{ width: 28, height: 22 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: "70%" }}>
                  <Text style={{ color: "#4834A6", fontSize: 18 }}>
                    {strings.EDIT_YOUR_PAST_POSTION}
                  </Text>
                </View>
              </View>
            </View>

      <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            
            <View style={{ margin: 20 }}>
              <View style={{}}>
                <Text>{strings.WHAT_WAS_YOUR_POSITION}</Text>
                <View style={styles.inputField}>
                  <Image
                    source={require("../assets/ic_description.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <TextInput
                    style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                    onChangeText={(text) => setPosition(text)}
                    placeholder={strings.POSITON}
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

              <View style={{}}>
                <Text>{strings.WHO_WAS_YOUR_EMPLOYER}</Text>
                <View style={styles.inputField}>
                  <Image
                    source={require("../assets/ic_business.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <TextInput
                    style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                    onChangeText={(text) => setCompany(text)}
                    placeholder={strings.COMPANY_NAME}
                    value={company}
                    onFocus={() => {
                      handleFocus(1);
                    }}
                    ref={(ref) => {
                      handleRef(1, ref);
                    }}
                  />
                </View>
              </View>

              <View style={{}}>
                <Text>{strings.WHERE_WAS_YOUR_WORK_LOCATED}</Text>
                <View style={styles.inputField}>
                  <Image
                    source={require("../assets/ic_location_small.png")}
                    style={{ width: 12, height: 15 }}
                  />
                  <TextInput
                    style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                    onChangeText={(text) => setCity(text)}
                    placeholder={strings.CITY_COUNTRY}
                    value={city}
                    onFocus={() => {
                      handleFocus(2);
                    }}
                    ref={(ref) => {
                      handleRef(2, ref);
                    }}
                  />
                </View>
              </View>

              <View style={{}}>
                <Text>{strings.HOW_LONG_HAVE_YOU_BEEN_WORKING}</Text>
                <View style={{ flexDirection: "row", width: "85%" }}>
                <TouchableOpacity
                  style={{ width:'55%' }}
                  onPress={(val) => setShowFrom(!showFrom)}
                >
              <View style={styles.inputField}>
                <Image
                  source={require("../assets/ic_calendar.png")}
                  style={{ width: 20, height: 20 }}
                />
               
                  <Text style={{ paddingLeft:10,width: 120 }}>{formatDate(from)}</Text>
              </View>
              </TouchableOpacity>

              <View style={{ width: "2%" }}></View>
              <TouchableOpacity
                  style={{width:'55%' }}
                  onPress={(val) => setShowTo(!showTo)}
                >
              <View style={styles.inputField}>
                <Image
                  source={require("../assets/ic_calendar.png")}
                  style={{ width: 20, height: 20 }}
                />
                
                  <Text style={{ paddingLeft:10, width: 120 }}>{formatDate(to)}</Text>
                
              </View>
              </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: "#5F46BF",
                    alignItems: "center",
                    padding: 15,
                    borderRadius: 50,
                  }}
                  onPress={() => handleUpdate()}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>
                    {strings.UPDATE_POSTION}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginVertical: 10,
                    width: "100%",
                    backgroundColor: "#5F46BF",
                    alignItems: "center",
                    padding: 15,
                    borderRadius: 50,
                  }}
                  onPress={() => handleDelete()}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>
                    {strings.DELETE_POSTION}
                  </Text>
                </TouchableOpacity>
              </View>

              <DateTimePickerModal
                isVisible={showFrom}
                mode="date"
                onConfirm={(i) => hideFrom(i)}
                onCancel={(i) => hideFrom(i)}
                maximumDate={new Date()}

              />

              <DateTimePickerModal
                isVisible={showTo}
                mode="date"
                onConfirm={(i) => hideTo(i)}
                onCancel={(i) => hideTo(i)}
                maximumDate={new Date()}

              />
            </View>
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
        style={Platform.OS == "android" && { top: 0 }}
      />
    </View>
  );
}

export default SeekerEditPastPosition;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "#fff",
    borderColor: "#eee",

    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,

    marginTop: 10,
    marginBottom: 15,
    marginRight: 0,
    marginLeft: 0,

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
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
});
