import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Dimensions } from 'react-native'
import { LOGIN, REGISTER } from '../constants/routes';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SIgnInScreen';


const AuthNavigator = () => {

    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator screenOptions = {{ 
            headerShown: false
         }} >
            <AuthStack.Screen name = {LOGIN} component = { Login } />
            <AuthStack.Screen name = {REGISTER} component = { SignUp } />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator
