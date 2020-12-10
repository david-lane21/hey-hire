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
  Dimensions,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/native";
import { educationLevels, countries, languages } from "./utils/consts.js";
import { getUser, setUser, getToken } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";
import { WebView } from "react-native-webview";
const window = Dimensions.get("window");
import GeneralConfirmationAlert from './components/GeneralConfirmationAlert';
import {strings} from './translation/config';

function BusinessEditAccount({ navigation }) {
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser1] = useState({});
  const [deviceToken, setDeviceToken] = useState("");

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
  const [modalGoto, setModalGoto] =  useState(false);

  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);
  const [modalText,setModalText] = useState("To perform changes in your accout please visit our web portal. By visiting: apployme.com/account")

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

  useEffect(() => {
       console.log(isFocused)
    if (isFocused) {
      loadDate();
    }
  }, [isFocused]);

  function loadDate() {
    getUser().then((u) => {
      let u2 = JSON.parse(u);
         console.log(u2)
      setUser1(u2);
      getToken().then((t) => setDeviceToken(t));



      let p = u2.phone.split(" ");
          let p1 = p[0].replace(/\+/g, "");
          let p2 = p[1] + " " + p[2];
          setFirstName(u2.first_name);
          setLastName(u2.last_name);
          setAddress(u2.address);
          setCountry(u2.country);
          setState(u2.state);
          setCity(u2.city);
          setZipcode(u2.zip_code);
          setPhCode(p1);
          setPhone(p2);
          setEmail(u2.email);

      let form = new FormData();
      form.append("user_token", u2.user_token);
      form.append("user_id", u2.user_id);

      // postFormData("user_profile", form)
      //   .then((res) => {
      //        console.log('step 1')
      //     return res.json();
      //   })
      //   .then((json) => {
      //     console.log("step 2");
      //     console.log(json.data);
      //     let p = json.data.phone.split(" ");
      //     let p1 = p[0].replace(/\+/g, "");
      //     let p2 = p[1] + " " + p[2];
      //     setFirstName(json.data.first_name);
      //     setLastName(json.data.last_name);
      //     setAddress(json.data.address);
      //     setCountry(json.data.country);
      //     setState(json.data.state);
      //     setCity(json.data.city);
      //     setZipcode(json.data.zip_code);
      //     setPhCode(p1);
      //     setPhone(p2);
      //     setEmail(json.data.email);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });
  }

  function handleUpdate() {
    setModalGoto(true);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

       console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
       console.log(image)
  };

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <SafeAreaView>

       <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              borderBottomWidth:1,
              borderBottomColor:'#eee',
              paddingTop:20
            }}
          >
            <View style={{ width: "30%", marginLeft: 15 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Business")}>
                <Image
                  source={require("../assets/ic_back.png")}
                  style={{ width: 28, height: 22 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "65%" }}>
            <Image
                source={require("../assets/title_apployme.png")}
                style={{ width: 120, height: 25 }}
              />
            </View>
          </View>
      <ScrollView  showsVerticalScrollIndicator={false}>
         

          <View style={{ flex: 1, width: "100%", marginTop: 10 }}>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 10,
              borderBottomWidth:1,
              borderBottomColor:'#eee',
              marginBottom:20
            }}
          ><Text style={{fontSize:20,color:'#5B42BB'}}>{strings.ACCOUNT}</Text>
            </View>
            
             {/* <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
               <View style={{ width: 150, height: 150, alignSelf: "center" }}>
                <Image source={{uri: user.avatar_image}} style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}} />
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
               </View> */}

               <View style={styles.inputField}>
                 <Image
                   source={require("../assets/ic_user.png")}
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   onChangeText={(text) => setFirstName(text)}
                   placeholder={strings.FIRSTNAME}
                   value={firstName}
                   textContentType="name"
                   editable={false}
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
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   onChangeText={(text) => setLastName(text)}
                   placeholder={strings.LASTNAME}
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
                   source={require("../assets/ic_business.png")}
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   placeholder={strings.ADDRESS}
                   value={user.business_name}
                   textContentType="fullStreetAddress"
                   editable={false}
                   onFocus={() => {
                     handleFocus(2);
                   }}
                   ref={(ref) => {
                     handleRef(2, ref);
                   }}
                 />
               </View>


               <View style={styles.inputField}>
                 <Image
                   source={require("../assets/ic_address.png")}
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   onChangeText={(text) => setAddress(text)}
                   placeholder={strings.ADDRESS}
                   value={address}
                   textContentType="fullStreetAddress"
                   editable={false}
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
                        Alert.alert('Modal has been closed.');
                   }}
                 >
                   <SafeAreaView>
                     <View style={{ marginTop: 22 }}>
                       <View>
                         <FlatList
                              
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
                                       color: "#000",
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

                 <View style={{ flex: 1, flexDirection: "row", }}>
                   <TouchableOpacity
                     style={[styles.inputField,{paddingVertical:15}]}
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

               {/* <View style={styles.inputField}>
                 <Image
                   source={require("../assets/ic_country.png")}
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   onChangeText={(text) => setState(text)}
                   placeholder="State..."
                   value={state}
                   textContentType="addressState"
                   onFocus={() => {
                     handleFocus(3);
                   }}
                   ref={(ref) => {
                     handleRef(3, ref);
                   }}
                 />
               </View> */}

               {/* <View style={styles.inputField}>
                 <Image
                   source={require("../assets/ic_country.png")}
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   onChangeText={(text) => setCity(text)}
                   placeholder="City..."
                   value={city}
                   textContentType="addressCity"
                   onFocus={() => {
                     handleFocus(4);
                   }}
                   ref={(ref) => {
                     handleRef(4, ref);
                   }}
                 />
               </View> */}
{/* 
               <View style={styles.inputField}>
                 <Image
                   source={require("../assets/ic_zip.png")}
                   style={{ width: 20, height: 20 }}
                 />
                 <TextInput
                   style={{ width: "100%", paddingLeft: 10, color: "#000" }}
                   onChangeText={(text) => setZipcode(text)}
                   placeholder="Zip..."
                   value={zipcode}
                   textContentType="postalCode"
                   onFocus={() => {
                     handleFocus(5);
                   }}
                   ref={(ref) => {
                     handleRef(5, ref);
                   }}
                 />
               </View> */}

               <View style={{ flex: 1 }}>
                 <Modal
                   animationType="slide"
                   transparent={false}
                   visible={modalVisible}
                   onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                   }}
                 >
                   <SafeAreaView>
                     <View style={{ marginTop: 22 }}>
                       <View>
                         <FlatList
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
                                       color: "#000",
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
                 {/* <View style={{ flex: 1, flexDirection: "row" }}>
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
                     textContentType="telephoneNumber"
                     onFocus={() => {
                       handleFocus(6);
                     }}
                     ref={(ref) => {
                       handleRef(6, ref);
                     }}
                   />
                 </View> */}

