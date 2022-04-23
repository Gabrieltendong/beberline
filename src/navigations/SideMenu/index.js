import React from 'react'
import { useState } from 'react'
import { View, Text, SafeAreaView, Alert, TouchableOpacity, Image } from 'react-native'
import logoutUser from '../../context/actions/Register/logoutAction'
import { HISTORY, HOME, ON_TRIP, PAYMENT, PROFILE } from '../../constants/routes'
import styles from './styles'
import Icon from '../../components/Common/Icon'
import { useTranslation } from 'react-i18next'
import email from 'react-native-email'

const SideMenu = ({ navigation, authDispatch }) => {

    const { t, i18n } = useTranslation();

    const handleMailSend = ()=> {
        const to = ['beberline@laposte.net'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            // bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Sujet ici',
            body: 'Corp du messages'
        }).catch(console.error)
    }


    const MenuItems = [
        {
            name: t('CurrentRide') , icon: <Icon iconType = 'fontawesome' name = 'cab' size = {32} color = '#484848' /> , onPress:  ()=> navigation.navigate(ON_TRIP) 
        },
        {
            name: t('Home') , icon: <Icon iconType = 'entypo' name = 'home' size = {32} color = '#484848' /> , onPress:  ()=> navigation.navigate(HOME) 
        },

        {
            name: t('Profile') , icon: <Icon iconType = 'entypo' name = 'user' size = {32} color = '#484848' />, onPress:  ()=> navigation.navigate(PROFILE) 
        },

        {
            name: t('History') , icon: <Icon iconType = 'fontawesome5' name = 'history' size = {32} color = '#484848' />, onPress:  ()=> navigation.navigate(HISTORY) 
        },

        {
            name: t('logOut') , icon: <Icon iconType = 'entypo' name = 'log-out' size = {32} color = '#484848' />, onPress:  ()=> {
                navigation.toggleDrawer()
                Alert.alert( t('AboutToLogOut'), t('SureAboutThat'), [
                    {
                        text: t('No'), onPress: ()=>{}
                    },
                    {
                        text: t('Yes'), onPress: ()=>{logoutUser()(authDispatch)}
                    }
                ])
            }
        },

        {
            name: t('LeaveUsAMail'), icon: <Icon iconType = 'materialicons' name = 'outgoing-mail' size = {32} color = '#A0A0A0' />, onPress:  ()=>  { handleMailSend() }
        },

    ]
    return (
        <SafeAreaView style = { styles.Container } >
            <Image style = { styles.image } source = { require('../../assets/images/BEBerline_Logo.png') } />
            {
                MenuItems.map(({name, icon, onPress}) => (
                    <TouchableOpacity onFocus = { ()=> setFocused(true) } style = { styles.navBtn } key = { name } onPress  = { onPress } >
                        { icon }
                        <Text style = { styles.btnText } >
                            {name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </SafeAreaView>

    )
}

export default SideMenu
