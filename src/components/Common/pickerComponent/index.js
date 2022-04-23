import React, { useContext } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import colors from '../../../assets/themes/colors'
import { Overlay } from 'react-native-elements';
import styles from './styles'
import Icon from '../Icon';
import { getPaymentMethod } from '../../../context/actions/commandActions';
import { GlobalContext } from '../../../context/provider';

const PickerComponent = ({ icon, iconPosition, data, config, setValue }) => {

    const [ focused, setFocused ] = React.useState(false)
    const { commandDispatch } = useContext(GlobalContext)

    const [ isConfigured, setIsConfigured ] = React.useState(false)

    const getBorderColor = ()=> {
        if (focused) {
            return colors.primary;
        } 
 
        else {
            return 'lightgrey'
        }
    }

    const isSelected = ()=> {
        setValue(true);
        getPaymentMethod(data)(commandDispatch)
    }

    const getIconDirection = () => {
        if ( iconPosition == 'left' ) {
            return 'row-reverse'
        }

        if ( iconPosition == 'right' ) {
            return 'row'
        }
    }

    const getName = ()=> {
        let dilt = data?.card_number?.split('');
    //    if ( dilt?.lenght > 2 ) {
    //     let first_digit = dilt[0];
    //     if ( first_digit == 4 ) {
    //         return 'visa'
    //     }

    //     if ( first_digit == 5 ) {
    //         return 'mastercard'
    //     }
    //    }
       return 'credit-card'
       
    }



    const formatCardNumber = ()=> {
        if (typeof(data) ==='object' ) {
           let number = data?.card_number?.match(/\d{1,4}/g)
           return number;
        }  
    }
    
 
    return (
        <View style = { styles.globalWrapper } >

            <View style = { [styles.inputWrapper, { borderColor: getBorderColor(), flexDirection: getIconDirection() }  ] } >
                <Icon iconType = 'fontisto' name = { getName() } color = '#49494547' size = {28} />
                {/* <TextInput showSoftInputOnFocus = {false} selectionColor = 'transparent' onFocus = { ()=>{ setFocused(true); isSelected() } } onBlur = { ()=> setFocused(false) } style = {[ styles.textInput ]} /> */}
                <View style = { styles.textInput } >
                   {/* { formatCardNumber()?.map((item, index)=>{
                       let lastIndex = formatCardNumber().length - 1;
                       while( index != lastIndex ){
                            return(
                                <TextInput onFocus = { ()=>{ setFocused(true); isSelected() } } onBlur = { ()=> setFocused(false) } selectionColor = 'transparent' showSoftInputOnFocus = {false} autoComplete = {false} key = {index} value = {item} secureTextEntry style = { styles.cardInput } />
                        )
                       }
                       return(
                            <TextInput onFocus = { ()=>{ setFocused(true); isSelected() } } onBlur = { ()=> setFocused(false) } selectionColor = 'transparent' showSoftInputOnFocus = {false} autoComplete = {false} key = {index} value = {item} style = { styles.cardInput } />
                       )
                   }) } */}
                </View>
                <TouchableOpacity >
                   {
                       focused ? icon : null
                   }
                </TouchableOpacity>
            </View>
            {
                config ? ( 

                    <View style = { styles.paymentBtn } >
                {
                    isConfigured ? ( 
                        <View style = {[ styles.btnWrapper, { alignSelf: 'center', height: '100%' } ]} >
                            <TouchableOpacity onPress = { ()=> setIsConfigured(!isConfigured) } >
                                <Text style = { styles.textModifier } >
                                    Modifier
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style = { styles.textDelete } >
                                    Supprimer
                                </Text>
                            </TouchableOpacity>
                        </View>
                     ) : (
                        
                        <TouchableOpacity onPress = { ()=> setIsConfigured(!isConfigured) } >
                            <Text style= { styles.textConfig } >
                                Configurer le mode de paiement
                            </Text>
                        </TouchableOpacity>
                     )
                }
            </View>

                 ) : null
            }
        </View>
    )
}

export default PickerComponent
