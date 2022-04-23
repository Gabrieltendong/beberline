import { useNavigation, useFocusEffect } from '@react-navigation/core'
import React, { useContext, useState, } from 'react'
import { View, Text } from 'react-native'
import AddCardComponent from '../../components/AddCardComponent'
import BackgroundComponent from '../../components/BackgroundComponent'
import { PAYMENT } from '../../constants/routes'
import { clearCardData, getCardInfo } from '../../context/actions/paymentMethoodActions'
import styles from './styles'

const AddCard = ({ navigation }) => {

    const { navigate } = useNavigation();
   
    const { paymentStateDispatch, paymentState: { data } } = useContext(GlobalContext);


    useFocusEffect(
        React.useCallback(()=>{
            return () => {
                if ( data ) {
                    clearCardData()(paymentStateDispatch) 
                }
            }
        }, [data]),
    )

 

    return (
        <View style= {styles.container} >
                <AddCardComponent onChange = { onChange } onSubmit = { onSubmit } setForm = {setForm} form = {form} errors = { errors } setErrors = {setErrors} navigation = {navigation} />
        </View>
    )
}

export default AddCard
