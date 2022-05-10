import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';  
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch } from "react-redux";

const CustomDrawer = (props) => {

  const dispatch = useDispatch();
  
  function _onLogout() {
    Alert.alert("ApployMe", `Are you sure you want to logout now?`, [
      {
        text: "Logout",
        onPress: () => {
          dispatch({type:'UserData/setState',payload: {token: null, profile: {}}})
        },
      },
      { text: "Cancel", onPress: () => console.log("OK Pressed") },
    ]);
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer_1}>
          <DrawerItemList {...props} />
          <DrawerItem label="Help" onPress={() => alert('Help')} />
          <DrawerItem label="Logout" onPress={() => _onLogout()} />
        </View>
        <View style={{flex: 2}}>
          <TouchableOpacity style={styles.subContainer_2} onPress={() => props.navigation.toggleDrawer()} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('100%'),
    marginTop: -getStatusBarHeight()
  },
  subContainer_1: {
    flex: 8,
    paddingTop: getStatusBarHeight(),
    backgroundColor: 'white',
    height: hp('100%')
  },
  subContainer_2: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
export default CustomDrawer;
