import {AsyncStorage} from 'react-native';

export async function getUser() {
  try {
    const user = await AsyncStorage.getItem('currentUser')
    if(user !== null) {
      return user
    }
  } catch(e) {
    console.log('currentUser didn\'t get');
  }
}

export async function setUser(user) {
  try {
    await AsyncStorage.setItem('currentUser', user)
  } catch(e) {
    console.log('currentUser didn\'t set');
  }
}