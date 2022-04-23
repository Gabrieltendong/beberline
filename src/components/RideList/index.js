import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Alert, Modal, StyleSheet, Pressable, ActivityIndicator,   } from 'react-native';
import Icon from '../Common/Icon';
import RoundedBtn from "../RoundedBtn";
import CustomButton from '../Common/CustomButton'
import styles from './styles';import { GlobalContext } from '../../context/provider';
import { getAllCommands, getShippingAddress } from '../../context/actions/driverActions';
import { io } from 'socket.io-client';
import { DRIVER_TRIP } from '../../constants/routes';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../Common/LanguageSelector';

const DriverRideList = ({ navigation, commandList, loading, driverStateDispatch }) => {

    const [ data, setData ] = useState([]);
    const { t, i18n } = useTranslation();


    const formatName = (date)=> {
        let x = date.split('T')
         let time = x[1].split('.')
        return `${x[0]}, ${time[0]}`
    }

    return (
        <View style = {{ flex: 1 }} >
            <View style = { styles.headerFooter } > 
                <LanguageSelector />
                <Text style = { styles.headerText } >
                    { t('CommandList') }
                </Text>
            </View>
            <View style = {styles.BottomSheet} >
            <ScrollView
                showsVerticalScrollIndicator = {false} >
            {
                commandList.length >= 1 ? 
                commandList.map((item)=>(
                    <TouchableOpacity onPress = { () => {
                        console.log(item.shipping)
                        getShippingAddress(item.shipping.id)(driverStateDispatch)
                        navigation.navigate(DRIVER_TRIP, { item })
                        
                        } } key = {item.key} activeOpacity = {0.8} style = {styles.sheetContent} >
                        <Image style = {{ width: 60, height: 45 }} source = { require('../../assets/images/car_ride.png') } />
                        <View style ={styles.rideInfo} >
                            <View style = { styles.footerRow } >
                                <Text style = { styles.textFooter } >
                                    { item.customer.user.first_name }
                                </Text>
                                <Text style = { styles.textIndice } >
                                    {
                                        formatName(item.date)
                                    }
                                </Text>
                            </View>
                            <View style = { styles.footerRow } >
                                <Text style = { styles.textFooter } >
                                    {
                                        Math.round(item.amount) 
                                    } €
                                </Text>
                                <Text style = { styles.textIndice } >
                                {item.paymentMethod}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )) : 
                <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
                    {
                        loading ? 
                        (
                            <View>
                            <Text>
                        { t('Searching') }
                    </Text>
                    <ActivityIndicator animating = {loading} color = '#1e90ff' />
                       
                            </View>
                         ) : 
                         (
                             <View style = {{ height: 250, }} >
                                    <TouchableOpacity onPress={ ()=> getAllCommands()(driverStateDispatch) } style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                        <Icon iconType='ionicons' name = 'ios-reload' size = {32} color = '#000111' />
                                        <Text> { t('Retry') } </Text>
                                    </TouchableOpacity>
                             </View>
                         )
                    }
                </View>
            }
            </ScrollView>
        </View>
        
        </View>
    )
}

export default DriverRideList
