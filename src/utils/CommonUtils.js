import messaging from '@react-native-firebase/messaging';

class CommonUtil {

    constructor() {
        // this.deviceTokenSet();
    }

    deviceToken;
  

    deviceTokenSet = async () => {

        const token = await  messaging().getToken();
       console.log('Coomon util',token);
        this.deviceToken = token;
    }

    
}
export default (new CommonUtil());