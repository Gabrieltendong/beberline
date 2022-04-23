import React, { useContext, useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { View, Text, TextInput, TouchableOpacity,  } from 'react-native'
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { io } from 'socket.io-client';
import { Alert } from 'react-native';
import { GlobalContext } from '../context/provider';

const TestDriver = () => {

    const { driverState: { isBusy, currentDrive } } = useContext(GlobalContext)

    const [Message, setMessage] = useState('')
    const [userTyping, setUserTyping] = useState('')
    const [ list, setList ] = useState([]);
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
    const [ modalVisible, setModalVisible ] = useState(false)



    useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            const { coords: { latitude, longitude } } = location;
            setLocation({
                ...loc, 
                curLoc: { 
                    latitude, 
                    longitude, 
                    latitudeDelta: 0.002, 
                    longitudeDelta: 0.005 
                }
            });
          })();
        const socket = io("http://192.168.239.202:8080");
        console.log(``, )
        socket.on('driverRequest', msg => {
            setModalVisible(!modalVisible)
            setList([...list, msg])
        })
    }, [])

    const _onSubmit = ()=>{
    const socket = io("http://192.168.239.202:8080");

        socket.on('connect', ()=>{
            socket.emit('rideRequest', Message)
        })
        socket.on('userTyping', msg=>{
            setUserTyping(msg)
        })
    }

    const { curLoc, coordinate, time, distance} = loc;


    const messages = list.map((chat)=> (<Text>{chat}</Text>))
    const Map = ()=> {
        return(
            <MapView 
                initialRegion={curLoc}
                style={[StyleSheet.absoluteFillObject]}
                showsUserLocation
                provider = { PROVIDER_DEFAULT }
             >

            </MapView>
        )
    }

    return (
        <View style = {{ flex: 1 }} >
            <Text style = {{ width: '100%', textAlign: 'center' }} >Socket Test</Text>
            <View style = {{ height: '75%', alignItems: 'center', }} >
                <Map />
            </View>
            <TextInput onChangeText = { (val)=> {
                setMessage(val)
            } } placeholder = '\Enter message here' style = {{ width: '100%', borderRadius: 6, borderColor: '#c0c0c0', height: 56, borderWidth: 1 }} /> 
            <TouchableOpacity onPress = { ()=> _onSubmit() } style = {{ padding: 20, backgroundColor: 'violet', alignItems: 'center', justifyContent: 'center'}} >
                <Text>
                    send
                </Text>
            </TouchableOpacity>
            <Modal
                    animationType="slide"
                    transparent = {true}
                    visible={modalVisible}
                    style = {{ alignItems: 'center', justifyContent: 'center' }}
                 >
                    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <View style = {{ backgroundColor: '#ffff', padding: 20, width: '85%', elevation: 3, borderRadius: 15 }} >
                            <Text style = {{ textAlign: 'center', fontSize: 28, color: '#d1d1d1d1' }} >
                                Configurer Votre Paypal
                            </Text>
                           
                            <TouchableOpacity onPress = { ()=> {
                               
                            } } style={{ alignSelf: 'center', width: '35%', backgroundColor: '#1e90ff', alignContent: 'center', padding: 6, borderRadius: 10, marginVertical: 5, alignItems: 'center' }} >
                                <Text style = {{ fontSize: 18, color: 'white' }} >
                                    Enregistrer
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = { ()=> {
                              setModalVisible(!modalVisible)
                            } } style={{ alignSelf: 'center', alignContent: 'center', padding: 6, borderRadius: 10, marginVertical: 5, alignItems: 'center', position: 'absolute', right: 10 }} >
                                <Text style = {{ fontSize: 18, color: 'red' }} >
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        </View>
    )
}

export default TestDriver
