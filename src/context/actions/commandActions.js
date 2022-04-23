import AsyncStorage from "@react-native-async-storage/async-storage"
import { t } from "i18next"
import { io } from "socket.io-client"
import { CLEAR_COMMAND_STATE, COMMAND_CREATE, COMMAND_DISTANCE_TIME, COMMAND_LOADING, COMMAND_PAYMENT_COMPLETE, COMMAND_PAYMENT_METHOD, COMMAND_PAYNOW, COMMAND_RESERVATION_DATE_TIME, ERROR_COMMAND, GET_COMMAND_SHIPPING, GET_COMMAND_SOURCE, GET_DROP_ADDRESS, GET_ORDER, GET_ORDER_SHIPPING, GET_PICK_ADDRESS, GET_SHIPPING_ADDRESS, } from "../../constants/actionTypes"
import { axiosPaymentInstance } from "../../helpers/axiosInterceptor"
import { showError, showSuccess } from "../../helpers/flashMessage"
import { confirmPay, createDoc } from "../../servers/firebase"


const socket = io('wss://be-berline.herokuapp.com/client/:8080')
 
export const setReservationDateTime = ( date, time ) => (dispatch) =>{
    console.log(`date`, date)
    dispatch({
        type: COMMAND_RESERVATION_DATE_TIME,
        payload: { date, time }
    })
}

export const getCommandDateTime = ( distance, time ) => (dispatch) =>{
    dispatch({
        type: COMMAND_DISTANCE_TIME,
        payload: { distance, time }
    })
}

export const getPaymentMethod = ( data ) => (dispatch) =>{
    console.log(`data`, data)
    dispatch({
        type: COMMAND_PAYMENT_METHOD,
        payload: data
    })
}

export const clearCommandState = () => (dispatch) =>{
    dispatch({
        type: CLEAR_COMMAND_STATE,
    })
}

export const getShipping = ( depart, destination, country ) => (dispatch) => ( onSuccess ) =>{
    dispatch({
        type: COMMAND_LOADING,
    })
    axiosPaymentInstance.post('adresse_shipping/', { depart, destination, country, city: '' })
    .then(( res ) =>{
        console.log(`shipping`, res.data)
        dispatch({
            type: GET_COMMAND_SHIPPING,
            payload: res.data
        })
        onSuccess();
    } )
    .catch((err)=>{
        dispatch({
            type: ERROR_COMMAND
        })
        console.log(`err.response.data`, err.response)
        showError(t('ErrRegOrder'));
    })
}

export const getSource = (order_id) => ({ card_number, exp_date, CVC }) => (dispatch) => ( onSuccess ) =>{

    var split_date = exp_date?.split("-")
    let exp_month = split_date[0];
    let exp_year = split_date[1];
    let cvc = CVC;
    let number = card_number;

    console.log(`exp_year`, exp_year)


    dispatch({
        type: COMMAND_LOADING,
    })
    axiosPaymentInstance.post('source/', { number, exp_month, exp_year, cvc })
    .then(( res ) =>{
        console.log(`source`, res.data)
        dispatch({
            type: GET_COMMAND_SOURCE,
            payload: res.data
        })
        // source Object {
        //     "source": Object {
        //       "customer": null,
        //       "id": 15,
        //       "source_id": "src_1K9xMfGnHAInfXT4SvNQ0qv7",
        //       "type_source": null,
        //     },
        //   }
        axiosPaymentInstance.post('paiement_order/', {
            order : order_id,
            source_id : res.data.source.id,
            currency : "EUR",
            confirm : "True",
            invoice : order_id
        })
        .then((res)=> {
            console.log('paymentComplete :>> ', res.data);
            dispatch({
                type: COMMAND_PAYMENT_COMPLETE,
                payload: res.data
            })
            onSuccess()
            showSuccess(t('PaymentSuccess'))
            confirmPay(order_id)
        })
       
    } )
    .catch((err)=>{
        dispatch({
            type: ERROR_COMMAND
        })
        // console.log(`err.response.data`, err.response.data)
        showError(t('VerifyAuthFields'));
    })
}

