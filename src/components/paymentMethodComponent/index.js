import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native'
import colors from '../../assets/themes/colors'
import BottomSheet from '@gorhom/bottom-sheet';
import { ADD_CARD, HOME } from '../../constants/routes'
import Icon from '../Common/Icon'
import Input from '../Common/Input'
import RoundedBtn from '../RoundedBtn'
import styles from './styles'
import { paypalInstance } from '../../helpers/axiosInterceptor'
import { showError, showSuccess } from '../../helpers/flashMessage'

const { height, width } = Dimensions.get('screen')

const PaymentMethodComponent = ({ navigation }) => {

    const { navigate } = useNavigation()
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [ cardData, setCardData ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const SheetRef = useRef(null);

    const payment = ()=> {
        console.log('hello');
        paypalInstance.post()
        .then((res)=>{
            console.log(`res.data`, res.data)
        })
        .catch((err)=> {
            console.log(`err.response`, err.response)
        })
    }

    const makePayment = ()=> {
         fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": "Basic EPkITb8mc23x8YtrKmmnD3ddLTuzJLyo-oy2dOT_XigUxwptZJNfZbP6JSR5G93qoM8nhUc0ViNHl2bU"
                },
          },)
          .then((Response) => Response.json())
          .then((ResponseJson)=>{
            console.log("getToken ",ResponseJson);
            setToken(ResponseJson.access_token);
        //     fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders',{
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': "Bearer "+ResponseJson.access_token,
        //     },
        //     body: JSON.stringify({
        //       "intent": "CAPTURE",
        //       "application_context": { //Payment cancel redirection URL
        //        "payment_method": {
        //        "payer_selected": "PAYPAL"
        //        }
        //        },
        //        "payer": { //Pass and prefill buyer details like first name, last name, email address and phone number
        //        "email_address": "buyerBeberline@personal.example.com",
        //        "payer_id": "DRC33X54DLHCN",
        //        "address": { //Pass and prefill buyer billing address details
        //        "country_code": "FR"
        //        }
        //        },
        //        "payee": { //Pass and prefill buyer details like first name, last name, email address and phone number
        //         "email_address": "Beberline@business.example.com",
        //         "merchant_id": "WT228MTHHQU72",
        //         "address": { //Pass and prefill buyer billing address details
        //         "country_code": "FR"
        //         }
        //         },
        //       "purchase_units": [
        //         {
        //           "amount": {
        //             "currency_code": "USD",
        //             "value": "1500.00"
        //           }
        //         }
        //       ]
        //     })
        //   })
        //   .then((response)=> response.json())
        //   .then((responseJson)=> {
        //     console.log("order  ",responseJson) 
        //      setId(responseJson.id);
        //     const approval = responseJson.links.find((item) => item.rel === 'approve')
        //     URL = approval.href
        //     console.log('approvalnew  ',URL);
        //   })
        //   .catch((e) => console.log( '1st err', e))
        //   })
    
        //   fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders/'+id+'/capture ',{
        //    method:'POST',
        //    headers: {
        //      'Content-type': "application/json",
        //      'Authorization': "Bearer "+token,
        //    }
        //  }).then((res)=> {
        //      console.log(`res.data`, res.json())
        //  })
          })
         
    }

    const handleExpandPress = useCallback(() => {
        SheetRef.current?.expand();
        console.log('pressed');
    }, []);

    const handleSheetChange = useCallback(index => {
        // eslint-disable-next-line no-console
    }, []);


    const snapPoints = useMemo(() => ['0%', '50%', '100%'], []);
    

    var cards = {};
    const getInfo = async () => {
        try {
            const payments = await AsyncStorage.getItem('paymentMethods');
            if (payments) {
                cards = JSON.parse(payments) ;
                let x = Object.values(cards)
                setCardData(x)

            }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    const getName = (name)=> {
        if ( name == 4 ) {
            return 'visa'
        }

        if ( name == 5 ) {
            return 'mastercard'
        }
    }

    const completePay = ()=>{
        if ( email.length > 0 && password.length > 0 ) {
            setModalVisible(!modalVisible)
            showSuccess('Enregistrement reussi')
        } else {
            showError('Veuillez remplire les deux champs')
        }
    }

    useFocusEffect(
        React.useCallback(()=>{
            getInfo()
        }, [1]),
    )

    useEffect(()=> {
        getInfo()
        return ()=> {
            getInfo()
        }
    }, [0])
    
    return (
        <View style = {{ flex: 1,  }} >
            <RoundedBtn onPress = { ()=> navigate(HOME) } type = 'icon' icon = { <Icon iconType = 'entypo' name = 'chevron-left' size = {38} color = '#c8c8c8c8' /> } styless = {{ left: 0 }} />
            <View style = { styles.headerFooter } >  
                <Text style = { styles.headerText } >
                    Payment Methods
                </Text>
             </View>
             <View style={styles.containerSheet}>   
                    <TouchableOpacity onPress = { ()=> handleExpandPress() } style = {{ width: '85%', height: 75, borderRadius: 14, backgroundColor: colors.orange, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', position: 'absolute', bottom: 80 }} >
                        <Text style = {{ fontSize: 24, color: colors.white, fontWeight: '500' }} > Effectuee votre commande </Text>
                    </TouchableOpacity>    
                    <BottomSheet
                        ref={SheetRef}
                        snapPoints={snapPoints}
                        animateOnMount={true}
                        onChange={handleSheetChange}
                        keyboardBehavior = 'fullScreen'
                    >
                    </BottomSheet>
            </View>
            <View  style = { styles.FlatList } >
            <View style = {[ styles.cashPayment, { backgroundColor: 'transparent', elevation: 0 } ]} >
                   
                </View>
                <View style = { styles.addCardWrapper } >
                    <Text style = {styles.cards} > Vos Cartes </Text>
                    <TouchableOpacity onPress = { ()=> navigation.navigate(ADD_CARD) } style = { styles.addBtnWrapper } >
                        <Icon iconType = 'octicons' name = 'diff-added' color = { colors.orange } size = {20} />
                        <Text style = {styles.txtAdd} > Ajouter un carte </Text>
                    </TouchableOpacity>
                </View>
                <View style = { styles.cardView } >
                    {
                        cardData.length > 1 ? (
                            <ScrollView style={{ width: '100%', padding: 6  }} >
                            {
                                cardData.map(item => {
                                    let dilt = item.card_number.split('');
                                    let first_digit = dilt[0];
                                    return(
                                        <LinearGradient
                                            // Button Linear Gradient
                                            colors={[ '#4da6ff', '#cc99ff']}
                                            end = {{ x: 1.0, y: 0.0 }}
                                            style={styles.button}>
                                            <Icon iconType = 'fontisto' name = { getName(first_digit) } color = '#f5f5f5' size = {32} />
                                            <View pointerEvents = 'none' style = { styles.cardNo } >
                                            { (item.card_number).match(/\d{1,4}/g).map((i, index)=>{
                                                let lastIndex = item?.card_number.match(/\d{1,4}/g).length - 1;
                                                while( index != lastIndex ){
                                                        return(
                                                            <TextInput key = {index} value = {i} secureTextEntry style = { styles.cardInput } />
                                                    )
                                                }
                                                return(
                                                        <TextInput key = {index} value = {i} style = { styles.cardInput } />
                                                )
                                            }) }
                                            </View>
                                            <View pointerEvents = 'none' style = { styles.cardDetails } > 
                                            <View>
                                                <Text style = { styles.textDetails } >DATE EXP </Text>
                                                <TextInput style = { styles.inputDetails } placeholder = 'Date exp' value = {item?.exp_date} />
                                            </View>
                                            <View>
                                                <Text style = { styles.textDetails } >CVC </Text>
                                                <TextInput style = { styles.inputDetails } placeholder = 'Date exp' value = {item?.CVC} />
                                            </View>
                                            <View>
                                                <Text style = { styles.textDetails } >NOM DU CLIENT </Text>
                                                <TextInput keyboardType = 'numbers-and-punctuation' placeholder = 'Nom du Client' style = { styles.inputDetails } value = {item?.card_holder} />
                                            </View>
                                            </View>
                                        </LinearGradient>
                                    )
                                })
                            }
                            </ScrollView>
                        ) : ( <View>
                            <Text>
                                Aucune carte enregistrer. Ajouter en
                            </Text>
                            <ActivityIndicator animating color = '#1e90ff' />
                        </View> )
                    }
                </View>
            </View>
                <Text style = {[styles.textCash,{ color: '#c3c3c3', marginVertical: 5 }]} > Autres mode de paiements </Text>
                <View style = { styles.cashPayment } >
                    <View style = { styles.iconWrapper } >
                        <View style = { styles.iconContent } >
                            <Icon iconType = 'foundation' name = 'euro' size = {32} color ='#1a8cff' />
                        </View>
                    </View>
                    <View style = { styles.cashTextWrapper } >
                        <Text style = {styles.textCash} >
                            Cash
                        </Text>
                        <Text style = { styles.textDefault } >
                            Methode de paiement par defaut
                        </Text>
                    </View>
                </View>
                <View style = { styles.cashPayment } >
                    <View style = { styles.iconWrapper } >
                        <View style = { styles.iconContent } >
                            <Icon iconType = 'entypo' name = 'paypal' size = {25} color ='#1a8cff' />
                        </View>
                    </View>
                    <View style = { styles.cashTextWrapper } >
                        <Text style = {styles.textCash} >
                            Paypal
                        </Text>
                        <TouchableOpacity onPress = { ()=> setModalVisible(!modalVisible) } >
                            <Text style = { styles.textDefault } >
                                Configurer le mode de paiement
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal 
                    animationType="slide"
                    transparent = {true}
                    visible={modalVisible}
                    style = {{ alignItems: 'center', justifyContent: 'center' }}
                 >
                    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <View style = {{ backgroundColor: '#ffff', padding: 20, width: '85%', elevation: 3, borderRadius: 15 }} >
                            <Image style = {{ height: 120, width: 175, alignSelf: 'center' }}s source = { require('../../assets/images/Paypal_logo_PNG6.png') } />
                            <Text style = {{ textAlign: 'center', fontSize: 28, color: '#d1d1d1d1' }} >
                                Configurer Votre Paypal
                            </Text>
                            <Input 
                                iconPosition = 'right' 
                                label = " Email "  
                                value = { email }
                                keyboardType = 'email'
                                placeholder = 'Entrer votre email '
                                onChangeText = { (value) => {
                                    setEmail(value);
                                } }
                            />
                            <Input 
                                keyboardType = 'password'
                                secureTextEntry
                                iconPosition = 'right' 
                                value = { password }
                                label = " ID compte "  
                                placeholder = 'Entrer L`ID du compte  '
                                onChangeText = { (value) => {
                                    setPassword(value);
                                } }
                            />
                            <TouchableOpacity onPress = { ()=> {
                               completePay()
                            } } style={{ alignSelf: 'center', width: '35%', backgroundColor: '#1e90ff', alignContent: 'center', padding: 6, borderRadius: 10, marginVertical: 5, alignItems: 'center' }} >
                                <Text style = {{ fontSize: 18, color: 'white' }} >
                                    Enregistrer
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = { ()=> {
                              setModalVisible(!modalVisible)
                            } } style={{ alignSelf: 'center', alignContent: 'center', padding: 6, borderRadius: 10, marginVertical: 5, alignItems: 'center', position: 'absolute', right: 10 }} >
                                <Text style = {{ fontSize: 18, color: 'red' }} >
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        </View>
            
    )
}

export default PaymentMethodComponent;
