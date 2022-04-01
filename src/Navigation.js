import React from "react";
import { View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getUser } from "./utils/utils.js";
import HomeScreen from "./HomeScreen";
import SeekerLogin from "./SeekerLogin";
import SeekerForgotPassword from "./SeekerForgotPassword";
import SeekerSignup from "./SeekerSignup";
import SeekerVerificationCode from "./SeekerVerificationCode";
import SeekerHome from "./SeekerHome";
import SeekerScanQrCode from "./SeekerScanQrCode";
import SeekerAppliedJobs from "./SeekerAppliedJobs";
import SeekerNotifications from "./SeekerNotifications";
import SeekerEditProfile from "./SeekerEditProfile";
import SeekerFinishRegistration from "./SeekerFinishRegistration";
import SeekerJobDetail from "../src/screens/dashboard/seeker-job-detail";
import SeekerArchivedJobs from "./SeekerArchivedJobs";
import SeekerAvailableJobs from "./SeekerAvailableJobs";
import SeekerAddLang from "./SeekerAddLang";
import SeekerAddPastPosition from "./SeekerAddPastPosition";
import TestLinks from "./TestLinks";
import SeekerEditPastPosition from "./SeekerEditPastPosition";
import ForgotPassword from './ForgotPassword';
import SeekerBusinessList from './SeekerBusinessList';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();
const Tab = createBottomTabNavigator();
const SeekerHomeStack = createStackNavigator();
const AppNavigationStack = createStackNavigator();

const AuthNavigationStack = createStackNavigator();

import NavigationService from "./utils/NavigationService";
// const currentUser = getUser()

export function Navigation(props) {
  // useEffect(()=>{
  //   Linking.addEventListener('url',handleOpenURL);
  // },[])

  // function handleOpenURL(event){
  //   console.log('Handle open url',props,event);
  // }

  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="Seeker"
          component={Seeker}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SeekerLinks"
          component={SeekerLinks}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />


        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SeekerLogin"
          component={SeekerLogin}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="SeekerSignup"
          component={SeekerSignup}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "REGISTRATION",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#4E35AE",
          }}
        />
        <Stack.Screen
          name="SeekerVerificationCode"
          component={SeekerVerificationCode}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="SeekerForgotPassword"
          component={SeekerForgotPassword}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: "Forgot Password",
            headerStyle: {
              backgroundColor: "#4E35AE",
            },
            headerTintColor: "#fff",
          }}
        />
        

        <Stack.Screen name="TestLinks" component={TestLinks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;


export function AppNavigation({ navigation }) {
  return (
    <AppNavigationStack.Navigator initialRouteName={'Seeker'}>
      <AppNavigationStack.Screen
        name="Seeker"
        component={Seeker}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />

      <AppNavigationStack.Screen
        name="SeekerLinks"
        component={SeekerLinks}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />

      
    </AppNavigationStack.Navigator>
  );
}


export function AuthNavigation({ navigation }) {
  return (
    <AuthNavigationStack.Navigator >
      {/* <AuthNavigationStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled:false

          }}
        /> */}
      <AuthNavigationStack.Screen
        name="SeekerLogin"
        component={SeekerLogin}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />
      
      <AuthNavigationStack.Screen
        name="SeekerSignup"
        component={SeekerSignup}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "REGISTRATION",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#4E35AE",
          gestureEnabled: false

        }}
      />
      <AuthNavigationStack.Screen
        name="SeekerVerificationCode"
        component={SeekerVerificationCode}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />
      
      <AuthNavigationStack.Screen
        name="SeekerForgotPassword"
        component={SeekerForgotPassword}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerTitle: "Forgot Password",
          headerStyle: {
            backgroundColor: "#4E35AE",
          },
          headerTintColor: "#fff",
          gestureEnabled: false

        }}
      />
      
      <Stack2.Screen
        name="SeekerFinishRegistration"
        component={SeekerFinishRegistration}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />
      <Stack2.Screen
        name="SeekerAddPastPosition"
        component={SeekerAddPastPosition}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Forgot Password",
          headerStyle: {
            backgroundColor: "#4E35AE",
          },
          headerTintColor: "#fff",
        }}
      />

    </AuthNavigationStack.Navigator>
  )
}

