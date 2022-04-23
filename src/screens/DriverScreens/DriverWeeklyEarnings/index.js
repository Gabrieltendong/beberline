import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import DriverWeeklyEarningsComponents from '../../../components/DriverWeeklyEarningsComponents';
import { getAllWeeklyCommands } from '../../../context/actions/driverActions';
import { GlobalContext } from '../../../context/provider';
import styles from './styles';

const DriverWeeklyEarnings = () => {

    const { driverStateDispatch, driverState: { commandWeeklyList, loading  } } = useContext(GlobalContext);
    const { authState: { data } } = useContext(GlobalContext);


    const [fetch, setFetch] = useState(true)
    const [ userData, setUserData ] = useState()

    useFocusEffect(
        React.useCallback(()=>{
            getUser()
        }, [fetch]),
    )

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('chauffeur');
            if (user) {
               let User = JSON.parse(user);
               getAllWeeklyCommands(data.user.id)(driverStateDispatch)
               setUserData(User)
            }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    useEffect(() => {
        (async () => {
            setFetch(true)
          })();
          return ()=> setFetch(false)
    }, [fetch])


    return (
        <View style = { styles.container } >
            <DriverWeeklyEarningsComponents commandWeeklyList = {commandWeeklyList} />
        </View>
    )
}

export default DriverWeeklyEarnings;
