import { CLEAR_CARD_DATA, DELETE_CARD_INFO, GET_CARD_INFO } from "../../constants/actionTypes";

const paymentMethodReducer = (state, { type, payload })=> {
    switch (type) {
        case GET_CARD_INFO:
            return{
                ...state,
                data: payload
            }
        case DELETE_CARD_INFO: 
            return {
                ...state,
                deleteCard: payload
            }

        case CLEAR_CARD_DATA: 
            return {
                ...state,
                data: null
            }
    
        default:
            return state;
    }
}

export default paymentMethodReducer