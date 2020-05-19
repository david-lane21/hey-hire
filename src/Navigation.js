import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {getUser} from './utils/utils.js';
import HomeScreen from './HomeScreen';
import SeekerLogin from './SeekerLogin';
import BusinessLogin from './BusinessLogin';
import SeekerForgotPassword from './SeekerForgotPassword';
import BusinessForgotPassword from './SeekerForgotPassword';
import SeekerSignup from './SeekerSignup';
import BusinessSignup from './BusinessSignup';
import SeekerHome from './SeekerHome';
import BusinessHome from './BusinessHome';
import BusinessEditAccount from './BusinessEditAccount';
import BusinessNotifications from './BusinessNotifications';
import BusinessPostNewJob from './BusinessPostNewJob';
import BusinessPrinterOptions from './BusinessPrinterOptions';
import BusinessQrCodeScan from './BusinessQrCodeScan';
import BusinessReListJob from './BusinessReListJob';
import BusinessClosedJobs from './BusinessClosedJobs';
import BusinessSeekerProfile from './BusinessSeekerProfile';
import BusinessVisitorDetail from './BusinessVisitorDetail';
import SeekerScanQrCode from './SeekerScanQrCode';
import SeekerAppliedJobs from './SeekerAppliedJobs';
import SeekerNotifications from './SeekerNotifications';
import SeekerEditProfile from './SeekerEditProfile';
import SeekerJobDetail from './SeekerJobDetail';
import SeekerArchivedJobs from './SeekerArchivedJobs';
import SeekerAddLang from './SeekerAddLang';
import SeekerAddPastPosition from './SeekerAddPastPosition';
import TestLinks from './TestLinks';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Tab = createBottomTabNavigator();
// const currentUser = getUser()

function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" >
        <Stack.Screen name="Seeker" component={Seeker} options={{
          headerShown: false,
          }} />
        
        <Stack.Screen name="SeekerLinks" component={SeekerLinks} options={{
          headerShown: false,
          }} />

        <Stack.Screen name="Business" component={Business} options={{
          headerShown: false,
          }} />
        <Stack.Screen name="BusinessEditAccount" component={BusinessEditAccount} />
        
        <Stack.Screen name="BusinessPrinterOptions" component={BusinessPrinterOptions} />
        <Stack.Screen name="BusinessSeekerProfile" component={BusinessSeekerProfile} />
        <Stack.Screen name="BusinessVisitorDetail" component={BusinessVisitorDetail} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown: false,
          }} />
        <Stack.Screen name="SeekerLogin" component={SeekerLogin} options={{
          headerShown: false,
          }} />
        <Stack.Screen name="BusinessLogin" component={BusinessLogin} options={{
          headerShown: false,
          }} />
        <Stack.Screen name="SeekerSignup" component={SeekerSignup} options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "REGISTRATION",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#4E35AE'
          }} />
        <Stack.Screen name="BusinessSignup" component={BusinessSignup} options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "apployMe",
          headerStyle: {
            backgroundColor: '#4E35AE',
          },
          headerTintColor: '#fff'
          }} />
        <Stack.Screen name="SeekerForgotPassword" component={SeekerForgotPassword} options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Forgot Password",
          headerStyle: {
            backgroundColor: '#4E35AE',
          },
          headerTintColor: '#fff'
          }} />
        <Stack.Screen name="BusinessForgotPassword" component={BusinessForgotPassword} options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Forgot Password",
          headerStyle: {
            backgroundColor: '#4E35AE',
          },
          headerTintColor: '#fff'
          }} />

        <Stack.Screen name="TestLinks" component={TestLinks} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;

