import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "i18next";
import { CLEAR_AUTH_DATA, CLEAR_USER_TYPE, IS_DRIVER, IS_USER, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS, SELECT_USER_TYPE } from "../../../constants/actionTypes"
import axiosInstance from "../../../helpers/axiosInterceptor";
import { showError, showSuccess } from "../../../helpers/flashMessage";


export const clearAuthState = () => dispatch => {
    dispatch({
        type: CLEAR_AUTH_DATA
    })
}

export const clearUserType = () => dispatch => {
    dispatch({
        type: CLEAR_USER_TYPE
    })
}

export const selectUserType = (val) => (dispatch) => {
    if ( val == 'Client' ) {
        dispatch({
            type: IS_USER
        })
    }

    if ( val == 'Chauffeur' ) {
        dispatch({
            type: IS_DRIVER
        })
    }
    console.log(`val`, val)
    dispatch({
        type: SELECT_USER_TYPE,
        payload: val
    })
}

export default ({ email, firstName, lastName, password  }) => (dispatch) => (userType) => (onSuccess) => {
    let first_name = firstName;
    let last_name = lastName;
    let username = firstName + lastName
    console.log(`userType`, userType)
    dispatch({
        type: REGISTER_LOADING, 
    })
    if ( userType == 'Client' ) {
        axiosInstance.post('customer/', {  first_name, last_name, email, password, username })
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
                onSuccess(res.data);
                showSuccess(t('AccRegMsg'))
            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_ERROR,
                    payload: err.response ? err.response.data : { error: t('ErrSomething') }
                })
                showError(t('ErrAccCreation'))
                console.log(`err.response.data`, err.response.data, last_name)
            })
    }

    if ( userType == 'Chauffeur' ) {
        axiosInstance.post('driver/', {  first_name, last_name, email, password, username })
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
                onSuccess(res.data);
                showSuccess(t('AccRegMsg'));

            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_ERROR,
                    payload: err.response ? err.response.data : { error: t('ErrSomething') }
                })
                showError(t('ErrAccCreation'))
                console.log(`err.response.data`, err.response.data, last_name)
            })
    }
}