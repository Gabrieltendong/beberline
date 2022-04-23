import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, Button, TouchableOpacity, FlatList } from 'react-native'
import { Fontisto, Entypo } from '@expo/vector-icons'; 
import styles from './styles'
import { GlobalContext } from '../../context/provider';
import RoundedBtn from '../RoundedBtn';
import CustomButton from '../Common/CustomButton';
import colors from '../../assets/themes/colors';
import { useNavigation } from '@react-navigation/core';
import Icon from '../Common/Icon';
import { HOME } from '../../constants/routes';
import PickerComponent from '../Common/pickerComponent';
import { useTranslation } from 'react-i18next';

const ProfileListItems = ({navigation}) => {

    const { navigate } = useNavigation();
    const { authState: { isDriver, isClient } } = useContext(GlobalContext)
    const [ userData, setUserData ] = useState()
    //Translations
    const { t, i18n } = useTranslation();

    const getUser = async () => {
       if (isClient) {
        try {
            const user = await AsyncStorage.getItem('client');
            if (user) {
               let User = JSON.parse(user);
               setUserData(User)
            }
        } catch (error) {
            console.log(`error`, error)
        }
       }

       if (isDriver) {
        try {
            const user = await AsyncStorage.getItem('chauffeur');
            if (user) {
               let User = JSON.parse(user);
               setUserData(User)
            }
        } catch (error) {
            console.log(`error`, error)
        }
       }

    }

    useEffect(()=> {
        getUser()
    }, [0])
  
    const userInfo = [ 
        {name: t('Fname'),  value: userData?.user ? userData?.user.user.first_name : 'null' },
        {name: t('Lname'), value:userData?.user ? userData?.user.user.last_name : 'null'},
        {name: t('Email'), value: userData?.user ? userData?.user.user.email : 'null'},
        {name: t('Password'), value: '********'}
     ]
        
    

    return (
        <View style = { styles.listWrapper } >
            <RoundedBtn onPress = { ()=> navigation.goBack() } type = 'icon' icon = { <Icon iconType = 'entypo' name = 'chevron-left' size = {38} color = '#c8c8c8c8' /> } styless = {{ left: 0 }} />
            <View style = { styles.headerFooter } >  
                <Text style = { styles.headerText } >
                    { t('Profile') }
                </Text>
            </View>
            <View style = { styles.profileForm } >
                <Image height = {150} width = {150} style = {{ borderRadius: 55, position: 'absolute', top: '-22%' }} source={require('../../assets/images/user.png')} />
                <FlatList
                    data = {userInfo}
                    initialNumToRender = {3}
                    style = {{ width: '100%' }}
                    showsVerticalScrollIndicator = {false}
                    contentContainerStyle = {{ backgroundColor: 'transparent', paddingHorizontal: 10,  }}
                    keyExtractor = { ({name}) => name }
                    renderItem = { ({item: { name, value }}) => (
                        <View style = { styles.footer } >
                            <Text style = { styles.textDest }> {name} </Text>
                            <TouchableOpacity style = { styles.marker } >
                                <Text style = {[ styles.textDest, {color: '#cccccc'} ]} > { value } </Text>
                                <Entypo name="chevron-right" size={24} color="#cccccc" />
                            </TouchableOpacity>
                         </View>
                            
                    ) }
                />
            </View>
        </View>
    )
}

export default ProfileListItems;
