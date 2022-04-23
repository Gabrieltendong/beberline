import React, { useContext, useEffect, useState } from 'react'
import RegisterComponent from '../../components/RegisterComponent';
import { useFocusEffect, useNavigation,  } from '@react-navigation/core';
import envs from '../../configs/env';
import axiosInstance from '../../helpers/axiosInterceptor';
import Register, { clearAuthState } from '../../context/actions/Register/auth';
import { GlobalContext } from '../../context/provider';
import { LOGIN } from '../../constants/routes';
import { showError } from '../../helpers/flashMessage';
import { useTranslation } from 'react-i18next';

const SignUp = ({ route }) => {

    const { navigate } = useNavigation();
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState('')
    const { t, i18n } = useTranslation();
    const {authDispatch, authState: { error, loading, data, userType }} = useContext(GlobalContext);

    // useEffect(() => {
    //     
    // }, [data])

    useFocusEffect(
        React.useCallback(()=>{
            return () => {
                if (data || error) {
                    clearAuthState()(authDispatch) 
                }
            }
        }, [data, error]),
    )

    

    const onChange = ({name, value})=> {

        if ( value !== "" ){

            if ( name == "password" ) {
                if (value.length < 6) {
                    setErrors((prev) => {
                        return { ...prev, [name]: t('ErrName') }
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

        if (!form.firstName) {
            setErrors((prev) => {
                return { ...prev, firstName: t('ErrFname') }
            })
        }

        if (!form.lastName) {
            setErrors((prev) => {
                return { ...prev, lastName: t('ErrLname') }
            })
        }

        if (!form.email) {
            setErrors((prev) => {
                return { ...prev, email: t('ErrEmail') }
            })
        }

        if (!form.password) {
            setErrors((prev) => {
                return { ...prev, password: t('ErrPassword') }
            })
        }



        if ( Object.values(form).every( item => item.trim().length > 0) 
            && Object.values(form).length === 4 
            && Object.values(errors).every( item => !item ) && userType != '' ) {
                Register(form)(authDispatch)(userType)( (response)=> { navigate(LOGIN, {data: response}) } );
        } else {
            showError(t('ErrAccType'))
        }
    }
 
    return (
        <RegisterComponent  loading = { loading } data = { data } route = { route } onChange = { onChange } onSubmit = { onSubmit } form = {form} errors = { errors }  />
    )
   
}

export default SignUp
