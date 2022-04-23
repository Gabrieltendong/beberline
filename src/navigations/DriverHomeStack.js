import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DRIVER_BON, DRIVER_HOME,  DRIVER_TRIP } from '../constants/routes';
import DriverHome from '../screens/DriverScreens/DriverHome';
import DriverTrip from '../screens/DriverScreens/DriverTrip';
import DriverBonScreen from '../screens/DriverScreens/DriverBonScreen';
import { GlobalContext } from '../context/provider';
import { useTranslation } from 'react-i18next';

const DriverHomeStack = () => {
    const ProfileStack = createStackNavigator();
    const { driverStateDispatch, driverState: { isBusy } } = useContext(GlobalContext);

    const { t } = useTranslation()

    return (
        <ProfileStack.Navigator screenOptions = {{
            headerShown: false
        }} >
            <ProfileStack.Screen name = 'com' component = {DriverHome} />
            <ProfileStack.Screen name = {DRIVER_TRIP} component = {DriverTrip} />
            <ProfileStack.Screen name = {DRIVER_BON} component = {DriverBonScreen} />
            
        </ProfileStack.Navigator>
    )
}

export default DriverHomeStack
