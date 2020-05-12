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


export async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token')
    if(token !== null) {
      return token
    }
  } catch(e) {
    console.log('token didn\'t get');
  }
}

export async function setToken(token) {
  try {
    await AsyncStorage.setItem('token', token)
  } catch(e) {
    console.log('token didn\'t set');
  }
}