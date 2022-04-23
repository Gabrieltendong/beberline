import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView,  } from 'react-native'
import {
     getFirestore, 
     collection,
     getDocs,
     addDoc, onSnapshot,
     query,
     updateDoc, doc

} from "firebase/firestore";
import { io } from 'socket.io-client';
import { getData } from '../servers/firebase';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

const TestClient = ({navigation}) => {

    const [Message, setMessage] = useState('')
    const [location, setLocation] = useState({});
    const [ driverPosition, setDriverPosition ] = useState({
        latitude: 0,
        longitude: 0
    })
    const [ list, setList ] = useState([]);
    const [  commandID, setCommandID ] = useState(undefined)

    //init services
const db = getFirestore()

//collection ref
const  colRef = collection(db, 'command')

//get collection data 
const getData = ()=> {

}

//  useEffect(() => {
//         let isMounted = true;
//         if (isMounted) {
//             (async () => {
//                 let { status } = await Location.requestForegroundPermissionsAsync();
//                 if (status !== 'granted') {
//                   setErrorMsg('Permission to access location was denied');
//                   return;
//                 }
//                 let location = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 0.01, mayShowUserSettingsDialog: true },  loc => {
//                     if ( typeof(commandID) != 'undefined' ) {
//                         let docRef = doc(db, 'command', commandID)
//                         console.log(commandID);
//                         updateDoc(docRef, {
//                             driver_id: 1,
//                             active: true,
//                             driver_position: {
//                                 "latitude": loc.coords.latitude,
//                                 "longitude": loc.coords.longitude 
//                             }
//                         })
//                         .then(()=>{
//                             console.log('updated');
//                         })
//                         .catch((err)=> {
//                             console.log(err.message);
//                         })
//                     }
//                 })
//                 console.log(`location`, location)
//                 const { coords: { latitude, longitude } } = location;
//                 setLocation({
//                     ...loc, 
//                     curLoc: { 
//                         latitude, 
//                         longitude, 
//                         latitudeDelta: 0.02, 
//                         longitudeDelta: 0.01 
//                     }
//                 });
//               })();
//         }
//         return () => isMounted = false;
//     }, []);

useEffect(() => {
        let isMounted = true;
        if (isMounted) {
           (async () => {
            onSnapshot(colRef, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New city: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        // alert('data added')
                        setDriverPosition({
                            latitude: change.doc.data().driver_position?.latitude ,
                            longitude: change.doc.data().driver_position?.longitude 
                        })
                        console.log("Modified city: ", driverPosition);
                    }
                    if (change.type === "removed") {
                        console.log("Removed city: ", change.doc.data());
                    }
                });
                });
              })();
        }
        return () => isMounted = false;
    }, []);

//    const _onSubmit = ()=>{
//         const socket = io("http://192.168.239.202:8080");

//         socket.on('connect', ()=>{
//             socket.emit('rideRequest', Message)
//         })
//         setMessage('')
//     }

    // useEffect(() => {
    // const socket = io("http://192.168.239.202:8080");

    //     socket.on('driverRequest', msg => {
    //         setList([...list, msg])
    //     })
    // }, [])

    // useFocusEffect(
    //     React.useCallback(()=>{
    //         onSnapshot(colRef, (snapshot)=> {
    //     snapshot.docs.forEach((doc)=>{
    //         setList( prev => {
    //             return [...prev, {...doc.data(), id: doc.id}]
    //         })
    //     })
    //     console.log('list :>> ', list);
    // })
    //     }, []),
    // )

    const messages = list.map((chat)=> (<Text>{chat.command_id} </Text>))

    return (
        <View style = {{ flex: 1, paddingTop: 30 }} >
            <TouchableOpacity onPress = {()=> navigation.toggleDrawer() } style = {{ marginVertical: 10, position: 'absolute', top: 15, left: 10 }} >
                <Text>
                    drawer
                </Text>
            </TouchableOpacity>
            <Text style = {{ width: '100%', textAlign: 'center' }} >Socket Test</Text>
            <View style = {{ height: '75%', alignItems: 'center', justifyContent: 'flex-end' }} >
            <ScrollView>
                <Text>
                    { driverPosition.latitude }
                </Text>
                <Text>
                    { driverPosition.longitude }
                </Text>
            </ScrollView>
            </View>
            <TextInput value = {Message} onChangeText = { (val)=> {
                const socket = io("http://192.168.239.202:8080");
                setMessage(val)
                socket.emit('userTyping', 'user is writing')
            } } placeholder = '\Enter message here' style = {{ width: '100%', borderRadius: 6, borderColor: '#c0c0c0', height: 56, borderWidth: 1 }} /> 
            <TouchableOpacity onPress = { ()=> _onSubmit() } style = {{ padding: 20, backgroundColor: 'violet', alignItems: 'center', justifyContent: 'center'}} >
                <Text>
                    send
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TestClient
