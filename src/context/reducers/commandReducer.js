import { CLEAR_AUTH_DATA, CLEAR_COMMAND_STATE, COMMAND_CREATE, COMMAND_DISTANCE_TIME, COMMAND_LOADING, COMMAND_PAYMENT, COMMAND_PAYMENT_COMPLETE, COMMAND_PAYMENT_METHOD, COMMAND_PAYNOW, COMMAND_RESERVATION_DATE_TIME, ERROR_COMMAND, GET_CLIENT_COMMANDS, GET_COMMAND_SHIPPING, GET_COMMAND_SOURCE, GET_DROP_ADDRESS, GET_ORDER, GET_ORDER_SHIPPING, GET_PICK_ADDRESS,} from "../../constants/actionTypes";

const commandReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_PICK_ADDRESS:
            return {
                ...state,
                pickUp: payload
            }
        case GET_DROP_ADDRESS:
            return {
                ...state,
                drop: payload,
                loading: false
            }
        case COMMAND_RESERVATION_DATE_TIME:
            return {
                ...state,
                reservationDay: payload.date,
                reservationTime: payload.time,
                isReservation: true
            }
        case COMMAND_DISTANCE_TIME:
            return {
                ...state,
                distance: payload.distance,
                time: payload.time,
            }

        case GET_COMMAND_SOURCE:
            return {
                ...state,
                paymentMethod: payload,
            }

        case COMMAND_LOADING:
            return {
                ...state,
                loading: true
            }

        case COMMAND_PAYNOW:
            return {
                ...state,
                payNow: true,
                loading: false
            }

        case COMMAND_PAYMENT_COMPLETE:
            return {
                ...state,
                payComplete: true,
                loading: false
            }

        case COMMAND_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
            }

        case GET_COMMAND_SHIPPING:
            return {
                ...state,
                shipping: payload,
                loading: false
            }
        case COMMAND_CREATE:
            return {
                ...state,
                order: payload,
                loading: false
            }
        case ERROR_COMMAND:
            return {
                ...state,
                loading: false
            }
        case GET_CLIENT_COMMANDS:
            return {
                ...state,
                commandList: payload,
                loading: false
            }

        case GET_ORDER:
            return {
                ...state,
                currentDrive: payload.order,
                currentDriveShipping: payload.shipping,
                loading: false
            }
        case GET_ORDER_SHIPPING:
            return {
                ...state,
                currentDriveShipping: payload,
                loading: false
            }
    case CLEAR_COMMAND_STATE:
        return {
            ...state,
            paymentMethod: {},
            distance: '',
            time: '',
            isReservation: null,
            reservationDay: null,
            reservationTime: null,
            pickUp: {},
            drop: {},
            shipping: {}
        }
        default:
            return state
    }
}

export default commandReducer;