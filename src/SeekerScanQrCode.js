import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Button, 
  Image,
  ImageBackground
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView } from 'react-native-safe-area-context';

function SeekerScanQrCode({navigation}){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <ImageBackground source={require('../assets/img_scan.png')} style={{width: '100%', height: '100%'}} >
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flex: 1, position: 'absolute', top: '20%'}}>
              <Text style={{color: '#fff', fontSize: 24}}>apployMe</Text>
            </View>
            <View style={{flex: 1, position: 'absolute', bottom: '17%', alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: 22}}>Scan the business's</Text>
              <Text style={{color: '#fff', fontSize: 22}}>apployMe QR Code to get started</Text>
            </View>
          </View>
        </ImageBackground>

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default SeekerScanQrCode;