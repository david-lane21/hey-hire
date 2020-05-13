import * as React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {getUser} from './utils/utils.js';
import HomeScreen from './HomeScreen';
import SeekerLogin from './SeekerLogin';
import BusinessLogin from './BusinessLogin';
import ForgotPassword from './ForgotPassword';
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
import BusinessSeekerProfile from './BusinessSeekerProfile';
import BusinessVisitorDetail from './BusinessVisitorDetail';

import SeekerEditProfile from './SeekerEditProfile';
import SeekerScanQrCode from './SeekerScanQrCode';
import SeekerAppliedJobs from './SeekerAppliedJobs';
import SeekerNotifications from './SeekerNotifications';
import SeekerJobDetail from './SeekerJobDetail';
import SeekerArchivedJobs from './SeekerArchivedJobs';
import SeekerAddLang from './SeekerAddLang';
import SeekerAddPastPosition from './SeekerAddPastPosition';
import TestLinks from './TestLinks';

const Stack = createStackNavigator();
// const currentUser = getUser()

function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
        <Stack.Screen name="SeekerHome" component={SeekerHome} />

        <Stack.Screen name="SeekerEditProfile" component={SeekerEditProfile} />
        <Stack.Screen name="SeekerScanQrCode" component={SeekerScanQrCode} />
        <Stack.Screen name="SeekerAppliedJobs" component={SeekerAppliedJobs} />
        <Stack.Screen name="SeekerArchivedJobs" component={SeekerArchivedJobs} />
        <Stack.Screen name="SeekerJobDetail" component={SeekerJobDetail} />
        <Stack.Screen name="SeekerNotifications" component={SeekerNotifications} />
        <Stack.Screen name="SeekerAddLang" component={SeekerAddLang} />
        <Stack.Screen name="SeekerAddPastPosition" component={SeekerAddPastPosition} />

        <Stack.Screen name="BusinessHome" component={BusinessHome} />
        <Stack.Screen name="BusinessEditAccount" component={BusinessEditAccount} />
        <Stack.Screen name="BusinessNotifications" component={BusinessNotifications} />
        <Stack.Screen name="BusinessPostNewJob" component={BusinessPostNewJob} />
        <Stack.Screen name="BusinessPrinterOptions" component={BusinessPrinterOptions} />
        <Stack.Screen name="BusinessQrCodeScan" component={BusinessQrCodeScan} />
        <Stack.Screen name="BusinessReListJob" component={BusinessReListJob} />
        <Stack.Screen name="BusinessSeekerProfile" component={BusinessSeekerProfile} />
        <Stack.Screen name="BusinessVisitorDetail" component={BusinessVisitorDetail} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SeekerLogin" component={SeekerLogin} />
        <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
        <Stack.Screen name="SeekerSignup" component={SeekerSignup} />
        <Stack.Screen name="BusinessSignup" component={BusinessSignup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="TestLinks" component={TestLinks} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;