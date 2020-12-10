import React, { useState, useEffect } from "react";
import { Platform,Linking } from "react-native";
import Navigation from "./src/Navigation";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import NavigationService from './src/utils/NavigationService';

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

export default function App( props) {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      if (Constants.platform.ios) {
        PushNotificationIOS.requestPermissions();
      }
    }, 2500);    

  });


  return <Navigation></Navigation>;
}
