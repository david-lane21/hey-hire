import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function BusinessPrinterOptions({navigation}){
  return(
    <SafeAreaView>
      <View>
        <Text>BusinessPrinterOptions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BusinessPrinterOptions;