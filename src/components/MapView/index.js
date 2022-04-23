import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import MapView, { AnimatedRegion, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from '../../constants/GOOGLE_API';
import styles from './styles';
import { GlobalContext } from '../../context/provider';
import { LocationPermission } from '../../helpers/geolocation';
import BottomSheet from '../Common/BottomSheet';
import * as Location from 'expo-location';
import colors from '../../assets/themes/colors';
import { clearCommandState, getCommandDateTime, getOrder, setReservationDateTime } from '../../context/actions/commandActions';
import { useFocusEffect } from '@react-navigation/core';
import { io } from 'socket.io-client';
import Icon from '../Common/Icon';
import {
     getFirestore, 
     collection,
     getDocs,
     addDoc, onSnapshot,
     query,
     updateDoc, doc

} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({ navigation }) => {

    const { authState: { data } } = useContext(GlobalContext);

    const { t, i18n } = useTranslation();
    const [location, setLocation] = useState({
        curLoc: {},
        coordinate: new AnimatedRegion({
            latitude: 48.8566 ,
            longitude: 2.3522 , 
            latitudeDelta: 0.02,
            longitudeDelta: 0.01 
        }),
        time: 0,
        distance: 0
    });
    const [modalVisible, setModalVisible] = useState(false)
    const [ useCurrentPosition, setUseCurrentPosition ] =  useState(true)
    const [ id, setId ] = useState()
    const [ loadMap, setLoadMap ] = useState(false)

        //init services
const db = getFirestore()

//collection ref
const  colRef = collection(db, 'command')

const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('client');
        if (user) {
           let User = JSON.parse(user);
            console.log(`user`, User)
        }
    } catch (error) {
        console.log(`error`, error)
    }
}

const getCurrentCommand = async () => {
    try {
        const id = await AsyncStorage.getItem('current_order_id');
        if (id) {
           let ID = JSON.parse(id);
           setId(ID)
            console.log(`command_id`, ID)
        }
    } catch (error) {
        console.log(`error`, error)
    }
}

    console.log('data :>> ', data);

    useFocusEffect(
        React.useCallback(()=>{
            getUser()
        }, [fetch]),
    )

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            // const socket = io('wss://be-berline.herokuapp.com/client/:8080')
           (async () => {
            getCurrentCommand();
            onSnapshot(colRef, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                    }
                    if (change.type === "modified") {
                        let  dat = change.doc.data();
                        console.log('dat :>> ', dat);
                        if ( (change.doc.data().client_id == data.user.id) && change.doc.data().driver_position == null ) {
                            getOrder(change.doc.data().command_id)(commandDispatch);
                            // setDriverPosition({
                            //     latitude: change.doc.data().driver_position?.latitude ,
                            //     longitude: change.doc.data().driver_position?.longitude 
                            // })   
                            setModalVisible(!modalVisible)
                            console.log('here and always');
                        }
                        
                        // console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                    }
                });
                });
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg(' Permission pas acquise ');
                    return;
                }
                if ( status == 'granted' ) {
                    let loc = await Location.getCurrentPositionAsync({});
                    setLocation(prev => {
                        return {...prev, curLoc: {
                            latitude: loc.coords.latitude,
                            longitude: loc.coords.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01 
                        }}
                    })
                    console.log(location.curLoc);
                }
              })();
        }
        return () => isMounted = false;
    }, []);

    const handleExpandPress = useCallback(() => {
        bottomSheetRef.current?.expand();
        console.log('here');
      }, []);

    const mapLoaded = ()=> {

        if ( Object.values(curLoc).length > 2 ) {
            setLoadMap(true)
        } else {
            
        }

    }

    const Animate = ( latitude, longitude ) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
        if (markerRef.current) {
            markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
        }
    } else {
        coordinate.timing(newCoordinate).start();
    }  
    }

    const fetchDistanceTime = (dist, time)=> {
        setLocation ({
            ...location,
            time: time,
            distance: dist
        })
    }

    

    const { authState: { userType } } = useContext(GlobalContext);
    const { commandState: { pickUp, drop, }, commandDispatch } = useContext(GlobalContext)
    const { curLoc, coordinate, time, distance} = location;
    const origin = {
        latitude: Number(pickUp.latitude),
        longitude: Number(Number(pickUp.longitude).toFixed(7)),
        latitudeDelta: 0.02,
        longitudeDelta: 0.01 
    }
    const destination = {
        latitude: Number(drop.latitude),
        longitude: Number(Number(drop.longitude).toFixed(7)),
        latitudeDelta: 0.02,
        longitudeDelta: 0.01 
    }

    const depart = `${pickUp.latitude},${pickUp.longitude}`
    const dest = `${drop.latitude},${drop.longitude}`
    


    const mapRef = React.useRef();
    const markerRef = useRef()


    const bottomSheetRef = useRef();

    return (
        <View style = { styles.conatiner } >
            <View style = {{ flex: 1 }} >
                {
                    Object.values(curLoc).length > 1 ? 
                    (
                        <MapView 
                            ref = {mapRef}
                            style = {[StyleSheet.absoluteFill]}
                            initialRegion={curLoc}
                            showsMyLocationButton
                            showsUserLocation
                        >
                            {
                                useCurrentPosition ? (
                                    <Marker
                                        // ref = {markerRef}
                                        coordinate = {curLoc}
                                        title = { t('YourPosition') }
                                    />
                                ) : drop?.address ? (
                                    <Marker
                                coordinate = {origin}
                                title = { pickUp.address }
                                    />
                                ) : null
                            }

                            

                            {
                                drop?.address ? (
                                    <Marker
                                coordinate = {destination}
                                title = { drop.address }
                                icon={10}
                                    />
                                ) : null
                            }
                            {
                                drop?.address ? (
                                    
                            <MapViewDirections
                                origin= {depart}
                                lineDashPattern={[0]}
                                destination={dest}
                                apikey={GOOGLE_API}
                                strokeWidth={3}
                                strokeColor="dodgerblue"
                                optimizeWaypoint = {true}
                                onReady = { result => {
                                    // console.log(`Distance: ${result.distance}`);
                                    // console.log(`Time: ${result.duration}`);
                                    fetchDistanceTime(result.distance, result.duration)
                                    getCommandDateTime(result.distance, result.duration)(commandDispatch)
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
                    ) : 
                    (
                        <MapView 
                            ref = {mapRef}
                            style = {[StyleSheet.absoluteFill]}
                            provider = { PROVIDER_GOOGLE } 
                            initialRegion={curLoc}
                            showsMyLocationButton
                            showsUserLocation
                        >
                        </MapView>
                    )
                }
                <BottomSheet navigation = { navigation } useCurrentPosition = {useCurrentPosition} setUseCurrentPosition = { setUseCurrentPosition } bottomSheetRef = { bottomSheetRef } />
                <Modal navigation = { navigation } modalVisible={modalVisible} setModalVisible={ setModalVisible } />
            </View>
        </View>
    )
}

export default Map
