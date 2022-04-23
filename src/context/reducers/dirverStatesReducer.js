import { DRIVER_ADDED_TO_COMMAND, DRIVER_STATE_ERROR, DRIVER_STATE_LOADING, GET_DAILY_COMMANDS, GET_DRIVER_CAR_DETAILS, GET_DRIVE_ADDRESS, GET_DRIVE_COMMANDS, GET_WEEKLY_COMMANDS } from "../../constants/actionTypes";

const driverStateReducer = ( state, {type, payload} ) => {
    switch (type) {
        case DRIVER_STATE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_DRIVER_CAR_DETAILS:
            console.log(`payload`, payload)
            return {
                ...state,
                vehicleDetails: payload,
                loading: false
            }
        case GET_DRIVE_COMMANDS: 
            return {
                ...state,
                commandList: payload,
                loading: false
            }
        case GET_DAILY_COMMANDS: 
            return {
                ...state,
                commandDailyList: payload,
                loading: false
            }
        case GET_WEEKLY_COMMANDS: 
            return {
                ...state,
                commandWeeklyList: payload,
                loading: false
            }
        case GET_DRIVE_ADDRESS: 
            return {
                ...state,
                currentDrive: payload,
                loading: false
            }
        case DRIVER_STATE_ERROR: 
            return {
                ...state,
                loading: false
            }
        case DRIVER_ADDED_TO_COMMAND: 
            return {
                ...state,
                isBusy: true,
                loading: false
            }
    
        default:
            return state
    }
}

export default driverStateReducer;