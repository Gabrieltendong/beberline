import React, { createContext, useReducer } from 'react'
import authInitialState from './initialsStates/authState';
import auth from './reducers/auth';
import command from './reducers/commandReducer';
import commandInitialStates from './initialsStates/commande'
import driverStateReducer from './reducers/dirverStatesReducer';
import driverStates from './initialsStates/driverStates';
import paymentMethodsReducer from './reducers/paymentMethodsReducer';
import paymentInitialStates from './initialsStates/paymentsMethods';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {

    const [ authState, authDispatch ] = useReducer( auth, authInitialState );
    const [ commandState, commandDispatch ] = useReducer( command, commandInitialStates )
    const [ driverState, driverStateDispatch ] = useReducer( driverStateReducer, driverStates )
    const [ paymentState, paymentStateDispatch ] = useReducer( paymentMethodsReducer, paymentInitialStates );


    return (
        <GlobalContext.Provider value = {{ authState, authDispatch, commandState, commandDispatch, driverState, driverStateDispatch, paymentState, paymentStateDispatch }} >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
