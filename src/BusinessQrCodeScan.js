import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Header from "./components/Header";
const window = Dimensions.get("window");
import { getUser, setUser, getToken } from "./utils/utils.js";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import ViewShot,{ captureScreen } from "react-native-view-shot";
import RNPrint from 'react-native-print';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNImageToPdf from 'react-native-image-to-pdf';

function BusinessQrCodeScan({ navigation }) {
  const isFocused = useIsFocused();

  const [qrvalue, setQrvalue] = useState("");
  const [user, setUser1] = useState({});
  const [qrUrl, setQrurl] = useState(null);

  useEffect(() => {
    console.log(isFocused);
    if (isFocused) {
      getUser().then((u) => {
        let u2 = JSON.parse(u);
        console.log(u2);
        setUser1(u2);
        const url = "https://stagingapp.apployme.com/qr/" + u2.user_id * 33469;
        setQrurl(url);
        console.log(url)
      });
    }
  }, [isFocused]);

  function onClickPrint(){
    console.log('Print!')
    captureScreen({
      format: "jpg",
      quality: 0.8
    }).then(
      async(uri) =>{
         console.log("Image saved to", uri);
         const newPath= Platform.OS=="android"? uri.slice(7):uri;
         const options = {
          imagePaths:  [newPath],
          name:  'PDFName',     
           
        };
        const pdf = await RNImageToPdf.createPDFbyImages(options);
        console.log(pdf)

        await RNPrint.print({ filePath: pdf.filePath })

      },
      error => console.error("Oops, snapshot failed", error)
    );
  }

  function onClickShare(){
    console.log('Print!')
    captureScreen({
      format: "jpg",
      quality: 0.8
    }).then(
      async(uri) =>{
         RNFS.readFile(uri, 'base64').then((res) => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            title: 'Share Title',
            message: 'Share Message',
            url: urlString,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        });

      },
      error => console.error("Oops, snapshot failed", error)
    );
  }

  return (
    <LinearGradient

      colors={["#4E35AE", "#775ED7"]}
    >
    <SafeAreaView >
  
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
            <View style={{ width: "33.3%" }}>
              <TouchableOpacity
                style={{left:10}}
                onPress={() => onClickPrint()}
              >
               <Image source={require('../assets/ic_print.png') } style={{height:30,width:30}}  />
              </TouchableOpacity>
            </View>
            <View style={{ width: "33.3%" }}>
              <Image
                source={require("../assets/title_header.png")}
                style={{ width: 120, height: 25 }}
              />
            </View>
            <View style={{ width: "33.3%",alignItems:'flex-end' }}>
              <TouchableOpacity
                onPress={() =>onClickShare()    }
                style={{right:10}}
              >
               <Image source={require('../assets/ic_share_w.png') } style={{height:30,width:30}}  />
              </TouchableOpacity>
            </View>
          </View>
          
      {/* <View style={{backgroundColor:'#0f0'}}> */}
      
        <View style={{ alignSelf: "center",backgroundColor:'white',width:'100%',height:window.height-100,alignItems:'center',justifyContent:'center' }}>
          {qrUrl ? (
            <QRCode value={qrUrl} style={{ position: "absolute",backgroundColor:'red' }} size={150} />
          ) : (
            <ActivityIndicator size={"large"} animating={true} />
          )}
        </View>
      {/* </View> */}
    </SafeAreaView>
    </LinearGradient>
     );
}

export default BusinessQrCodeScan;

// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Button,
//   Image,
//   ImageBackground
// } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { SafeAreaView } from 'react-native-safe-area-context';

// function BusinessQrCodeScan({navigation}){
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);

//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//       }}>

//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={StyleSheet.absoluteFillObject}
//         />
//         <ImageBackground source={require('../assets/img_scan.png')} style={{width: '100%', height: '100%'}} >
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <View style={{flex: 1, position: 'absolute', top: '20%'}}>
//               <Text style={{color: '#fff', fontSize: 24}}>apployMe</Text>
//             </View>
//             <View style={{flex: 1, position: 'absolute', bottom: '17%', alignItems: 'center'}}>
//               <Text style={{color: '#fff', fontSize: 22}}>Scan the business's</Text>
//               <Text style={{color: '#fff', fontSize: 22}}>apployMe QR Code to get started</Text>
//             </View>
//           </View>
//         </ImageBackground>

//       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//     </View>
//   );
// }