function Seeker({navigation}){
  let home = require('../assets/tabbar_home_active.png')
  let home2 = require('../assets/tab_home_off.png')
  let qr = require('../assets/tab_qr.png')
  let qr2 = require('../assets/tab_qr_off.png')
  let jobs = require('../assets/tab_jobs.png')
  let jobs2 = require('../assets/tab_jobs_off.png')
  let notification = require('../assets/tabbar_notification_active.png')
  let notification2 = require('../assets/tab_notification_off.png')
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'SeekerHome') {
          iconName = focused ? home : home2;
        } else if (route.name === 'SeekerScanQrCode') {
          iconName = focused ? qr : qr2;
        }else if (route.name === 'SeekerAppliedJobs') {
          iconName = focused ? jobs : jobs2;
        }else if (route.name === 'SeekerNotifications') {
          iconName = focused ? notification : notification2;
        }

        return <Image source={iconName} />;
      },
    })}
    tabBarOptions={{
      // activeTintColor: 'purple',
      // inactiveTintColor: 'gray',
      showLabel: false
    }}
    >
      <Tab.Screen name="SeekerHome" component={SeekerHome} />
      <Tab.Screen name="SeekerScanQrCode" component={SeekerScanQrCode} />
      <Tab.Screen name="SeekerAppliedJobs" component={SeekerAppliedJobs} />
      <Tab.Screen name="SeekerNotifications" component={SeekerNotifications} />
    </Tab.Navigator>
  )
}

function SeekerLinks({navigation}){
  return(
    <Stack2.Navigator>
      <Stack.Screen name="SeekerEditProfile" component={SeekerEditProfile} options={{
          headerShown: false,
          }} />
      <Stack.Screen name="SeekerArchivedJobs" component={SeekerArchivedJobs} options={{
          headerShown: false,
          }} />
      <Stack.Screen name="SeekerJobDetail" component={SeekerJobDetail} options={{
          headerShown: false,
          }} />
      <Stack.Screen name="SeekerAddLang" component={SeekerAddLang} options={{
          headerShown: false,
          }} />
      <Stack.Screen name="SeekerAddPastPosition" component={SeekerAddPastPosition} options={{
          headerShown: false,
          }} />
    </Stack2.Navigator>
  )
}

function Business({navigation}){
  let home = require('../assets/tab_home.png')
  let home2 = require('../assets/tab_home_off.png')
  let qr = require('../assets/tab_qr.png')
  let qr2 = require('../assets/tab_qr_off.png')
  let jobs = require('../assets/tab_jobs.png')
  let jobs2 = require('../assets/tab_jobs_off.png')
  let notification = require('../assets/tab_notification.png')
  let notification2 = require('../assets/tab_notification_off.png')

  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'BusinessHome') {
          iconName = focused ? home : home2;
        } else if (route.name === 'BusinessQrCodeScan') {
          iconName = focused ? qr : qr2;
        }else if (route.name === 'ClosedJobs') {
          iconName = focused ? jobs : jobs2;
        }else if (route.name === 'BusinessNotifications') {
          iconName = focused ? notification : notification2;
        }

        return <Image source={iconName} />;
      },
    })}
    tabBarOptions={{
      // activeTintColor: 'purple',
      // inactiveTintColor: 'gray',
      showLabel: false
    }}
    >
      <Tab.Screen name="BusinessHome" component={BusinessHome} />
      <Tab.Screen name="BusinessQrCodeScan" component={BusinessQrCodeScan} />
      <Tab.Screen name="ClosedJobs" component={ClosedJobs} />
      <Tab.Screen name="BusinessNotifications" component={BusinessNotifications} />
    </Tab.Navigator>
  )
}


function ClosedJobs(){
  return(
    <Stack2.Navigator>
      <Stack2.Screen name="BusinessClosedJobs" component={BusinessClosedJobs} options={{
          headerShown: false,
          }} />
      <Stack2.Screen name="BusinessPostNewJob" component={BusinessPostNewJob} options={{
          headerShown: false,
          }} />
      <Stack2.Screen name="BusinessReListJob" component={BusinessReListJob}  options={{
          headerShown: false,
          }} />
    </Stack2.Navigator>
  )
}