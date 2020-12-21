import React, { useState, useEffect } from "react";
import { Platform, Linking, View, Text } from "react-native";
import Navigation, { AppNavigation, AuthNavigation } from "./src/Navigation";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import NavigationService from "./src/utils/NavigationService";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./src/navigation/context";
import { getUser } from "./src/utils/utils.js";

console.disableYellowBox = true;

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={AppNavigation}
        options={{
          animationEnabled: false,
        }}
        initialParams={{ screen:userToken.user_type==2?'Seeker':'Business' }}

      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthNavigation}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: (u) => {
        setIsLoading(false);
        setUserToken(u);
      },
      signUp: (u) => {
        setIsLoading(false);
        setUserToken(u);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    getUser().then((u) => {
      console.log(u);
      var userData = JSON.parse(u);
      if(userData && userData.is_verified==1){
        setUserToken(JSON.parse(u));
      }else{
        setUserToken(null);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      if (Constants.platform.ios) {
        PushNotificationIOS.requestPermissions();
      }
    }, 2500);
  });

  if (isLoading) {
    return (null);
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer  ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );

  // return <Navigation></Navigation>;
}
