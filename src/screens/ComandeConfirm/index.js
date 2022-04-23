import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { io } from 'socket.io-client';
import CustomButton from '../../components/Common/CustomButton';
import Icon from '../../components/Common/Icon'
import PickerComponent from '../../components/Common/pickerComponent';
import { ON_TRIP } from '../../constants/routes';
import { clearCommandState, createOrder } from '../../context/actions/commandActions';
import { GlobalContext } from '../../context/provider';

import styles from './styles'

const CommandConfirm = ({ navigation })=> {

    const { authState: { data } } = useContext(GlobalContext)
    const { commandState: { pickUp, drop, distance, time, paymentMethod, shipping, loading }, commandDispatch } = useContext(GlobalContext);
    const [ userData, setUserData ] = useState()
    const { t, i18n } = useTranslation();
    const socket = io("http://192.168.239.202:5000")

    const createCommand = ({drawerNav})=> {
        console.log(`shipping`, pickUp)
        socket.emit('sendCommand', { name: 'username', command: { pickUp, drop, distance, time, paymentMethod } })
        console.log('emitted');
    }


    useFocusEffect(
        React.useCallback(()=>{
            return () => {
                if (pickUp || drop || paymentMethod || distance, time ) {
                    clearCommandState()(commandDispatch) 
                }
            }
        }, [])
    )

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('client');
            if (user) {
               let User = JSON.parse(user);
               setUserData(User)
                console.log(`user`, userData)
            }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    useEffect(()=> {
        getUser()
    }, [0])

    return(
        <View style = { styles.card } >
            <TouchableOpacity style = {{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row',  }} onPress = { ()=> navigation.goBack() } ><Icon iconType = 'entypo' name = 'chevron-left' size = {24} /><Text style = {{ fontSize: 17, color: '#494949', paddingHorizontal: 7, marginVertical: 20,  }} >{t('Return')}</Text></TouchableOpacity>
            <View style = { styles.cardHead } >
                {/* <Image style = { styles.cardAvatar } source = { require('../../assets/images/male_avatar.png') } />
                <View>
                    <Text style = { styles.headText } >Thierry Goode</Text>
                    <View style = { styles.rating } >
                        <Image style = {{ width: 25, height: 25 }} source = { require('../../assets/images/rating.png') } />
                        <Text style = { styles.ratingText } > 5.9 </Text>
                    </View>
                </View> */}
                <View style = { styles.marker } >
                    <Icon iconType = 'fontisto' name="map-marker" size={22} color="#66ff66" />
                    <Text style={ styles.textDest } > { pickUp?.address ? pickUp.address : t('YourPosition') } </Text>
                </View>
                <View style = { styles.marker } >
                    <Icon iconType = 'fontisto' name="map-marker-alt" size={22} color="#ff4d4d" />
                    <Text style={ styles.textDest } > { drop?.address } </Text>
                </View>
            </View>
            {/* <View pointerEvents = 'none' style = { styles.cardRecoms } >
               <Text> Methode de paiement </Text>
               <PickerComponent data = {paymentMethod} iconPosition = 'right' icon = { <Icon iconType = 'feather' name = 'check-circle' size = {28}  color = '#1e90ff' /> } />

            </View> */}
            <View style = { styles.cardFooter } >
                    <Image style = {{ width: 60, height: 45 }} source = { require('../../assets/images/car.png') } />
        
                    <View style = { styles.footerRow } >
                        <Text style = { styles.textFooter } >
                            { t('Distance') }
                        </Text>
                        <Text style = { styles.textIndice } >
                            { Math.round(distance) } km
                        </Text>
                    </View>
                    <View style = { styles.footerRow } >
                        <Text style = { styles.textFooter } >
                            { t('Time') }
                        </Text>
                        <Text style = { styles.textIndice } >
                            { Math.ceil(time) } min
                        </Text>
                    </View>
                    <View style = { styles.footerRow } >
                        <Text style = { styles.textFooter } >
                            { t('Price') }
                        </Text>
                        <Text style = { styles.textIndice } >
                            { Math.round(distance) * 2 } €
                        </Text>
                    </View>
            </View>
            <CustomButton loading={loading} disabled={loading} onPress = { () => {
                createOrder( (Math.round(distance) * 2), 'EUR', 1, userData.user.id, shipping.id, pickUp, drop, distance, )(commandDispatch)( ()=> navigation.popToTop() )
                 }} title = { t('Confirm') } primary styless = {{ marginBottom: 15, width: '80%', alignSelf: 'center'  }} />
        </View>
    )
}



export default CommandConfirm;
