import React, { useContext, useState } from 'react'
import { getPaymentMethod, getSource } from '../../context/actions/commandActions'
import { View, Text } from 'react-native'
import OnTripComponent from '../../components/OnTripComponent'
import { GlobalContext } from '../../context/provider'
import { useTranslation } from 'react-i18next'

const OnTrip = () => {

    const { commandState: { paymentMethod, reservationDay, reservationTime, loading, currentDrive }, commandDispatch } = useContext(GlobalContext)

    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState('')

    const { t, i18n } = useTranslation();


    function validateCreditCardNumber(cardNumber) {
        cardNumber = cardNumber.split(' ').join("");
        if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
            return false;
        }
        var carray = new Array();
        for (var i = 0; i < cardNumber.length; i++) {
            carray[carray.length] = cardNumber.charCodeAt(i) - 48;
        }
        carray.reverse();
        var sum = 0;
        for (var i = 0; i < carray.length; i++) {
            var tmp = carray[i];
            if ((i % 2) != 0) {
                tmp *= 2;
                if (tmp > 9) {
                    tmp -= 9;
                }
            }
            sum += tmp;
        }
        return ((sum % 10) == 0);
    }

    const onChange = ({name, value})=>{
        if ( value != "" ){

            if ( name == "CVC" ) {
                if (value.length > 5) {
                    setErrors((prev) => {
                        return { ...prev, [name]: t('InvalidCode') }
                    })
                } else {
                    setErrors((prev) => {
                        return { ...prev, [name]: null }
                    })   
                }
            }

          

            if ( name == "card_number" ) {   
                if (value.length == 16) {
                   if ( validateCreditCardNumber(value) ) {
                    setErrors((prev) => {
                        return { ...prev, [name]: null }
                    }) 
                   } 
                //    else {
                //     setErrors((prev) => {
                //         return { ...prev, [name]: "Numero de carte non valide" }
                //     })  
                //    }
                } else {
                    setErrors((prev) => {
                        return { ...prev, [name]: t('ErrCardNumb') }
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

        setForm({...form, [name]: value})
        console.log(`form`, form)
    }

    const onSubmit = ()=> {
        

        if (!form.CVC) {
            setErrors((prev) => {
                return { ...prev, CVC: t('EnterCVCCode') }
            })
        }
        
        if (!form.card_number) {
            setErrors((prev) => {
                return { ...prev, card_number: t('EnterCardNumb') }
            })
        }

        if (!form.exp_date) {
            setErrors((prev) => {
                return { ...prev, exp_date: t('EnterDate') }
            })
        }

        if ( Object.values(form).every( item => item.trim().length > 0) 
        && Object.values(form).length === 3
        && Object.values(errors).every( item => !item ) ) {
            getSource(currentDrive.id)(form)(commandDispatch)( ()=> console.log('Payment complete') );
            getPaymentMethod(form)(commandDispatch);
    }
    }

    return (
        <View>
            <OnTripComponent onChange = { onChange } onSubmit = { onSubmit } setForm = {setForm} form = {form} errors = { errors } setErrors = {setErrors} />
        </View>
    )
}

export default OnTrip
