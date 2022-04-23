import React, { useState, useContext } from 'react'
import LoginComponent from '../../components/LoginComponent'
import {  useRoute } from '@react-navigation/core';
import { useFocusEffect, useNavigation,  } from '@react-navigation/core';
import{ GlobalContext }from '../../context/provider'
import loginActions from '../../context/actions/Register/loginActions'
import { clearAuthState, clearUserType } from '../../context/actions/Register/auth';
import { showError } from '../../helpers/flashMessage';
import { useTranslation } from 'react-i18next';

const Login = ({route}) => {

    const { params } = useRoute()
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState('')
    const { t, i18n } = useTranslation();
    

    const { authDispatch, authState: { loading, error, userType } } = useContext(GlobalContext);

    React.useEffect(() => {
       if (params?.data) {
           console.log(`params`, params)
           setForm({...form, email: params?.data.user.email})
       }
    }, [params]);

    // useFocusEffect(
    //     React.useCallback(()=>{
    //         return () => {
    //             if ( userType != '' ) {
    //                 clearUserType()(authDispatch);
    //             }
    //         }
    //     }, [userType]),
    // )


    const onChange = ({name, value})=> {

        if ( value !== "" ){

            if ( name == "password" ) {
                if (value.length < 6) {
                    setErrors((prev) => {
                        return { ...prev, [name]:  t('ErrName')  }
                    })
                } else {
                    setErrors((prev) => {
                        return { ...prev, [name]: null }
                    })   
                }
            } else {
                setErrors((prev) => {
                    return { ...prev, [name]: null }
                })   
            }
        } else {
            setErrors((prev) => {
                return { ...prev, [name]: t('ErrObligatory') }
            })
        }

        setForm( { ...form, [name]: value })
    }

    const onSubmit = ()=> {
        

        if (!form.email) {
            setErrors((prev) => {
                return { ...prev, email: t('ErrUsername') }
            })
        }

        if (!form.password) {
            setErrors((prev) => {
                return { ...prev, password: t('ErrPassword') }
            })
        }

        if ( Object.values(form).every( item => item.trim().length > 0) 
        && Object.values(form).length === 2 
        && Object.values(errors).every( item => !item ) && userType != '' ) {
            loginActions(form)(authDispatch)(userType);
            clearAuthState()(authDispatch)
    } else {
        showError(t('ErrAccType'))
    }
    }

    return (
       <LoginComponent loading = {loading} error = {error} route = {route} onChange = { onChange } onSubmit = { onSubmit } form = {form} errors = { errors } />
    )
}

export default Login
