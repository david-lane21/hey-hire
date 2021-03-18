import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  Linking,
  Alert,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import { getUser, removeUser } from "./utils/utils.js";
import { postFormData } from "./utils/network.js";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import GeolocationNew from '@react-native-community/geolocation';

import Header from "./components/Header";
import { strings } from './translation/config';
import NavigationService from './utils/NavigationService';
import { AuthContext } from "./navigation/context";
import CommonUtils from "./utils/CommonUtils.js";
import { Platform } from "react-native";

function SeekerHome({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser1] = useState({});
  const [profile, setProfile] = useState({});
  const [positions, setPositions] = useState([]);
  const [location, setLocation] = useState({
    latitude: 32.7767,
    longitude: -96.797,
  });
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [region, setRegion] = useState({
    latitude: 32.7767,
    longitude: -96.797,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });
  const [refresh, setRefresh] = useState(false);
  const { signOut } = React.useContext(AuthContext);
  const [latitude, setLatitude] = useState(32.7767);
  const [longitude, setLongitude] = useState(-96.797);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        loadDate();
      }, 500);

    }
  }, [isFocused]);

  useEffect(() => {

    Linking.addEventListener('url', handleOpenURL);
    (async () => {
      if (Platform.OS == "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted == 'granted') {

        
          Location.getLastKnownPositionAsync().then((loc) => {
            console.log('LAst location',loc);
const coords=loc.coords;

            setLatitude(coords.latitude);
            setLongitude(coords.longitude);
            map.animateToRegion(
              {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
              },
              500
            );

            CommonUtils.setLocation(loc.coords.latitude, loc.coords.longitude);
            setRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            });
            loadDate();

          }).catch((error) => {
           Location.getCurrentPositionAsync().then((loc)=>{

       

              map.animateToRegion(
                {
                  latitude: loc.coords.latitude,
                  longitude: loc.coords.longitude,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0421,
                },
                500
              );
              // setLocation(loc.coords);
              setLatitude(loc.coords.latitude);
              setLongitude(loc.coords.longitude);
              CommonUtils.setLocation(loc.coords.latitude, loc.coords.longitude);

              setRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
              });
              loadDate();

            }).catch( (error)=> {
              console.log('Current Possigion', error);
            
              map.animateToRegion(
                {
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0421,
                },
                500
              );
              // setLocation(loc.coords);
              setLatitude(latitude);
              setLongitude(longitude);
              CommonUtils.setLocation(latitude, longitude);

              setRegion({
                latitude:latitude,
                longitude: longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
              });
              loadDate();

            });
          });


        }
      } else {



        try {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== "granted") {
            setError("Permission to access location was denied");
          }
          let loc = await Location.getLastKnownPositionAsync();
          setLatitude(loc.coords.latitude);
          setLongitude(loc.coords.longitude);
          console.log(loc);
          map.animateToRegion(
            {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            },
            500
          );

          CommonUtils.setLocation(loc.coords.latitude, loc.coords.longitude);
          setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
          });
          loadDate();

        } catch (error) {
          try {
            let loc = await Location.getCurrentPositionAsync();

            map.animateToRegion(
              {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
              },
              500
            );
            // setLocation(loc.coords);
            setLatitude(loc.coords.latitude);
            setLongitude(loc.coords.longitude);
            CommonUtils.setLocation(loc.coords.latitude, loc.coords.longitude);

            setRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            });
            loadDate();

          } catch (error) {
            console.log('Current Possigion', error);
           
            
            map.animateToRegion(
              {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
              },
              500
            );
            // setLocation(loc.coords);
            setLatitude(latitude);
            setLongitude(longitude);
            CommonUtils.setLocation(latitude, longitude);

            setRegion({
              latitude:latitude,
              longitude: longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            });
             loadDate();
          }
        }
      }
    })();

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    }
  }, [isFocused]);



  function handleOpenURL(event) {
    let businessId = event.url.split("/").filter(Boolean).pop();
    NavigationService.navigate("SeekerHomeAvailableJobs",
      { biz_id: businessId / 33469 },
    );
  }

  async function loadDate() {
    try {
      console.log(latitude,longitude,region)

      getUser().then((u) => {
        let u2 = JSON.parse(u);
        setUser1(u2);

        let form = new FormData();
        form.append("user_token", u2.user_token);
        form.append("user_id", u2.user_id);

        postFormData("user_profile", form)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            json.data.avatar_image = json.data.avatar_image + "?random_number=" + new Date().getTime();
            setProfile(json.data);
            sortPositions(json.data);
            postFormData("get_all_business", form)
              .then((json2) => {
                return json2.json();
              })
              .then((json2) => {
                let bizList = json2.data.filter(
                  (b) => parseFloat(b.latitude) && parseFloat(b.longitude) && b.is_active == 1
                );
                bizList = bizList.map((b) => {
                
                  b.distance_in_km =  CommonUtils.distance(b.latitude,b.longitude,"K")
                  return b;
                });

                bizList = bizList.sort(
                  (a, b) => a.distance_in_km - b.distance_in_km
                );
                setBusinesses(bizList);
                setRefresh(false);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    catch (error) {
     console.log('Load data error',error);
    }
  }

  function sortPositions(data) {
    let positions = data.position.sort((a, b) => {
      let dateA = new Date(a.to_date);
      let dateB = new Date(b.to_date);
      return dateB - dateA;
    });
    positions = positions.slice(0, 2);
    setPositions(positions);
  }

  function currentLocation(business) {
    if (!business) {
      return {
        // latitude: 32.7767,
        // longitude: -96.7970,
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      };
    } else {
      let biz = businesses.find((b) => b.user_id == business);
      let lat = parseFloat(biz.latitude);
      let lng = parseFloat(biz.longitude);
      return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      };
    }
  }

  function dateFormat(date) {
    if (date) {
      let d = date.split("-");
      return `${d[1]}/${d[2]}/${d[0]}`;
    } else {
      return "";
    }
  }

  async function selectBiz(biz, idx) {
    if (this[`markerRef${biz.user_id}`]) {
      this[`markerRef${biz.user_id}`].showCallout();
    }
    await setSelectedBusiness(biz.user_id);

    map.animateToRegion(currentLocation(biz.user_id), 500);

    _scrollView.scrollTo({ x: idx * 125, y: 0, animated: true });
  }

  const purpleImg = require("../assets/ic_pin_purple.png");
  const blackImg = require("../assets/ic_pin_black.png");

  function mkrImage(mkr) {
    if (selectedBusiness === mkr.user_id) {
      return purpleImg;
    } else {
      return blackImg;
    }
  }

  function distance(lat1, lon1, lat2, lon2, unit) {

    console.log(lat1, lon1, lat2, lon2, unit)
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }

      return dist;
    }
  }

  function distanceInKM(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;
    console.log(12742 * Math.asin(Math.sqrt(a)))
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  function haversine_distance(lat1, lon1, lat2, lon2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (lon2 - lon1) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }

  function refreshData() {
    setRefresh(true);
    loadDate();
  }

  function _onLogout() {
    Alert.alert('ApployMe',
      `Are you sure you want to logout now?`
      , [
        {
          text: 'Logout', onPress: () => {
            removeUser();
            signOut();
          }
        },
        { text: 'Cancel', onPress: () => console.log('OK Pressed') }
      ])
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
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#715FCB",
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require("../assets/title_header.png")}
              style={{ width: 120, height: 25 }}
            />
          </View>
          <View style={{ position: 'absolute', left: 5 }}>
            <TouchableOpacity
              onPress={() => {

                _onLogout();
              }}
              style={{ padding: 5 }}
            >
              <Text style={{ paddingHorizontal: 10, color: "#fff", fontSize: 18 }}>
                {strings.LOGOUT}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ position: 'absolute', right: 5 }}>
            <TouchableOpacity
              onPress={() => {
                if (profile) {
                  navigation.navigate("SeekerLinks", {
                    screen: "SeekerEditProfile",
                    params: {
                      profile: profile,
                    },
                  });
                }
              }
              }
            >
              <Text
                style={{
                  paddingRight: 10,
                  textAlign: "right",
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                {strings.EDIT_PROFILE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 50 }} refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => { refreshData() }} tintColor={'#fff'} />
        }>
          {/* <View
            style={{
              // backgroundColor: '#4E35AE',
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              paddingBottom: 10,
              paddingTop: 15,
            }}
          >
            <View style={{ width: "33.3%" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text style={{ paddingLeft: 10, color: "#fff", fontSize: 18 }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "33.3%" }}>
              <Image
                source={require("../assets/title_header.png")}
                style={{ width: 120, height: 25 }}
              />
            </View>
            <View style={{ width: "33.3%" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SeekerLinks", {
                    screen: "SeekerEditProfile",
                    params: {
                      profile: profile,
                    },
                  })
                }
              >
                <Text
                  style={{
                    paddingRight: 10,
                    textAlign: "right",
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Image
              source={{ uri: profile.avatar_image, cache: "force-cache" }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 60,
                borderWidth: 1,
                borderColor: "#fff",
              }}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {user.first_name} {user.last_name}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 5,
            }}
          >
            <Image
              source={require("../assets/ic_graduation.png")}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ color: "#fff", marginLeft: 5 }}>
              {user.education}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 40,
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              marginTop: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../assets/ic_location.png")}
                style={{ width: 15, height: 15 }}
              />
              <Text style={{ color: "#fff", marginLeft: 5 }}>
                {user.city}, {user.state}, {user.country}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../assets/ic_star_white.png")}
                style={{ width: 14, height: 12, marginLeft: 8 }}
              />
              <Text style={{ color: "#fff", fontSize: 18, marginLeft: 8 }}>
                {strings.BIO}
              </Text>
            </View>
            <Text
              style={{
                color: "#fff",
                fontSize: 13,
                paddingBottom: 30,
                paddingLeft: 30,
                paddingTop: 10,
                paddingRight: 10,
              }}
            >
              {user.bio}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: "#715FCB",
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                marginTop: 10
              }}
            >
              <Image
                source={require("../assets/ic_past_positions_white.png")}
                style={{ width: 14, height: 12, marginLeft: 8 }}
              />
              <Text style={{ color: "#fff", fontSize: 18, marginLeft: 8 }}>
                {strings.PAST_POSTIONS}
              </Text>
            </View>

            {positions &&
              positions.map((position) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 30,
                      paddingTop: 15,
                      paddingBottom: 5,
                      width: "90%",
                    }}
                    key={position.post_id}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingBottom: 3,
                        }}
                      >
                        {dateFormat(position.from_date)} -{" "}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingBottom: 3,
                        }}
                      >
                        {dateFormat(position.to_date)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        width: "80%",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingBottom: 3,
                        }}
                      >
                        {position.category} -{" "}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingBottom: 3,
                        }}
                      >
                        {position.company_name} -{" "}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingBottom: 3,
                        }}
                      >
                        {position.city_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderBottomColor: "#715FCB",
                        borderBottomWidth: 1,
                        marginTop: 2.5
                      }}
                    ></View>
                  </View>
                );
              })}
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "#fff",
                height: 500,
              }}
            >
              <MapView
                ref={(r) => (map = r)}
                style={{ width: "99%", height: 500 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                customMapStyle={MapStyle}
                zoomEnabled={true}
              >
                <Marker
                  draggable={true}
                  key={"mkr.user_id"}
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                  }}
                >
                  <Image
                    source={require("../assets/img_map_radius.png")}
                    style={{ width: 120, height: 120 }}
                  />
                </Marker>

                {businesses.map((mkr, idx) => {
                  return (
                    <Marker
                      draggable={true}
                      key={mkr.user_id}
                      title={mkr.business_name}
                      ref={(r) => {
                        this[`markerRef${mkr.user_id}`] = r;
                      }}
                      coordinate={{
                        latitude: parseFloat(mkr.latitude),
                        longitude: parseFloat(mkr.longitude),
                      }}
                    >
                      <Image
                        source={mkrImage(mkr)}
                        style={{ width: 40, height: 40 }}
                      />
                    </Marker>
                  );
                })}
              </MapView>
            </View>

            <ScrollView
              ref={(ref) => (_scrollView = ref)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, position: "absolute", bottom: 5 }}
            >
              {businesses.map((biz, idx) => {
                if (selectedBusiness === biz.user_id) {
                  return (
                    <TouchableHighlight
                      key={biz.user_id}
                      onPress={() =>
                        navigation.navigate("SeekerHomeAvailableJobs", {
                          biz_id: biz.user_id,
                        })
                      }
                      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.001)" }}
                      underlayColor="rgba(0,0,0,0.001)"
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          margin: 10,
                          width: 125,
                          height: 120,
                          borderRadius: 8,
                          backgroundColor: "#3C2E8F",
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: "400",
                            marginTop: 20,
                            textAlign: "center",
                          }}
                        >
                          {strings.VIEW_AVAILABLE_POSTIONS}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  );
                } else {
                  return (
                    <TouchableHighlight
                      key={biz.user_id}
                      onPress={() => selectBiz(biz, idx)}
                      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.001)" }}
                      underlayColor="rgba(0,0,0,0.001)"
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          margin: 10,
                          width: 125,
                          height: 120,
                          borderRadius: 8,
                          backgroundColor: "#fff",
                          padding: 10,
                        }}
                      >
                        {biz.avatar_image ? (
                          <Image
                            source={{ uri: biz.avatar_image }}
                            style={{
                              width: 50,
                              height: 50,
                              margin: 10,
                              borderRadius: 25,
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../assets/ApployMeLogo.png")}
                            style={{ width: 50, height: 50, margin: 10 }}
                          />
                        )}
                        <Text style={{ fontSize: 12, color: "#444", flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">
                          {biz.business_name}
                        </Text>
                        <Text style={{ flex: 1, fontSize: 10, color: "#444" }}>
                          {biz.distance_in_km} {strings.MILES}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  );
                }
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

export default SeekerHome;

const MapStyle = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#333333",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
];
