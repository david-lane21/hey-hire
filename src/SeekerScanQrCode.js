import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import {strings} from './translation/config';
import DeviceInfo from 'react-native-device-info';
const isIphoneX = DeviceInfo.hasNotch();

const window = Dimensions.get("window");

function SeekerScanQrCode({ navigation }) {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    return () => {
      setScanned(false);
    };
  }, [isFocused]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let businessId = data.split("/").filter(Boolean).pop();
    console.log(businessId / 33469);
    navigation.navigate("SeekerHome", {
      screen: "SeekerHomeAvailableJobs",
      params: { biz_id: businessId / 33469 },
    });
  };

  if (hasPermission === null) {
    return <Text>{strings.REQUEST_CAMERA}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{strings.NO_CAMERA}</Text>;
  }

  return (
    <LinearGradient
    style={{ flex: 1 }}

      colors={["#4E35AE", "#775ED7"]}
    >
       <SafeAreaView >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ position: 'absolute',
        left: 0,
        right: 0,
        top: isIphoneX? 50:20,
        bottom: 0}}
      />
      <ImageBackground
        source={require("../assets/img_scan.png")}
        style={{  width: window.width,height:window.height,backgroundColor:'transparent '  }}
      >
        <View style={{ flex: 1, alignItems: "center",backgroundColor:'transparent'}}>
          <View style={{ flex: 1, position: "absolute", top: "20%" }}>
            <Text style={{ color: "#fff", fontSize: 24 }}>{strings.APPLOYME}</Text>
          </View>
          <View
            style={{
              flex: 1,
              position: "absolute",
              bottom: "17%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {strings.SACN_BUSINESS}
            </Text>
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {strings.APPLOYME_QR_CODE}
            </Text>
          </View>
        </View>
      </ImageBackground>
      {scanned && (
        <View style={{position:'absolute',bottom:0,width:'100%'}}>
        <Button title={strings.TAP_TO_SCAN_AGAIN}  onPress={() => setScanned(false)} />
        </View>
      )}
      </SafeAreaView>
      </LinearGradient>
  );
}

export default SeekerScanQrCode;
