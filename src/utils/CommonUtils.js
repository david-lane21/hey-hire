import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
class CommonUtil {
  constructor() {
    // this.deviceTokenSet();
  }

  deviceToken;
  lat = 32.7767;
  long = -96.797;

  deviceTokenSet = async () => {
    if (Platform.OS === "ios") {
      const register = await messaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken(undefined, "*");
    this.deviceToken = token;
  };
  
  getDeviceToken = async () => {
    const token = await messaging().getToken();
    return token;
  };

  setLocation(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  distance(lat2, lon2, unit) {
    var R = 3958.8; // Radius of the Earth in miles

    const lat1 = this.lat;
    const lon1 = this.long;
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
      var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
      var difflat = rlat2 - rlat1; // Radian difference (latitudes)
      var difflon = (lon2 - lon1) * (Math.PI / 180); // Radian difference (longitudes)

      var d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );
      return d.toFixed(1);
    }
  }
}
export default new CommonUtil();
