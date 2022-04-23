import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import DriverDaylyEarningsComponents from '../../../components/DriverDaylyEarningsComponents';
import { getAllDailyCommands } from '../../../context/actions/driverActions';
import { GlobalContext } from '../../../context/provider';
import styles from './styles';

const DriverDaylyEarnings = () => {

    const { authState: { data } } = useContext(GlobalContext);
    const { driverStateDispatch, driverState: { commandDailyList, loading  } } = useContext(GlobalContext);

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
               getAllDailyCommands(data.user.id)(driverStateDispatch)
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
            <DriverDaylyEarningsComponents commandDailyList = { commandDailyList } />
        </View>
    )
}

export default DriverDaylyEarnings;
