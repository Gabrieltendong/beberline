import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'

import { GOOGLE_API } from '../../constants/GOOGLE_API'
const GooglePlacesInput = ({fetchAddressDetails, placeholderText, useCurrentPosition }) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const onPress = (data, details)=>{
        const lat = details.geometry.location.lat;
        const lng = details.geometry.location.lng;
        const name = details.formatted_address;
        fetchAddressDetails(lat,lng,name);
        
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }

            let location = await Location.getCurrentPositionAsync({});
            Location.installWebGeolocationPolyfill();
            setLocation(location);
      
          })();
    }, [1])

  return (
        <View style = {{ flex: 1,}} >
            <GooglePlacesAutocomplete
                currentLocation = {useCurrentPosition}
                currentLocationLabel = { useCurrentPosition ? ' Utiliser position actuelle ' : '' }
                placeholder= {placeholderText}
                fetchDetails = {true}
                onPress={onPress}
                query={{
                    key: GOOGLE_API,
                    language: 'fr',
                }}
                styles={{
                        textInputContainer: {
                        backgroundColor: '#ffffff',
                        marginVertical: 4
                        },
                        textInput: {
                        height: 48,
                        color: '#5d5d5d5d',
                        backgroundColor: '#e8e8e8e8',
                        fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb',
                        },
                    }}
            />
        </View>
  );
};

export default GooglePlacesInput;