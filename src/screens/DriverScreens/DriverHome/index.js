import React, { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import Map from '../../../components/MapView'
import { useFocusEffect } from '@react-navigation/core';
import DriverRideList from '../../../components/RideList'
import BackgroundComponent from '../../../components/BackgroundComponent'
import styles from './styles'
import Modal from '../../../components/Modal'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/core'
import { getAllCommands } from '../../../context/actions/driverActions';
import { GlobalContext } from '../../../context/provider';

const DriverHome = ({ navigation }) => {

    const { navigate } = useNavigation();
    const [fetch, setFetch] = useState(true)
    const { driverStateDispatch, driverState: { commandList, loading  } } = useContext(GlobalContext);
    


    useEffect(() => {
        (async () => {
            setFetch(true)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
          })();
          return ()=> setFetch(false)
    }, [fetch])

    useFocusEffect(
        React.useCallback(()=>{
            getAllCommands()(driverStateDispatch)
        }, [fetch]),
    )

    const [modalVisible, setModalVisible] = useState(false);
    const [ rides, setRides ] = useState(null);
    return (
        <View style = { styles.Container }>
            <BackgroundComponent>
                <DriverRideList commandList = {commandList} loading = {loading} navigation = { navigation } driverStateDispatch={driverStateDispatch} />
            </BackgroundComponent>
        </View>
    )
}

export default DriverHome
