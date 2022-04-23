import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import { Fontisto, Entypo } from '@expo/vector-icons'; 
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from '../../constants/GOOGLE_API';
import colors from '../../assets/themes/colors'
import CustomButton from '../Common/CustomButton';
import { Rating, AirbnbRating } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler'
import Container from '../Common/Container'
import { GlobalContext } from '../../context/provider';
import {
    getFirestore, 
    collection,
    getDocs,
    addDoc, onSnapshot,
    query,
    updateDoc, doc

} from "firebase/firestore";
import Input from '../Common/Input';
import { payNw } from '../../context/actions/commandActions';
import { showSuccess } from '../../helpers/flashMessage';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');


const OnTripComponent = ({onChange, onSubmit, setForm, form, errors, setErrors,}) => {

    const { authState: { data } } = useContext(GlobalContext);
    const { commandState: { currentDrive, currentDriveShipping, loading, driverAtPickLoc, payNow, payComplete }, commandDispatch } = useContext(GlobalContext)
    
    const [payment, setPayment] = useState(false)
    const [expDate, setExpDate] = useState('');
    const [cvc, setCVC] = useState('');
    const [ cardNumber, setCardNumber ] = useState('');
    const [ driverPosition, setDriverPosition ] = useState({
        latitude: 0,
        longitude: 0
    })
    const db = getFirestore()

    //collection ref
    const  colRef = collection(db, 'command')
    //translation
    const { t, i18n } = useTranslation();

    const [value, setVal] = useState('')
    const [ driverLoc, setDriverLoc ] = useState(false)
    const [loc, setLocation] = useState({
        curLoc: {},
        // coordinate: new AnimatedRegion({
        //     latitude: 48.8566 ,
        //     longitude: 2.3522 , 
        //     latitudeDelta: 0.02,
        //     longitudeDelta: 0.01 
        // }),
        time: 0,
        distance: 0
    });
    const origin = {
        latitude: Number(currentDriveShipping?.adresse_depart?.latitude),
        longitude: Number(currentDriveShipping?.adresse_depart?.longitude),
        latitudeDelta: 0.02,
        longitudeDelta: 0.01 
    }
    const destination = {
        latitude: Number(currentDriveShipping?.adresse_arrive?.latitude),
        longitude: Number(currentDriveShipping?.adresse_arrive?.longitude),
        latitudeDelta: 0.02,
        longitudeDelta: 0.01 
    }

    const depart = `${currentDriveShipping?.adresse_depart?.latitude},${currentDriveShipping?.adresse_depart?.longitude}`
    const dest = `${currentDriveShipping?.adresse_arrive?.latitude},${currentDriveShipping?.adresse_arrive?.longitude}`

    // {
    //     "id": 16,
    //     "adresse_depart": {
    //         "id": 16,
    //         "address": "Unnamed Road, Douala, Cameroun",
    //         "date": null,
    //         "latitude": "4.096419899999999",
    //         "longitude": "9.7491131"
    //     },
    //     "adresse_arrive": {
    //         "id": 16,
    //         "address": "Douala, Cameroun",
    //         "latitude": "4.0963278",
    //         "longitude": "9.7362972"
    //     },
    //     "city": "",
    //     "contry": "France",
    //     "active": false
    // }

    useEffect(() => {
        (async () => {
            onSnapshot(colRef, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                    }
                    if (change.type === "modified") {
                        if ( change.doc.data().client_id == data.user.id ) {
                            setDriverPosition({
                                latitude: change.doc.data().driver_position?.latitude ,
                                longitude: change.doc.data().driver_position?.longitude 
                            })   

                        }
                        if ( change.doc.data().trip_completed == true ) {
                             payNw()(commandDispatch)
    
                        } 
                        if ( change.doc.data().driver_at_pickLoc == true ) {
                            //here we must set a state to change markers
                            showSuccess(t('DriverAtPickLoc'))
                        } 
                        
                        
                    }
                    if (change.type === "removed") {
                    }
                });
                });
            let location = await Location.getCurrentPositionAsync({});
            const { coords: { latitude, longitude } } = location;
            setLocation({
                ...loc, 
                curLoc: { 
                    latitude: latitude , 
                    longitude: longitude , 
                    latitudeDelta: 0.002, 
                    longitudeDelta: 0.005 
                }
            });
          })();
    }, [])

    const checkCardNumberType = (value)=> {
        var dilt = value.split('');
        let first_digit = dilt[0];


        if ( first_digit == 4 ) {
            setErrors((prev) => {
                return { ...prev, card_number: null }
            })
        }

        if ( first_digit == 5 ) {
            setErrors((prev) => {
                return { ...prev, card_number: null }
            })
        }

        if ( first_digit != 4 && first_digit != 5 ) {
            setErrors((prev) => {
                return { ...prev, card_number: t('ErrCardType') }
            })
        }

        if ( value == '' ) {
            setErrors((prev) => {
                return { ...prev, card_number: t('ErrObligatory') }
            })
        }

    }

    const validateExpDate = (value) => {
       
            var split_date = value.split("-")
            let day = split_date[0];
            let year = split_date[1];

            if ( day > 12 ) {
                console.log('error');
                setErrors((prev) => {
                    return { ...prev, exp_date: t('InvalidDate') }
                })
            }

            if ( year > 2035 ) {
                setErrors((prev) => {
                    return { ...prev, exp_date: t('InvalidDate') }
                })
            }

        
    };

    const onComplete = ()=> {
        setCVC('');
        setCardNumber('');
        setExpDate('');
     }

    const onChangeA = (val)=> {
        setVal(val)
    }

    const onSubmitA = ()=>{
        setVal('');
    }

    const checkDistance = (distance)=> {
        if ( distance <= 0.1 ) {
            if ( driverAtPickLoc ) {
                //Here the trip ends
                
            } else {
               
            }
        }
    }
    
    const fetchDistanceTime = (dist, time)=> {
        setLocation ({
            ...loc,
            time: time,
            distance: dist
        })
    }

    const mapRef = React.useRef();
    const { curLoc, coordinate, time, distance} = loc;

    console.log('curLoc :>> ', curLoc);

    return (
        <View style = { styles.container } onPress = { ()=> Keyboard.dismiss() } >
        <Container>
            <View activeOpacity={1} style = { styles.mapWrapper } >
                <MapView 
                    style = {[StyleSheet.absoluteFill, { borderRadius: 15 }]}
                    initialRegion={curLoc}
                    ref={mapRef}
                >
                   {
                                currentDriveShipping?.id ? (
                                    <Marker
                                coordinate = {{
                                    latitude: driverPosition?.latitude,
                                    longitude: driverPosition?.longitude,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.01 
                                }}
                                title = {t('Driver')}
                                    />
                                ) : null
                    }

                    {
                   Object.values( currentDriveShipping ).length > 1 ? 
                        driverAtPickLoc ? (<Marker
                                    coordinate = {{
                                    latitude: Number(currentDriveShipping?.adresse_arrive?.latitude),
                                    longitude: Number(currentDriveShipping?.adresse_arrive?.longitude),
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.01 
                                    }}
                                    title = { currentDriveShipping?.adresse_arrive ? currentDriveShipping?.adresse_arrive?.address : (<ActivityIndicator animating color = '#a6a6a6a6' />) }
                                />
                                ) : (
                            <Marker
                            coordinate = {{
                            latitude: Number(currentDriveShipping?.adresse_depart?.latitude),
                            longitude: Number(currentDriveShipping?.adresse_depart?.longitude),
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01 
                        }}
                        title = { currentDriveShipping?.adresse_depart ? currentDriveShipping?.adresse_depart?.address : (<ActivityIndicator animating color = '#a6a6a6a6' />) }
                        /> 
                        
                        ) : null
               
               }

                     {
                            currentDriveShipping?.id ? (
                                    
                            <MapViewDirections
                                origin= {{
                                    latitude: driverPosition.latitude ,
                                    longitude: driverPosition.longitude , 
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.01 
                                }}
                                lineDashPattern={[0]}
                                destination={ driverAtPickLoc ? dest : depart }
                                apikey={GOOGLE_API}
                                strokeWidth={3}
                                strokeColor="dodgerblue"
                                optimizeWaypoint = {true}
                                onReady = { result => {
                                    // console.log(`Distance: ${result.distance}`);
                                    // console.log(`Time: ${result.duration}`);
                                    fetchDistanceTime(result.distance, result.duration)
                                    checkDistance(result.distance)
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
            </View>
            { payNow ? <CustomButton onPress={ () => setPayment(true) } primary title={t('PayNow')} /> : null }
            {/* <CustomButton onPress={ () => setPayment(true) } primary title={'Payer Maintenant'} /> */}
            {
                payment ? 
                <View style = { styles.cardWrapper } >
                <Text style = { styles.txtDesc } > {t('CardInfo')} </Text>
                <View style = { styles.card } >
                    <Input
                        iconPosition = 'right' 
                        label = {t('CardNumb')} 
                        value = { cardNumber }
                        keyboardType = 'numeric' 
                        onChangeText = { (value) => {
                            onChange({ name: "card_number", value }) 
                            setCardNumber(value)   
                            checkCardNumberType(value)    
                        } }
                        error = { errors.card_number }
                    />
                    <View style = { styles.cardDetails } > 
                    <View style = { styles.view } >
                        <Input 
                                label = {t('DateExp')} 
                                iconPosition = 'right' 
                                keyboardType = 'number-pad'
                                value={ expDate }
                                onChangeText = { (value) => {
                                    onChange({ name: "exp_date", value })
                                    setExpDate(value)
                                    validateExpDate(value)
                                } }
                                error = { errors.exp_date }
                            />
                    </View>
                    <View style = { styles.view } >
                        <Input 
                                label = { t('CVC') } 
                                iconPosition = 'right' 
                                keyboardType = 'numeric' 
                                secureTextEntry 
                                value = { cvc }
                                onChangeText = { (value) => {
                                    onChange({ name: "CVC", value })
                                    setCVC(value)
                                } }
                                error = { errors.CVC }
                            />
                    </View>
                    </View>
                    <CustomButton loading={loading} onPress = { ()=> {
                        onSubmit()
                        onComplete()
                    } } primary title={t('ConfirmPay')} />
                </View>
                </View> : null
            }
            <View style = { styles.cardWrapper } >
                <Text style = { styles.txtDesc } > {t('RateRide')} </Text>
                <View style = { styles.card } >
                    <TextInput value={value} onChangeText={ val => { onChangeA(val) } } style = {{ width: '95%', paddingHorizontal: 10, backgroundColor: 'rgba(0,0,0,0.1)' , borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 15, height: 100, marginVertical: 15, alignSelf: 'center' }} multiline placeholder = { t('RideNote') } />
                    <TouchableOpacity onPress={()=> onSubmitA()} style = {{ width: '85%', height: 75, borderRadius: 14, backgroundColor: colors.primary, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row',}} >
                        <Text style = {{ fontSize: 24, color: colors.secondary, fontWeight: '500' }} > { t('Submit') } </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = { styles.cardWrapper } >
                <Text style = { styles.txtDesc } > {t('DriverInfo')} </Text>
                <View style = { styles.card } >
                     <Image style = { styles.imgDriver } source={ require('../../assets/images/car-driver.jpg') } />
                     <Text style = { styles.txtInfo } > { t('Fname') }: { currentDrive?.order_service?.driver?.user?.first_name } { currentDrive?.order_service?.driver?.user?.last_name }</Text>
                </View>
            </View>
            <View style = { styles.cardWrapper } >
                <Text style = { styles.txtDesc } > { t('RideInfo') } </Text>
                <View style = { styles.card } >
                <View style = { styles.listCard } >
                    <View style = { styles.marker } >
                        <Fontisto name="map-marker" size={22} color="#66ff66" />
                        <Text style={ styles.textDest } >{ currentDriveShipping?.adresse_depart?.address }</Text>
                    </View>
                    <View style = { styles.marker } >
                        <Fontisto name="map-marker-alt" size={22} color="#ff4d4d" />
                        <Text style={ styles.textDest } >{ currentDriveShipping?.adresse_arrive?.address }</Text>
                    </View>
                    
                </View>
                </View>
            </View>
            {/*  
             */}
        </Container>
        </View>
    )
}

export default OnTripComponent
