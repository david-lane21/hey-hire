import React, {useState} from 'react'
import {
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  Platform, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  TouchableHighlight
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {countries} from './utils/consts.js'
// console.log(countries)
function SeekerLogin({ navigation }){
  const [modalVisible, setModalVisible] = useState(false);
  const [phCode, setPhCode] = useState('+1')

  function _onPress(item){
    setModalVisible(false)
    setPhCode(item.dial_code)
  }
  function handleLogin(){
    console.log('+++++++++++++++++')
  }
  return(
    <LinearGradient 
      style={styles.container} 
      colors={['#4E35AE', '#775ED7']}>
      <SafeAreaView style={{flex: 1, width: '90%'}}>
        <View style={{
          flex: 2, 
          alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{height: 30, width: 40}}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../assets/ic_back_w.png')} 
              style={{
                width: 40, 
                height: 30, 
                marginTop: 20,
                // position: 'absolute', 
                // left: 0,
                // top: 20
                }} />
          </TouchableOpacity>
        </View>
      
        <View style={{
          flex: 6, 
          alignItems: 'center'}}>
          <Image 
            source={require('../assets/logo_white_2.png')} 
            style={{
              width: 150, 
              height: 170, 
              marginTop: 0}} />
        </View>
        
        <View 
          style={{
            flex: 1, 
            alignItems: 'center'}}>
          <Text 
            style={{
              color: '#fff', 
              fontSize: 18}}>Log in as a job seeker</Text>
        </View>

        <View 
          style={{
            flex: 3, 
            alignItems: 'center'}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}>
            <SafeAreaView>
              <View style={{ marginTop: 22 }}>
                <View>
                  <FlatList
                    // ItemSeparatorComponent={<Separator />}
                    data={countries}
                    keyExtractor={(item) => item.code}
                    renderItem={({item, index, separators}) => (
                      <TouchableHighlight
                        key={index}
                        onPress={() => _onPress(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{backgroundColor: 'white'}}>
                          <View style={{
                            flex: 1, 
                            flexDirection: 'row', 
                            justifyContent:'space-between', 
                            padding: 10, 
                            borderBottomWidth: 1, 
                            borderBottomColor: '#eee',
                            
                            }}>
                            <Text style={{
                              fontSize: 20, 
                              color: '#222'}}>{item.name}</Text>
                            <Text style={{
                              fontSize: 20, 
                              color: '#666'}}>+{item.dial_code}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    )}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        
          
          <TouchableOpacity style={styles.code} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/ic_call-1.png')} style={{width: 20, height: 20, marginRight: 5}} />
            <Text style={{color: '#fff'}}>+{phCode}</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableOpacity 
          style={{width:'100%', backgroundColor: '#fff', paddingTop: 12, paddingBottom: 12, borderRadius: 10, backgroundColor: '#fff'}}
          onPress={() => handleLogin()}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#4834A6'}}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 3, alignItems: 'center'}}>
          <Text
              style={{
                marginLeft: 6, 
                color: '#fff', 
                textDecorationLine: 'underline', 
                fontSize: 16}}
              onPress={() => navigation.navigate('ForgotPassword')}
            >Forgot you password?</Text>
        </View>

        <View style={{
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'center'}}>
          <Text style={{
            color: '#fff', 
            fontSize: 16}}>Dont have an account yet?</Text>
          <Text
            style={{
              marginLeft: 6, 
              color: '#fff', 
              textDecorationLine: 'underline', 
              fontSize: 16}}
            onPress={() => navigation.navigate('SeekerSignup')}
            >Sign up</Text>
        </View>
        
        <View style={{flex: 3, alignItems: 'center'}}></View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SeekerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'flex-start'
  },
  code: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    color: '#fff',
    width: 80,
    height: 40
  }
});