import React, {useState, useEffect} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [ready, setReady] = useState(false)
  
  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setReady(true)
  })

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <Navigation></Navigation>
  );
}