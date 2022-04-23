import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';

export const LocationPermission = new Promise( async ( resolve, reject ) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if ( permissionStatus === 'granted' ) {
                return resolve('granted')
            }
            reject('Permission not granted')
        } catch (error) {
            return reject(error)
        }
    } 
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted)=> {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted')
        }
        return reject('Location permission denied');
    }).catch((error)=>{
        console.log('Ask Location permission error', error);
        return reject(error)
    });
} );