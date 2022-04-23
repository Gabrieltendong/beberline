import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Fontisto, Entypo } from '@expo/vector-icons'; 
import styles from './styles';
import Container from '../Common/Container';
import RoundedBtn from '../RoundedBtn';
import CustomButton from '../Common/CustomButton';
import colors from '../../assets/themes/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { HOME } from '../../constants/routes';
import Icon from '../Common/Icon';
import { GlobalContext } from '../../context/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';


const { height, width } = Dimensions.get('screen')

const HistoryListItems = () => {


    const [ HistoryData, setHistoryData ] = useState([]);
    const { navigate } = useNavigation()
    const { commandState: { pickUp, drop } } = useContext(GlobalContext)
    //Translations
    const { t, i18n } = useTranslation();


    var cards = {};
    const getInfo = async () => {
        try {
            const Command = await AsyncStorage.getItem('command');
            if (Command) {
                cards = JSON.parse(Command);
                let x = Object.values(cards)
                setHistoryData(x)

            }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    useFocusEffect(
        React.useCallback(()=>{
            getInfo()
        }, [1]),
    )

    useEffect(() => {
        getInfo()
    }, [])


    return (
        <View style = {{ flex: 1 }} >
            <RoundedBtn onPress = { ()=> navigate(HOME) } type = 'icon' icon = { <Icon iconType = 'entypo' name = 'chevron-left' size = {38} color = '#c8c8c8c8' /> } styless = {{ left: 0 }} />
            <View style = { styles.headerFooter } >  
                <Text style = { styles.headerText } >
                    {
                        t('History')
                    }
                </Text>
                {/* <CustomButton styless = {{ width: 165, height: 40, borderRadius: 45, opacity: 0.75 }} primary title = 'Select Date'  /> */}
            </View>
            <View  style = { styles.FlatList } >
                <FlatList
                    data = {HistoryData}
                    showsVerticalScrollIndicator = {false}
                    initialNumToRender = '3'
                    contentContainerStyle = {{ backgroundColor: 'transparent', paddingHorizontal: 10, borderRadius: 25 }}
                    keyExtractor = { ({key}) => key }
                    renderItem = { ({item: { distance, pickUp, drop, id }}) => (
                        <View style = { styles.listCard } >
                            <Text> {id} </Text>
                            <View style = { styles.marker } >
                                <Fontisto name="map-marker" size={22} color="#66ff66" />
                                <Text style={ styles.textDest } > { pickUp.address } </Text>
                            </View>
                            <View style = { styles.marker } >
                                <Fontisto name="map-marker-alt" size={22} color="#ff4d4d" />
                                <Text style={ styles.textDest } > { drop.address } </Text>
                            </View>
                            <View style = { styles.footer } >
                                <View style = { styles.marker } >
                                    <Fontisto name="euro" size={20} color="#8c8c8c" />
                                    <Text style = { styles.price } > { Math.ceil(distance * 2) } </Text>
                                </View>
                                <TouchableOpacity style = { styles.marker } >
                                    <Text> {t('Details')} </Text>
                                    <Entypo name="chevron-right" size={24} color="#cccccc" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) }
                />
            </View>
        </View>
    )
}

export default HistoryListItems
