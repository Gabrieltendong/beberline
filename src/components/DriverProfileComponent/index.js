import { useNavigation, useFocusEffect } from '@react-navigation/core';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native'
import { DRIVER_EDIT_CAR_DETAILS, DRIVER_EDIT_PROFILE, DRIVER_UPLOAD_CAR_DOCS } from '../../constants/routes';
import { GlobalContext } from '../../context/provider';
import { WebView } from 'react-native-webview';
import Icon from '../Common/Icon';
import { showSuccess } from "../../helpers/flashMessage";
import styles from './styles';
import logoutDriver from '../../context/actions/Register/logoutDriver';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import email from 'react-native-email'

const { height, width } = Dimensions.get('window')

const DriverProfileComponent = ({navigation}) => {

    const { authDispatch, authState: { isDriver, isClient } } = useContext(GlobalContext);
    const { driverState: { vehicleDetails }, driverStateDispatch } = useContext(GlobalContext);

    const { t, i18n } = useTranslation();


    const [ userData, setUserData ] = useState()
    const [ loadWeb, setLoadWeb ] = React.useState(true)
    const [CarImg, setCarImg] = useState()
    const webRef = useRef()
    const [fetch, setFetch] = useState(true)

    const img = require('../../assets/images/profile_car.jpg');

    const getCarImg = async () => {
         try {
             const carImage = await AsyncStorage.getItem('driverImgCar')
             if (carImage) {
                 setCarImg(carImage);
             } 
         } catch (error) {
             console.log(`error`, error)
         }
 
     }
 
    const handleWebViewNavigationStateChange = (navState) => {
        const { url } = navState;
       
    
        // handle certain doctypes
        if (url.includes('https://be-berline.herokuapp.com/core/')) {
        //   webRef.stopLoading();
          setLoadWeb(true)
          showSuccess("Votre compte paiement as ete cree avec success")
          // open a modal with the PDF viewer
        }
    }

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

     useFocusEffect(
        React.useCallback(()=>{
            getCarImg()
        }, [fetch]),
    )

     useEffect(() => {
        (async () => {
            getUser()
            setFetch(true)
          })();
          return ()=> setFetch(false)
    }, [fetch])
 

    const MenuItems = [
        {
            name: t('YourProfile'), icon: <Icon iconType = 'antdesign' name = 'profile' size = {32} color = '#A0A0A0' /> , onPress:  ()=> navigation.navigate(DRIVER_EDIT_PROFILE) 
        },

        {
            name: t('CarDetails'), icon: <Icon iconType = 'materialicons' name = 'taxi-alert' size = {32} color = '#A0A0A0' />, onPress:  ()=> navigation.navigate(DRIVER_EDIT_CAR_DETAILS) 
        },

        {
            name: t('CarDocs'), icon: <Icon iconType = 'ionicons' name = 'document-attach' size = {32} color = '#A0A0A0' />, onPress:  ()=> navigation.navigate(DRIVER_UPLOAD_CAR_DOCS) 
        },

        {
            name: t('ConfigAccPayment'), icon: <Icon iconType = 'materialcommunityicons' name = 'card-account-details-outline' size = {32} color = '#A0A0A0' />, onPress:  ()=> {
                Alert.alert(t('RedirectMsg'), t('ApprovalMsg'), [
                    {
                        text: t('No'), onPress: ()=>{}
                    },
                    {
                        text: 'OK', onPress: ()=>{ setLoadWeb(false) }
                    }
                ])
            }
        },

        {
            name: t('logOut'), icon: <Icon iconType = 'entypo' name = 'log-out' size = {32} color = '#A0A0A0' />, onPress:  ()=> {
                Alert.alert( t('AboutToLogOut'), t('SureAboutThat'), [
                    {
                        text: t('No'), onPress: ()=>{}
                    },
                    {
                        text: t('Yes'), onPress: ()=>{logoutDriver()(authDispatch)}
                    }
                ])
            }
        },

        {
            name: t('LeaveUsAMail'), icon: <Icon iconType = 'materialicons' name = 'outgoing-mail' size = {32} color = '#A0A0A0' />, onPress:  ()=>  { handleMailSend() }
        },
    ]

    return (

        <View style = { styles.container } >
              {
               loadWeb ? 
               <View style = {{ flex: 1 }} >
                    <View style = { styles.imgWrapper } >
                        <ImageBackground source={typeof(CarImg) != "undefined" ? { uri: CarImg }: img } resizeMode="cover" style={styles.image} >
                            <TouchableOpacity style = { styles.editCardetails } >
                                <Text style = { styles.editCardetailsBtn } >
                            
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style = { styles.profileWrapper } >
                        <Image width = {45} height = { 45 } source = {require('../../assets/images/user.png')} />
                        <View style = { styles.sideProfile } >
                            <Text style = { styles.profileName } >
                                {  userData?.user ? userData?.user.user.first_name : null } {  userData?.user ? userData?.user.user.last_name : null }
                            </Text>
                            <TouchableOpacity onPress={()=> navigation.navigate(DRIVER_EDIT_PROFILE)} >
                                <Text style = { styles.editProfileBtn } >
                                    { t('ConsultProfile') }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        MenuItems.map(({name, icon, onPress}) => (
                            <TouchableOpacity onFocus = { ()=> setFocused(true) } style = { styles.navBtn } key = { name } onPress = { onPress } >
                                { icon }
                                <Text style = { styles.btnText } >
                                    {name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
               </View> : 
               (<WebView
                    style = {{ height: height, width: width }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={false}
                    scalesPageToFit={true}
                    ref = { webRef }
                    // source={{ uri: 'https://stackoverflow.com/' }}
                    source={{ uri: "https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_KkM98tjYmkiWzUSFokV6A53j19W4JRWd#/" }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />)
           }
        </View>


        // <>
        
        // </>
    )
}

 


export default DriverProfileComponent;