function Seeker({ navigation }) {
  let home = require("../assets/tabbar_home_active.png");
  let home2 = require("../assets/tab_home_off.png");
  let qr = require("../assets/tab_qr.png");
  let qr2 = require("../assets/tab_qr_off.png");
  let jobs = require("../assets/tab_jobs.png");
  let jobs2 = require("../assets/tab_jobs_off.png");
  let notification = require("../assets/tabbar_notification_active.png");
  let notification2 = require("../assets/tab_notification_off.png");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let border = focused ? true : false;

          if (route.name === "SeekerHome") {
            iconName = focused ? home : home2;
          } else if (route.name === "SeekerScanQrCode") {
            iconName = focused ? qr : qr2;
          } else if (route.name === "SeekerAppliedJobs0") {
            iconName = focused ? jobs : jobs2;
          } else if (route.name === "SeekerNotifications") {
            iconName = focused ? notification : notification2;
          }

          return (
            <Icon iconName={iconName} border={border} navigation={navigation} />
          );
        },
      })}
      tabBarOptions={{
        // activeTintColor: 'purple',
        // inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >
      <Tab.Screen name="SeekerHome" component={SeekerHomeRoute} />
      <Tab.Screen name="SeekerScanQrCode" component={SeekerScanQrCode} />
      <Tab.Screen
        name="SeekerAppliedJobs0"
        component={SeekerAppliedJobs0}
        initialRouteName={"SeekerAppliedJobs"}
      />
      <Tab.Screen name="SeekerNotifications" component={SeekerNotifications} />
    </Tab.Navigator>
  );
}
function SeekerHomeRoute({ navigation }) {
  return (
    <SeekerHomeStack.Navigator initialRouteName="SeekerHome">
      <Stack3.Screen
        name="SeekerHome"
        component={SeekerHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack3.Screen
        name="SeekerBusinessList"
        component={SeekerBusinessList}
        options={{
          headerShown: false,
        }}
      />
      <Stack3.Screen
        name="SeekerHomeAvailableJobs"
        component={SeekerAvailableJobs}
        options={{
          headerShown: false,
        }}
      />
      <Stack3.Screen
        name="SeekerHomeJobDetail"
        component={SeekerJobDetail}
        options={{
          headerShown: false,
        }}
      />
    </SeekerHomeStack.Navigator>
  );
}

function SeekerLinks({ navigation }) {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="SeekerEditProfile"
        component={SeekerEditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="SeekerFinishRegistration"
        component={SeekerFinishRegistration}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="SeekerArchivedJobs"
        component={SeekerArchivedJobs}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack2.Screen name="SeekerJobDetail" component={SeekerJobDetail} options={{
          headerShown: false,
          }} /> */}
      <Stack2.Screen
        name="SeekerAddLang"
        component={SeekerAddLang}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="SeekerAddPastPosition"
        component={SeekerAddPastPosition}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="SeekerEditPastPosition"
        component={SeekerEditPastPosition}
        options={{
          headerShown: false,
        }}
      />
    </Stack2.Navigator>
  );
}

function BusinessLinks({ navigation }) {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="BusinessEditAccount"
        component={BusinessEditAccount}
        options={{
          headerShown: false,
        }}
      />
    </Stack2.Navigator>
  );
}

function SeekerAppliedJobs0({ navigation }) {
  return (
    <Stack2.Navigator initialRouteName="SeekerAppliedJobs">
      <Stack2.Screen
        name="SeekerAppliedJobs"
        component={SeekerAppliedJobs}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="SeekerJobDetail"
        component={SeekerJobDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="SeekerAvailableJobs"
        component={SeekerAvailableJobs}
        options={{
          headerShown: false,
        }}
      />
    </Stack2.Navigator>
  );
}
  

function Icon(props) {
  return (
    <View
      style={
        props.border
          ? {
            borderBottomWidth: 2,
            borderBottomColor: "#5F46BF",
            paddingBottom: 5,
          }
          : { paddingBottom: 5 }
      }
    >
      <Image source={props.iconName} />
    </View>
  );
}
