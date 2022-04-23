import AsyncStorage from "@react-native-async-storage/async-storage"
import date from "date-and-time"
import { t } from "i18next"
import { DRIVER_ADDED_TO_COMMAND, DRIVER_STATE_ERROR, DRIVER_STATE_LOADING, GET_DAILY_COMMANDS, GET_DRIVER_CAR_DETAILS, GET_DRIVE_ADDRESS, GET_DRIVE_COMMANDS, GET_WEEKLY_COMMANDS } from "../../constants/actionTypes"
import { axiosPaymentInstance } from "../../helpers/axiosInterceptor"
import { showError } from "../../helpers/flashMessage"


export const getDriverCarDetails = (form) => (dispatch) => {
    dispatch({
        type: DRIVER_STATE_LOADING
    })
    console.log(`loading`);
   if (form) {
    dispatch({
        type: GET_DRIVER_CAR_DETAILS,
        payload: form
    })
    AsyncStorage.setItem('carDetails', JSON.stringify(form))
    console.log(`success`)
    console.log(`form`, form)
   }
}

export const addDriverToCommand = (order_id, driver_id) => (dispatch) => {
 
    dispatch({
        type: DRIVER_STATE_LOADING
    })
    fetch(`https://be-berline.herokuapp.com/payments/order/${order_id}/`, {
  method: 'PATCH',
  body: JSON.stringify({
    is_active: "True",
    driver: driver_id,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    dispatch({
        type: DRIVER_ADDED_TO_COMMAND,
        payload: json
    })  
    console.log("patch", json)})
    .catch((err)=> {
        dispatch({
            type: DRIVER_STATE_ERROR
        })
        console.log('err.response :>> ', err);
        showError(t('ErrDriverToCommand'))
    })
}

export const getAllCommands = () => (dispatch) => {
    let validCommand = [];
    dispatch({
        type: DRIVER_STATE_LOADING
    })
    axiosPaymentInstance.get('order/')
    .then((res) => {
            validCommand = res.data.filter(command => command.is_active != true)
           if (validCommand.length >= 1) {
                dispatch({
                    type: GET_DRIVE_COMMANDS,
                    payload: validCommand
                })
           }
    } )
    .catch((err)=>{
        dispatch({
            type: DRIVER_STATE_ERROR
        })
        showError(t('ErrProcess'))
    })
}

export const getAllDailyCommands = (driver_id) => (dispatch) => {
    // var commandData = {};
    // (
    //     async ()=> {
    //         const dailyCommandDate = await AsyncStorage.getItem('dailyCommandDate');
    //         const numbDailyCommand = await AsyncStorage.getItem('numbDailyCommand');
    //         const amtDailyCommand = await AsyncStorage.getItem('amtDailyCommand');
    //         if ( dailyCommandDate ) {
    //            console.log(`dailyCommandDate`, JSON.parse(dailyCommandDate));
    //            console.log(`amt`, JSON.parse(amtDailyCommand));
    //         } else {
    //             console.log('setting');
    //             AsyncStorage.setItem('amtDailyCommand', '0');
    //             AsyncStorage.setItem('numbDailyCommand', '0');
    //             AsyncStorage.setItem('dailyCommandDate', JSON.stringify(new Date()));
    //         }
    //     }
    // )();

    dispatch({
        type: DRIVER_STATE_LOADING
    })
    axiosPaymentInstance.get('order/')
    .then((res) => {
            let validCommand = res.data.filter(command => (command.order_service?.driver.id == driver_id && command.order_service?.date_order_service == date.format( new Date(), 'YYYY-MM-DD' ) ))
           if (validCommand.length >= 1) {
                dispatch({
                    type: GET_DAILY_COMMANDS,
                    payload: validCommand
                })
                console.log(`validCommand`, validCommand)
           }
    } )
    .catch((err)=>{
        dispatch({
            type: DRIVER_STATE_ERROR
        })
        console.log('err :>> ', err);
        showError(t('ErrProcess'));
    })
}

export const getAllWeeklyCommands = (driver_id) => (dispatch) => {

    dispatch({
        type: DRIVER_STATE_LOADING
    })
    console.log('driver_id :>> ', driver_id);
    axiosPaymentInstance.get('order/')
    .then((res) => {
            let validCommand = res.data.filter(command => command.order_service?.driver.id == driver_id)
           if (validCommand.length >= 1) {
                dispatch({
                    type: GET_WEEKLY_COMMANDS,
                    payload: validCommand
                })
               

           }
    } )
    .catch((err)=>{
        dispatch({
            type: DRIVER_STATE_ERROR
        })
        console.log('err :>> ', err);
        showError(t('ErrProcess'))
    })
}

export const getShippingAddress = ( ship_id ) => (dispatch) =>{
    dispatch({
        type: DRIVER_STATE_LOADING,
    })
    axiosPaymentInstance.get(`adresse_shipping/${ship_id}/`)
    .then(( res ) =>{
        dispatch({
            type: GET_DRIVE_ADDRESS,
            payload: res.data
        })
    } )
    .catch((err)=>{
        dispatch({
            type: DRIVER_STATE_ERROR
        })
        console.log(`err.response.data`, err.response)
        showError(t('ErrOccurred'))
    })
}


