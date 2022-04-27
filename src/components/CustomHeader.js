import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomHeader = (props) => {
  const {
    title,
  } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/headerImage.png')} />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  text: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold'
  },
  logo: {
    width: wp('20%'),
    height: hp('3.5%'),
    resizeMode: 'contain'
  },
  titleText: {
    fontSize: hp('2%'),
    color: '#594A9E',
    fontWeight: '600'
  }
});
export default CustomHeader;
