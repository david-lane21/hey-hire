import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'

function BusinessPostNewJob({navigation}){
  return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView>
        <Header />

        <View style={{padding: 20}}>
          
        </View>
      </SafeAreaView>
    </View>
  )
}

export default BusinessPostNewJob;

function Header(){
  return(
    <View style={{
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    paddingBottom: 10
    }}>
      <View style={{width: '35%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{paddingLeft: 10}}>Archived posts</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '65%'}}>
        <Text style={{ color: '#4834A6', fontSize: 18}}>POST A JOB</Text>
      </View>
    </View>
  )
}