import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DRIVER_DOCS, DRIVER_EARNINGS, DRIVER_HOME, DRIVER_PROFILE } from '../constants/routes';
import DriverHome from '../screens/DriverScreens/DriverHome';
import DriverProfile from '../screens/DriverScreens/DriverProfile';
import DriverUploadDocs from '../screens/DriverScreens/DriverUploadDocs';
import Icon from '../components/Common/Icon';
import DriverProfileStack from './DriverProfileStack';
import DriverHomeStack from './DriverHomeStack';
import DriverEarnings from '../screens/DriverScreens/DriverEarnings';
import { useFocusEffect } from '@react-navigation/core';
import { io } from 'socket.io-client';
import * as Location from 'expo-location';
import { showSuccess } from '../helpers/flashMessage';
import testDriver from '../screens/testDriver';
import TestDriver from '../screens/testDriver';
import { useTranslation } from 'react-i18next';


const DriverNavigator = () => {

    const { t } = useTranslation()

   
    const DriverNav = createBottomTabNavigator();

    return (
        <DriverNav.Navigator screenOptions = {{
            headerShown: false,
            tabBarHideOnKeyboard: true
        }} >
            
            <DriverNav.Screen name = {DRIVER_HOME} component = {DriverHomeStack} options={{
                tabBarLabel: t('Home') ,
                tabBarIcon: ({ color, size }) => (
                    <Icon iconType = 'entypo' name="home" color={color} size={size} />
                ),
            }} />
            <DriverNav.Screen name = {DRIVER_EARNINGS} component = {DriverEarnings} 
                options={{
                    tabBarLabel: t('Earning'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon iconType = 'ionicons' name="cash-outline" color={color} size={size} />
                    ),
                }}  
            />
           <DriverNav.Screen name = {DRIVER_PROFILE} component = {DriverProfileStack} 
                options={{
                    tabBarLabel: t('Profile'),
                    tabBarIcon: ({ color, size }) => (
                        <Icon iconType = 'entypo' name="user" color={color} size={size} />
                    ),
                }}  
            />
        </DriverNav.Navigator>
    )
}

export default DriverNavigator
