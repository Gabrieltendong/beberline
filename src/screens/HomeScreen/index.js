import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import styles from './styles'
import Map from '../../components/MapView';
import CustomButton from '../../components/Common/CustomButton'
import colors from '../../assets/themes/colors';
import RoundedBtn from '../../components/RoundedBtn';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { PROFILE } from '../../constants/routes';
import Icon from '../../components/Common/Icon';
import { GlobalContext } from '../../context/provider';
import { clearCommandState } from '../../context/actions/commandActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/Common/LanguageSelector';



const Home = ({navigation}) => {

  const { t, i18n } = useTranslation();


  const [fetch, setFetch] = useState(true)
  const [ userData, setUserData ] = useState()

  // useFocusEffect(
  //     React.useCallback(()=>{
  //         getUser()
  //     }, [fetch]),
  // )

  // const getUser = async () => {
  //     try {
  //         const user = await AsyncStorage.getItem('chauffeur');
  //         if (user) {
  //            let User = JSON.parse(user);
  //            setUserData(User)
  //         }
  //     } catch (error) {
  //         console.log(`error`, error)
  //     }
  // }

  // useEffect(() => {
  //     (async () => {
  //         setFetch(true)
  //       })();
  //       return ()=> setFetch(false)
  // }, [fetch])

    const { navigate, toggleDrawer } = useNavigation()
  const { commandState: { pickUp, drop, paymentMethod , distance, time,  }, commandDispatch } = useContext(GlobalContext)

    return (
        <View style = { styles.Container } >
           
            <Map navigation = { navigation } />
            <RoundedBtn icon = { <Icon iconType = 'entypo' name = 'menu' size = {38} color = '#484848' /> } type = 'icon' styless = {{ left: 10 }} onPress = { ()=> toggleDrawer() } />
            <LanguageSelector />
            
        </View>
    )
}

const style = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: 'grey',
    },
    
  });

export default Home
