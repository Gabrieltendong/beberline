import React from 'react'
import { CLEAR_AUTH_DATA, CLEAR_USER_TYPE, GET_DRIVER_DATA, GET_USER_DATA, IS_DRIVER, IS_USER, LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_USER, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS, SELECT_USER_TYPE } from '../../constants/actionTypes'

const auth = (state, { type, payload }) => {
    switch (type) {
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                data: payload,
                isLoggedIn: true,
                loading: false
            }
        case REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                data: null
            }
        case CLEAR_AUTH_DATA:
            return {
                ...state,
                data: null,
                error: null,
            }
        case GET_USER_DATA:
            return {
                ...state,
                data: payload,
            }
        case GET_DRIVER_DATA:
            return {
                ...state,
                driverData: payload,
            }
        case SELECT_USER_TYPE:
            return {
                ...state,
                userType: payload,
            }
        case CLEAR_USER_TYPE:
            return {
                ...state,
                userType: '',
            }
        case IS_USER:
            return {
                ...state,
                isClient: true,
                isDriver: false
            }
        case IS_DRIVER:
            return {
                ...state,
                isClient: false,
                isDriver: true
            }
        
        default:
            return state
    }
}

export default auth
