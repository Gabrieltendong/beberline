import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react";
import { CLEAR_CARD_DATA, DELETE_CARD_INFO, GET_CARD_INFO } from "../../constants/actionTypes"

const checkPaymentMethods = async (info)=>{
    console.log(`data`, info)
    const { CVC } = info;
    var cardData = {};
    const initialPayments = await AsyncStorage.getItem('paymentMethods');
    if ( initialPayments ) {
        console.log(`initialPayments`, initialPayments)
        cardData = {...JSON.parse(initialPayments), [CVC]:info};
        AsyncStorage.setItem('paymentMethods', JSON.stringify(cardData))
        const getPayments = await AsyncStorage.getItem('paymentMethods')
        console.log(`getPayments`, getPayments);
    } else {
        AsyncStorage.setItem('paymentMethods', JSON.stringify(info))
    }


}

export const clearCardData = () => dispatch => {
    dispatch({
        type: CLEAR_CARD_DATA
    })
}


export const getCardInfo = (data)=>(dispatch)=>(Success)=>{
    checkPaymentMethods(data)
    dispatch({
        type: GET_CARD_INFO,
        payload: data
    })
    Success()
}

export const deleteCardInfo = ()=>(dispatch)=>{
    dispatch({
        type: DELETE_CARD_INFO,
        payload: data
    })
}
