import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getUser } from "./utils/utils.js";
import HomeScreen from "./HomeScreen";
import SeekerLogin from "./SeekerLogin";
import BusinessLogin from "./BusinessLogin";
import SeekerForgotPassword from "./SeekerForgotPassword";
import BusinessForgotPassword from "./BusinessForgotPassword";
import SeekerSignup from "./SeekerSignup";
import SeekerVerificationCode from "./SeekerVerificationCode";
import BusinessSignup from "./BusinessSignup";
import SeekerHome from "./SeekerHome";
import BusinessHome from "./BusinessHome";
import BusinessEditAccount from "./BusinessEditAccount";
import BusinessNotifications from "./BusinessNotifications";
import BusinessPostNewJob from "./BusinessPostNewJob";
import BusinessPrinterOptions from "./BusinessPrinterOptions";
import BusinessQrCodeScan from "./BusinessQrCodeScan";
import BusinessReListJob from "./BusinessReListJob";
import BusinessClosedJobs from "./BusinessClosedJobs";
import BusinessSeekerProfile from "./BusinessSeekerProfile";
import BusinessVisitorDetail from "./BusinessVisitorDetail";
import SeekerScanQrCode from "./SeekerScanQrCode";
import SeekerAppliedJobs from "./SeekerAppliedJobs";
import SeekerNotifications from "./SeekerNotifications";
import SeekerEditProfile from "./SeekerEditProfile";
import SeekerFinishRegistration from "./SeekerFinishRegistration";
import SeekerJobDetail from "./SeekerJobDetail";
import SeekerArchivedJobs from "./SeekerArchivedJobs";
import SeekerAvailableJobs from "./SeekerAvailableJobs";
import SeekerAddLang from "./SeekerAddLang";
import SeekerAddPastPosition from "./SeekerAddPastPosition";
import BusinessEdit from "./BusinessEdit";
import BusinessJobDetail from "./BusinessJobDetail";
import BusinessJobEdit from "./BusinessJobEdit";
import TestLinks from "./TestLinks";
import BusinessClosedJobDetail from "./BusinessClosedJobDetail";
import BusinessEmployees from "./BusinessEmployeers";
import BusinessSubmittedApplication from "./BusinessSubmittedApplication";
import SeekerEditPastPosition from "./SeekerEditPastPosition";
import ForgotPassword from './ForgotPassword';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();
const Tab = createBottomTabNavigator();
const BusinessHomeStack = createStackNavigator();
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
          name="Business"
          component={Business}
          options={{
            headerShown: false,
            gestureEnabled: false

          }}
        />

        <Stack.Screen
          name="BusinessLinks"
          component={BusinessLinks}
          options={{
            headerShown: false,
            gestureEnabled: false

          }}
        />

        <Stack.Screen
          name="BusinessEditAccount"
          component={BusinessEditAccount}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "Edit Account",
            headerStyle: {
              backgroundColor: "#4E35AE",
            },
            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="BusinessPrinterOptions"
          component={BusinessPrinterOptions}
        />
        <Stack.Screen
          name="BusinessSeekerProfileMain"
          component={BusinessSeekerProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BusinessVisitorDetail"
          component={BusinessVisitorDetail}
          options={{
            headerShown: false,
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
          name="BusinessLogin"
          component={BusinessLogin}
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
          name="BusinessSignup"
          component={BusinessSignup}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "apployMe",
            headerStyle: {
              backgroundColor: "#4E35AE",
            },
            headerTintColor: "#fff",
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
        <Stack.Screen
          name="BusinessForgotPassword"
          component={BusinessForgotPassword}
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

      <AppNavigationStack.Screen
        name="Business"
        component={Business}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />

      <AppNavigationStack.Screen
        name="BusinessLinks"
        component={BusinessLinks}
        options={{
          headerShown: false,
          gestureEnabled: false

        }}
      />

      <AppNavigationStack.Screen
        name="BusinessEditAccount"
        component={BusinessEditAccount}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Edit Account",
          headerStyle: {
            backgroundColor: "#4E35AE",
          },
          headerTintColor: "#fff",
          gestureEnabled: false

        }}
      />

      <AppNavigationStack.Screen
        name="BusinessPrinterOptions"
        component={BusinessPrinterOptions}
      />
      <AppNavigationStack.Screen
        name="BusinessSeekerProfileMain"
        component={BusinessSeekerProfile}
        options={{
          headerShown: false,
        }}
      />
      <AppNavigationStack.Screen
        name="BusinessVisitorDetail"
        component={BusinessVisitorDetail}
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
        name="BusinessLogin"
        component={BusinessLogin}
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
        name="BusinessSignup"
        component={BusinessSignup}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "apployMe",
          headerStyle: {
            backgroundColor: "#4E35AE",
          },
          headerTintColor: "#fff",
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
      <AuthNavigationStack.Screen
        name="BusinessForgotPassword"
        component={BusinessForgotPassword}
        options={{
          headerShown: true,
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

function Business({ navigation }) {
  let home = require("../assets/tab_home.png");
  let home2 = require("../assets/tab_home_off.png");
  let qr = require("../assets/tab_qr.png");
  let qr2 = require("../assets/tab_qr_off.png");
  let jobs = require("../assets/tabbar_Newjob.png");
  let jobs2 = require("../assets/tabbar_Newjob_grey.png");
  let notification = require("../assets/tab_notification.png");
  let notification2 = require("../assets/tab_notification_off.png");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "BusinessHomeStack") {
            iconName = focused ? home : home2;
          } else if (route.name === "BusinessQrCodeScan") {
            iconName = focused ? qr : qr2;
          } else if (route.name === "ClosedJobs") {
            iconName = focused ? jobs : jobs2;
          } else if (route.name === "BusinessNotifications") {
            iconName = focused ? notification : notification2;
          }
          return <Image source={iconName} />;
        },
      })}
      tabBarOptions={{
        // activeTintColor: 'purple',
        // inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >
      <Tab.Screen name="BusinessHomeStack" component={BusinessHomeRoute} />
      <Tab.Screen name="BusinessQrCodeScan" component={BusinessQrCodeScan} />
      <Tab.Screen
        name="ClosedJobs"
        component={ClosedJobs}
        initialRouteName="BusinessPostNewJob"
      />
      <Tab.Screen
        name="BusinessNotifications"
        component={BusinessNotifications}
      />
    </Tab.Navigator>
  );
}

