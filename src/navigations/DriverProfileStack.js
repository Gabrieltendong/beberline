import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DRIVER_DOCS, DRIVER_EDIT_CAR_DETAILS, DRIVER_EDIT_PROFILE, DRIVER_PROFILE_SCREEN, DRIVER_UPLOAD_CAR_DOCS } from '../constants/routes';
import DriverProfile from '../screens/DriverScreens/DriverProfile';
import DriverUploadDocs from '../screens/DriverScreens/DriverUploadDocs';
import EditDriverProfile from '../screens/DriverScreens/EditDriverProfile';
import CarDetails from '../screens/DriverScreens/DriverEditCarDetails';

const DriverProfileStack = () => {
    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator screenOptions = {{
            headerShown: false,
        }} >
            <ProfileStack.Screen name = {DRIVER_PROFILE_SCREEN} component = {DriverProfile} />
            <ProfileStack.Screen name = {DRIVER_EDIT_PROFILE} component = {EditDriverProfile} />
            <ProfileStack.Screen name = {DRIVER_EDIT_CAR_DETAILS} component = {CarDetails} />
            <ProfileStack.Screen name = {DRIVER_UPLOAD_CAR_DOCS} component = {DriverUploadDocs} />
        </ProfileStack.Navigator>
    )
}

export default DriverProfileStack
