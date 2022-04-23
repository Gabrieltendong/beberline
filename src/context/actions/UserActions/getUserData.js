import { GET_DRIVER_DATA, GET_USER_DATA } from "../../../constants/actionTypes"

export const getUserData = (userData) => dispatch => {
    dispatch({
        type: GET_USER_DATA,
        payload: userData
    })
}

export const getDriverData = (userData) => dispatch => {
    dispatch({
        type: GET_DRIVER_DATA,
        payload: userData
    })
}