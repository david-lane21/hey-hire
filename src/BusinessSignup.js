import React from 'react'
// import {
//   SafeAreaView, 
//   View, 
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native'
import { WebView } from 'react-native-webview';

function BusinessSignup({navigation}){

  return(
    <WebView source={{ uri: 'https://app.apployme.com/register' }} style={{ }} />
  )
}

export default BusinessSignup;