<View style={styles.inputField}>
                   <Image
                     source={require("../assets/ic_phone.png")}
                     style={{ height: 20, width: 20 }}
                   />
                    <TextInput
                     style={{ paddingLeft: 10, width: "100%", color: "#000" }}
                     onChangeText={(text) => setPhone(text)}
                     placeholder={strings.PHONE}
                     value={user.phone}
                     textContentType="telephoneNumber"
                     editable={false}
                     onFocus={() => {
                       handleFocus(6);
                     }}
                     ref={(ref) => {
                       handleRef(6, ref);
                     }}
                   />
                 </View>

                 <View style={styles.inputField}>
                   <Image
                     source={require("../assets/ic_mail.png")}
                     style={{ height: 20, width: 20 }}
                   />
                   <TextInput
                     style={{ paddingLeft: 10, width: "100%", color: "#000" }}
                     onChangeText={(text) => setEmail(text)}
                     placeholder={strings.EMAIL}
                     value={email}
                     type="email"
                     textContentType="emailAddress"
                     editable={false}
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
                     placeholder=""
                     textContentType="emailAddress"  
                     editable={false}                  
                   />
                 </View>

               </View>

              </View>

                   <View style={{height:100}}></View>

         </ScrollView>
         </SafeAreaView>


         <SafeAreaView>
           <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
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
                 {strings.UPDATE_ACCOUNT_DETAILS}
               </Text>
             </TouchableOpacity>
           </View>
           <GeneralConfirmationAlert 
           icon={require('../assets/ic_point.png')}
           visible={modalGoto} 
           text={modalText} 
           buttons={['Cancel','Go to']}
            onClose={()=>setModalGoto(false)} 
            onPress={()=>setModalGoto(false)} />
         </SafeAreaView>
         <KeyboardAccessoryNavigation
           androidAdjustResize={Platform.OS == "android"}
           avoidKeyboard={Platform.OS == "android"}
           style={Platform.OS == "android" && { top: 0 }}
           onNext={handleFocusNext}
           onPrevious={handleFocusPrev}
           nextDisabled={nextFocusDisabled}
           previousDisabled={previousFocusDisabled}
         />
       </View>
  );
}

export default BusinessEditAccount;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    // padding: 13,
    paddingHorizontal:10,
    paddingVertical:Platform.OS=="android"? 5:10,
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
  code: {
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
       alignItems: 'center',
       width: '25%',
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
       flexDirection: 'row',
       alignItems: 'center',
       width: '50%',
    marginLeft: 5,
  },
  code3: {
    backgroundColor: "#fff",
    borderColor: "#eee",
    paddingTop: 13,
    paddingLeft: 13,
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
       alignItems: 'center',
       width: '25%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
       borderColor: '#333',
       borderWidth: 1,
    minWidth: "95%",
    paddingBottom: 13,
  },
  inputAndroid: {
    minWidth: "95%",
    paddingBottom: 13,
  },
});
