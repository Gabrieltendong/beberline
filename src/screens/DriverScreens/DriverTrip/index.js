import { useRoute } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/Common/CustomButton'
import Icon from '../../../components/Common/Icon'
import * as Location from 'expo-location';
import {
     getFirestore, 
     collection,
     doc,
     query,
     updateDoc,
     getDocs,
     getDoc,
     where,
     onSnapshot

} from "firebase/firestore";
import styles from './styles'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_API } from '../../../constants/GOOGLE_API'
import { GlobalContext } from '../../../context/provider'
import colors from '../../../assets/themes/colors'
import { DRIVER_BON } from '../../../constants/routes'
import { addDriverToCommand } from '../../../context/actions/driverActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showSuccess } from '../../../helpers/flashMessage'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('window')
//codex_
const DriverTrip = ({navigation}) => {

    const [location, setLocation] = useState({});
    const [accepted, setAccepted] = useState(false);
    const [isAtPickLoc, setIsAtPickLoc] = useState(false);
    const [ userData, setUserData ] = useState();
    const [isAtDropLoc, setIsAtDropLoc] = useState(false);
    const [commandID, setCommandID] = useState();
    const [load, setLoading] = useState(false);

    const { t, i18n } = useTranslation();

    const { params } = useRoute()

    const { driverStateDispatch, driverState: { currentDrive, loading, isBusy } } = useContext(GlobalContext);
    const {  authState: { driverData } } = useContext(GlobalContext);
    
        //init services
const db = getFirestore()

//collection ref
const  colRef = collection(db, 'command')

    const origin = {
        latitude: Number(currentDrive?.adresse_depart?.latitude),
        longitude: Number(currentDrive?.adresse_depart?.longitude),
        latitudeDelta: 0.02,
        longitudeDelta: 0.01 
    }
    const destination = {
        latitude: Number(currentDrive?.adresse_arrive?.latitude),
        longitude: Number(currentDrive?.adresse_arrive?.longitude),
        latitudeDelta: 0.02,
        longitudeDelta: 0.01 
    }


    //uncomment this code later
    const getDocu = ()=> {

        let q = query(colRef, where("command_id", "==", "2"));
        setLoading(true)
        getDocs(colRef)
        .then((doc)=>{
            if ( !doc.empty ) {
                doc.docs.map((doc)=> {
               if ( doc.data().command_id == `${params.item.id}` ) {
                    setCommandID(doc.id)
                    setLoading(false)
               }
            })
            } else{
                console.log('empty');
            }
        })
        .catch((err)=> {
            console.log(`err`, err.message)
        })
    }


    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('chauffeur');
            if (user) {
               let User = JSON.parse(user);
               setUserData(User)
            }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    const checkDistance = (distance)=> {
        if ( distance <= 0.1 ) {
            if ( isAtPickLoc ) {
                //Here the trip ends
                let docRef = doc(db, 'command', commandID)
                console.log(commandID);
                updateDoc(docRef, {
                    trip_completed: true,
                })
                .catch((err)=> {
                    console.log(err.message);
                })
            } else {
                setIsAtPickLoc(true)
                //send notif to user of driver reach
                let docRef = doc(db, 'command', commandID)
                console.log(commandID);
                updateDoc(docRef, {
                    driver_at_pickLoc: true,
                })
                .catch((err)=> {
                    console.log(err.message);
                })
            }
        }
    }
    
      const fetchDistanceTime = (dist, time)=> {
        setLoc ({
            ...loca,
            time: time,
            distance: dist
        })
    }

    const setDriverPosition = () => {
        addDriverToCommand(params.item.id, userData?.user?.id)(driverStateDispatch);
        // setIsAtPickLoc(!isAtPickLoc)
        let docRef = doc(db, 'command', commandID)
        console.log(commandID);
        updateDoc(docRef, {
            driver_id: userData?.user?.id,
            active: true,
        })
        .catch((err)=> {
            console.log(err.message);
        })
    }

    const [loca, setLoc] = useState({
        time: 0,
        distance: 0
    });

    const mapRef = React.useRef();


    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.9222;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    useEffect(() => {
        getUser();
        let isMounted = true;
        if (isMounted) {
            (async () => {
                getDocu();
                onSnapshot(colRef, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            // console.log("New city: ", change.doc.data());
                        }
                        if (change.type === "modified") {
                            if ( change.doc.data().command_id == currentDrive.id ) {
                                if ( change.doc.data().paymentMade == true ) {
                                    showSuccess(t('ReceivedPayment'))
                                    navigation.goBack();
                                }
    
                            }
                            // alert('data added')
                            
                            // console.log("Modified city: ", change.doc.data());
                        }
                        if (change.type === "removed") {
                            // console.log("Removed city: ", change.doc.data());
                        }
                    });
                });
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  setErrorMsg('Permission to access location was denied');
                  return;
                }
                let location = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 0.01, mayShowUserSettingsDialog: true },  loc => {
                    if ( isBusy ) {
                        let docRef = doc(db, 'command', commandID)
                        console.log(commandID);
                        updateDoc(docRef, {
                            driver_position: {
                                "latitude": loc.coords.latitude,
                                "longitude": loc.coords.longitude 
                            }
                        })
                        .catch((err)=> {
                            console.log(err.message);
                        })
                    }
                    setLocation(loc);
                })
              })();
        }
        return () => isMounted = false;
    }, [commandID, currentDrive]);


    const { time, distance} = loca;


    const { latitude, longitude } = location?.coords ? location.coords  : {}

    const TripTopAddress = () => {
        return(
            <View  style = { styles.addressWrapper } >
                <View style ={{opacity: 0}} >
                    <Icon iconType = 'materialcommunityicons' name = 'chevron-triple-up' size = {28} color = '#a0a0a0a0' />
                </View>
                <View>
                    <Text style = {styles.addressText} >
                        {
                            isAtPickLoc ? t('PickLoc') : t('DropLoc')
                        }
                    </Text>
                    <Text style = {styles.address} >
                        { 
                            Object.values(currentDrive).length > 1 ? isAtPickLoc ? currentDrive?.adresse_arrive.address : currentDrive?.adresse_depart.address : <ActivityIndicator size={'small'} animating color={'#1e90ff'} />
                        }
                    </Text>
                </View>
                <View style = { styles.iconDirection } >
                    <Icon iconType = 'materialcommunityicons' name = 'chevron-triple-up' size = {22} color = '#a0a0a0a0' />
                </View>
            </View>
        )
    }

    const BottomTripInfo = ()=> {
        return(
            <View style = { styles.bottomWrapper } >
                <View style = {{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }} >
                <Text style = { styles.headerText } >
                    { t('PickPoint') }
                </Text>
                <TouchableOpacity onPress={ ()=> navigation.navigate(DRIVER_BON, { distance }) } >
                    <Text style = {[ styles.headerText, { color: colors.secondary } ]} >
                        
                    </Text>
                </TouchableOpacity>
                </View>
                
                <View style = {styles.sheetContent} >
                    <Image style = {{ width: 45, height: 45 }} source = { require('../../../assets/images/user.png') } />
                    <View style ={styles.rideInfo} >
                        <View style = { styles.footerRow } >
                            <Text style = { styles.textFooter } >
                              { t('ClientName') }:  { params?.item ? params?.item.customer.user.first_name : ( <ActivityIndicator animating color = '#a6a6a6a6' /> ) }
                            </Text>
                            <Text style = { styles.textIndice } >
                               { t('RideTime') } {  Math.ceil( loca.time )} min
                            </Text>
                        </View>
                        <View style = { styles.footerRow } >
                            <Text style = { styles.textFooter } >
                                { t('Distance') }
                            </Text>
                            <Text style = { styles.textIndice } >
                            { ( loca.distance )} Km
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    isBusy ?
                    <CustomButton loading={ loading} disabled={ load || loading} primary  title = { t('Start') }  /> : 
                    <CustomButton loading={ load || loading} disabled={ load || loading} primary  title = { t('AcceptRide') }  onPress = { ()=> { setDriverPosition() } } />
                }
            </View>
        )
    }


    const markers = [
        {
            coordinate: {
            latitude: Number(currentDrive?.adresse_depart?.latitude),
            longitude: Number(currentDrive?.adresse_depart?.longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.01 
                        },
            title: 'Point de depart'
        },
        {
            coordinate: {
            latitude: Number(currentDrive?.adresse_arrive?.latitude),
            longitude: Number(currentDrive?.adresse_arrive?.longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.01 
                        },
            title: 'Point de d`arriver'
        },
        {
            coordinate: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01 
                        },
            title:  t('YourPosition') 
        },
    ]
    
    return (
        <SafeAreaView style = {styles.Container} >
            <MapView
                ref={ mapRef }
                initialRegion = {{
                latitude: latitude, 
                longitude: longitude,  
                latitudeDelta: 0.02,
                longitudeDelta: 0.01 }}
                followUserLocation 
                showsUserLocation 
                style = {{...StyleSheet.absoluteFillObject}} >
               {
                   Object.values(currentDrive).length > 1 ? 
                        isAtPickLoc ? (<Marker
                                    coordinate = {{
                                    latitude: Number(currentDrive?.adresse_arrive?.latitude),
                                    longitude: Number(currentDrive?.adresse_arrive?.longitude),
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.01 
                                    }}
                                    title = { currentDrive?.adresse_arrive ? currentDrive?.adresse_arrive?.address : (<ActivityIndicator animating color = '#a6a6a6a6' />) }
                                />
                                ) : (
                            <Marker
                            coordinate = {{
                            latitude: Number(currentDrive?.adresse_depart?.latitude),
                            longitude: Number(currentDrive?.adresse_depart?.longitude),
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01 
                        }}
                        title = { currentDrive?.adresse_depart ? currentDrive?.adresse_depart?.address : (<ActivityIndicator animating color = '#a6a6a6a6' />) }
                        /> 
                        
                        ) : null
               
               }
               {
                   Object.values(location).length > 1 ? (
                    <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.01 
                    }}
                    title= { t('YourPosition') }
                />
                   ) : null
               }

                    {
                        Object.values(location).length > 1 ? (
                            
                    <MapViewDirections
                        origin={{
                            latitude: latitude, 
                            longitude: longitude,  
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.081 } }
                            lineDashPattern={[1]}
                            language='fr'
                            destination={ isAtPickLoc ? destination : origin }
                            apikey={GOOGLE_API}
                            strokeWidth={3}
                            strokeColor="dodgerblue"
                            resetOnChange = {false}
                            optimizeWaypoint = {true}
                            onReady = { result => {
                                checkDistance(result.distance);
                                fetchDistanceTime(result.distance, result.duration)
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                })
                            } }
                    />
                        ) : null
                    }
                
                
            </MapView>
            <TripTopAddress />
            <BottomTripInfo />
        </SafeAreaView>
    )
}

export default DriverTrip