function ClosedJobs() {
  return (
    <Stack2.Navigator initialRouteName="BusinessPostNewJob">
      <Stack2.Screen
        name="BusinessPostNewJob"
        component={BusinessPostNewJob}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="BusinessClosedJobs"
        component={BusinessClosedJobs}
        options={{
          headerShown: false,
        }}
      />

      <Stack2.Screen
        name="BusinessReListJob"
        component={BusinessReListJob}
        options={{
          headerShown: false,
        }}
      />
    </Stack2.Navigator>
  );
}

function BusinessHomeRoute({ navigation }) {
  return (
    <BusinessHomeStack.Navigator initialRouteName="BusinessHome">
      <Stack2.Screen
        name="BusinessHome"
        component={BusinessHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="BusinessEdit"
        component={BusinessEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="BusinessJobDetail"
        component={BusinessJobDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="BusinessJobEdit"
        component={BusinessJobEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="BusinessHomePostNewJob"
        component={BusinessPostNewJob}
        options={{
          headerShown: false,
        }}
      />
      <Stack2.Screen
        name="BusinessEmployees"
        component={BusinessEmployees}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BusinessSeekerProfile"
        component={BusinessSeekerProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BusinessSubmittedApplication"
        component={BusinessSubmittedApplication}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BusinessEmployeesApplication"
        component={BusinessSubmittedApplication}
        options={{
          headerShown: false,
        }}
      />
    </BusinessHomeStack.Navigator>
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
