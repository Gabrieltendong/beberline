import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../../../constants/actionTypes"
import axiosInstance from "../../../helpers/axiosInterceptor";
import { showError, showSuccess } from "../../../helpers/flashMessage";





export default ({ email, password  }) => (dispatch) => (userType) => {


    dispatch({
        type: LOGIN_LOADING, 
    })
    if ( userType == 'Client' ) {
        axiosInstance.post('login/', { email, password })
        .then((res) => {                
            if ( res.data.user.user.is_custumer == true ) {
                AsyncStorage.setItem('client', JSON.stringify(res.data) )
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                showSuccess(t('LoginSuccess'))
           } else {
            dispatch({
                type: LOGIN_ERROR,
                payload: {error: t('ErrAcc') } 
            })
            showError(t('ErrClientAccMsg'))
           }
        console.log(`res.data`, res.data)
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response : { error: t('ErrLogin') }
            })
            console.log(`err.response`, err.response)
            showError(t('ErrLoginMsg'))
        })
    }

    if ( userType == 'Chauffeur' ) {
        axiosInstance.post('login/', { email, password })
        .then((res) => {                
            if ( res.data.user.user.is_driver == true ) {
                AsyncStorage.setItem('chauffeur', JSON.stringify(res.data) )
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                showSuccess(t('LoginSuccess'))
           } else {
            dispatch({
                type: LOGIN_ERROR,
                payload: {error: t('ErrAcc')} 
            })
            showError(t('ErrDriverAccMsg'))
           }
        console.log(`res.data`, res.data)
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data : { error: t('ErrLogin') }
            })
            showError(t('ErrLoginMsg'))
        })
    }
}