const storeCommand = async (info)=>{
    console.log(`data`, info)
    const { id } = info;
    var commandData = {};
    const Command = await AsyncStorage.getItem('command');
    if ( Command ) {
        commandData = {...JSON.parse(Command), [id]:info};
        AsyncStorage.setItem('command', JSON.stringify(commandData))
        const newOrder = await AsyncStorage.getItem('command')
    } else {
        AsyncStorage.setItem('command', JSON.stringify(info))
    }

}

export const createOrder = ( amount, currency, priceservice, customer, shipping, pickUp, drop, distance, ) => (dispatch) => (onSuccess) =>{
    dispatch({
        type: COMMAND_LOADING,
    })
    console.log('object :>> ', amount, currency, priceservice, customer, shipping,);
    axiosPaymentInstance.post('order/', { amount, currency, priceservice, customer, shipping })
    .then(( res ) =>{
        storeCommand({ id: res.data.id, pickUp, drop, distance, });
        console.log(`Order`, res.data)
        dispatch({
            type: COMMAND_CREATE,
            payload: res.data
        })
        AsyncStorage.setItem('current_order_id', JSON.stringify(res.data.id))
        onSuccess();
        showSuccess(t('OrderRegSuccess'))
        createDoc(res.data.customer.id, res.data.id);
    } )

    .catch((err)=>{
        dispatch({
            type: ERROR_COMMAND
        })
        showError(t('VerifyAuthFields'))
        console.log(`err`, err.response)
    })
}

export const getPickAddress = ( latitude, longitude, address ) => (dispatch) => {
        axiosPaymentInstance.post('depart/', { latitude, longitude, address })
        .then((res)=>{
            console.log(`res.data`, res.data)
            dispatch({
                type: GET_PICK_ADDRESS,
                payload: res.data
            })
        }).catch((err)=>{
            dispatch({
                type: ERROR_COMMAND
            })
            showError(err.response.data.message)
        })
    }
    
    export const getDropAddress = (latitude, longitude, address) => (dispatch) => ( onSuccess ) => {
        dispatch({
            type: COMMAND_LOADING
        })
        axiosPaymentInstance.post('destination/', { latitude, longitude, address })
        .then((res)=>{
            console.log(`dropaddress`, res.data)
            dispatch({
                type: GET_DROP_ADDRESS,
                payload: res.data
            })
            showSuccess(t('TripRegSucc'));
            onSuccess();
        }).catch((err)=>{
            dispatch({
                type: ERROR_COMMAND
            })
            showError(t('DropAddErr'));
        })
    }

    export const getShippingAddress = ( ship_id ) => (dispatch) =>{
        dispatch({
            type: COMMAND_LOADING,
        })
        axiosPaymentInstance.get(`adresse_shipping/${ship_id}/`)
        .then(( res ) =>{
            dispatch({
                type: GET_SHIPPING_ADDRESS,
                payload: res.data
            })
        } )
        .catch((err)=>{
            dispatch({
                type: ERROR_COMMAND
            })
            console.log(`err.response.data`, err.response)
            showError(t('ErrOccurred'))
        })
    }
    
    export const getOrder = ( order_id ) => (dispatch) =>{
        dispatch({
            type: COMMAND_LOADING,
        })
        console.log(`order_id`, order_id)
        axiosPaymentInstance.get(`order/${order_id}/`)
        .then(( res ) =>{
            dispatch({
                type: GET_ORDER,
                payload: { order: res.data }
            })
            console.log('curDrive :>> ', res.data);
            dispatch({
                type: COMMAND_LOADING,
            })
            axiosPaymentInstance.get(`adresse_shipping/${res.data.shipping.id}/`)
            .then(( res ) =>{
                dispatch({
                    type: GET_ORDER_SHIPPING,
                    payload: res.data
                })
                console.log('objecres.data :>> ', res.data);
            } )
            .catch((err)=>{
                dispatch({
                    type: ERROR_COMMAND
                })
                console.log(`err.response.data`, err)
                showError(t('ErrOccurred'))
            })
        } )
        .catch((err)=>{
            dispatch({
                type: ERROR_COMMAND
            })
            console.log(`err.response.data`, err)
            showError(t('ErrOccurred'))
        })
    }

    export const payNw = () => (dispatch) => {
        dispatch({
            type: COMMAND_LOADING
        })

        dispatch({
            type: COMMAND_PAYNOW
        })
    }

