import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ADD_CARD, HISTORY, HOME, ON_TRIP, PAYMENT, PROFILE } from '../constants/routes';
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import { GlobalContext } from '../context/provider';
import SideMenu from './SideMenu';
import { Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import History from '../screens/History';
import Payments from '../screens/Payments';
import AddCard from '../screens/AddCard';
import { useFocusEffect } from '@react-navigation/core';
import { io } from 'socket.io-client';
import TestClient from '../screens/testClient';
import OnTrip from '../screens/OnTrip';

const DrawerNavigator = () => {


    var counter = 0;

    const { authDispatch } = useContext(GlobalContext);
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator screenOptions = {{ 
            drawerType: 'slide',
            headerShown: false,
         }} 
         drawerContent={(props) => <SideMenu { ...props } authDispatch = { authDispatch } />} >
            {/* <Drawer.Screen name = 'test' component = { TestClient } /> */}
            <Drawer.Screen name = {HOME} component = { Home } />
            <Drawer.Screen name = {ON_TRIP} component = { OnTrip } />
            <Drawer.Screen name = {PROFILE} component = { Profile } />
            <Drawer.Screen name = {HISTORY} component = { History } />
            <Drawer.Screen name = {PAYMENT} component = { Payments } />
            <Drawer.Screen name = {ADD_CARD} component = { AddCard } />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
