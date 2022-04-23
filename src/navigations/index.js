import { useFocusEffect } from '@react-navigation/core'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './DrawerNavigator'
import { GlobalContext } from '../context/provider'
import AuthNavigator from './AuthNavigator'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDriverData, getUserData } from '../context/actions/UserActions/getUserData'
import DriverNavigator from './DriverNavigator'
import FlashMessage from 'react-native-flash-message'
import { Alert } from 'react-native'



const AppNavContainer = () => {

    const { authState: { isLoggedIn, isDriver, isClient }, authDispatch } = useContext(GlobalContext)
    const [ isAuthenticatedDriver, setAuthenticatedDriver ] = useState(false);
    const [ isAuthenticatedClient, setAuthenticatedClient ] = useState(false);
    const [ authLoaded, setAuthLoaded ] = useState(false);


    const getAuthStatus = async ()=> {
        try {
            const client = await AsyncStorage.getItem('client');
            const driver = await AsyncStorage.getItem('chauffeur');

            console.log('driver :>> ', driver);
            console.log('client :>> ', client);


            if ( client != null ) {
                setAuthenticatedClient(true);
                getUserData(JSON.parse(client))(authDispatch)
                console.log('client :>> ', client);
            } else {
                setAuthenticatedClient(false);
            }
            if ( driver != null ) {
                setAuthenticatedDriver(true);
                getDriverData(JSON.parse(driver))(authDispatch)
                console.log('driver :>> ', driver);
            } else {
                setAuthenticatedDriver(false);
            }
            // if ( driver && client ) {
            //     Alert.alert("Vous disposer de compte client et chauffeur", 'Continuer en tant que', [
            //         {
            //             text: 'Client', onPress: ()=>{ setAuthenticatedClient(true) }
            //         },
            //         {
            //             text: 'Chauffuer', onPress: ()=>{ setAuthenticatedDriver(true) }
            //         },
            //         {
            //             text: 'Annuler', onPress: ()=>{ }
            //         }
            //     ])
            // }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    // useFocusEffect(
    //     React.useCallback(()=>{
    //         getAuthStatus();
    //     }, [isLoggedIn]),
    // )
   
    React.useEffect(() => {
        console.log('something changed');
        getAuthStatus();
    }, [isLoggedIn, ])

    const renderNavigation = ()=>{
        // if ( isAuthenticatedClient || isLoggedIn ) {
        //    return <DrawerNavigator />
        // } if ( isAuthenticatedDriver || isLoggedIn ) {
        //     return <DriverNavigator />
        // } else {
        //     return <AuthNavigator />
        // }

        if ( isDriver ) {
            console.log('check driver');
            if (isAuthenticatedDriver || isLoggedIn) {
                return <DriverNavigator />
            } else {
                return <AuthNavigator />
            }
        }

        if ( isClient ) {
            console.log('check client');
            console.log('isLoggedIn :>> ', isLoggedIn, isAuthenticatedClient);
            if (isAuthenticatedClient || isLoggedIn) {
                return <DrawerNavigator />
            } else {
                return <AuthNavigator />
            }
        }

       return  <AuthNavigator />
    }

    
    return (
        <NavigationContainer>
           {
               renderNavigation()
           }
           <FlashMessage position = 'bottom' />
           
        </NavigationContainer>
    )
}

export default AppNavContainer
