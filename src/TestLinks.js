import React from 'react'
import {View, Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native'

function TestLinks({navigation}){
  let links = [
    {name: "Seeker"},
    {name: "SeekerHome"},
    {name: "SeekerEditProfile"},
    {name: "SeekerScanQrCode"},
    {name: "SeekerAppliedJobs"},
    {name: "SeekerArchivedJobs"},
    {name: "SeekerJobDetail"},
    {name: "SeekerNotifications"},
    {name: "SeekerAddLang"},
    {name: "SeekerAddPastPosition"},
    {name: "BusinessHome"},
    {name: "BusinessEditAccount"},
    {name: "BusinessNotifications"},
    {name: "BusinessPostNewJob"},
    {name: "BusinessPrinterOptions"},
    {name: "BusinessQrCodeScan"},
    {name: "BusinessReListJob"},
    {name: "BusinessSeekerProfile"},
    {name: "BusinessVisitorDetail"},
    {name: "HomeScreen"},
    {name: "SeekerLogin"},
    {name: "BusinessLogin"},
    {name: "SeekerSignup"},
    {name: "BusinessSignup"},
    {name: "ForgotPassword"},
    {name: "TestLinks"},
  ]
  return(
    <SafeAreaView>
    <FlatList
      data={links}
      renderItem={({item, index}) => 
        <TouchableOpacity 
        style={{padding: 15, borderBottomColor: '#999', borderBottomWidth: 1}}
        onPress={() => navigation.navigate(item.name)}
        key={item.name}
        keyExtractor={(item, index) => item.name}>
          <Text style={{}}>{item.name}</Text>
        </TouchableOpacity>
      }
    />
    </SafeAreaView>
  )
}

export default TestLinks;