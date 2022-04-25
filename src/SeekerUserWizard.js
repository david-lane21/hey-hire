import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RoundButton from "./components/RoundButton";
import { useIsFocused } from "@react-navigation/native";
import { strings } from "./translation/config";
import DeviceInfo from 'react-native-device-info';
import CommonUtils from './utils/CommonUtils';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const isIphoneX = DeviceInfo.hasNotch();
const window = Dimensions.get("window");

function SeekerUserWizard({ navigation }) {
  const isFocused = useIsFocused();

  function termsOnPress() {
    // Navigate to terms Page
  }

  function policyOnPress() {
    // Navigate to Plicy and cookies Page
  }

  function signinTroubleOnPress() {
    //navigate to trouble screen
  }

  function createAccount() {
    navigation.navigate("SeekerSignup");
  }

  function signIn() {
    navigation.navigate("SeekerLogin");
  }

  return (
    <ImageBackground style={styles.container} source={require('../assets/userWizard_bg.png')}>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.termsText, { marginBottom: hp('4%')} ]}>
          {strings.USER_WIZARD_TEXT}
          <Text style={styles.underlineText} onPress={() => termsOnPress()}>{strings.TERMS}</Text>
          {strings.USER_WIZARD_TEXT_2}
          <Text style={styles.underlineText} onPress={() => policyOnPress()}>{strings.PRIVACY_AND_COOKIES}</Text>
        </Text>
        <RoundButton backgroundColor='#FFFFFF' text={strings.CREATE_ACCOUNT} textColor="#594A9E" onPress={() => createAccount()} />
        <RoundButton backgroundColor='#F1B257' text={strings.SIGN_IN} textColor="#FFFFFF" onPress={() => signIn()} />
        <Text style={[styles.termsText, styles.underlineText, { marginBottom: hp('1%') }]} onPress={() => signinTroubleOnPress()}>{strings.TROUBLE_SIGNING_IN}</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SeekerUserWizard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: hp('1.4%'),
    textAlign: 'center',
    paddingHorizontal: wp('10%'),
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
});
