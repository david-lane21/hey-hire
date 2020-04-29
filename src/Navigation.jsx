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
import SeekerEditProfile from './SeekerEditProfile';
import SeekerScanQrCode from './SeekerScanQrCode';
import SeekerAppliedJobs from './SeekerAppliedJobs';
import SeekerNotifications from './SeekerNotifications';
import SeekerJobDetail from './SeekerJobDetail';
import SeekerArchivedJobs from './SeekerArchivedJobs';

const Stack = createStackNavigator();
const currentUser = getUser()

function Navigation() {
  if (currentUser && currentUser.user_type == '2') {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SeekerHome">
          <Stack.Screen name="SeekerHome" component={SeekerHome} />
          <Stack.Screen name="SeekerEditProfile" component={SeekerEditProfile} />
          <Stack.Screen name="SeekerScanQrCode" component={SeekerScanQrCode} />
          <Stack.Screen name="SeekerAppliedJobs" component={SeekerAppliedJobs} />
          <Stack.Screen name="SeekerArchivedJobs" component={SeekerArchivedJobs} />
          <Stack.Screen name="SeekerJobDetail" component={SeekerJobDetail} />
          <Stack.Screen name="SeekerNotifications" component={SeekerNotifications} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else if (currentUser && currentUser.user_type == '1') {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BusinessHome">
          <Stack.Screen name="BusinessHome" component={BusinessHome} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SeekerLogin" component={SeekerLogin} />
          <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
          <Stack.Screen name="SeekerSignup" component={SeekerSignup} />
          <Stack.Screen name="BusinessSignup" component={BusinessSignup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

export default Navigation;