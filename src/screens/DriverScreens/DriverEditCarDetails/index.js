import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import EditCarDetailsComponent from '../../../components/EditCarDetailsComponent';
import {GlobalContext} from '../../../context/provider'
import { getDriverCarDetails } from '../../../context/actions/driverActions';

const CarDetails = () => {


    const { driverState: { loading }, driverStateDispatch } = useContext(GlobalContext)
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState('')
    

    const onChange = ({name, value}) => {

        if ( value !== "" ){   
            setErrors((prev) => {
                return { ...prev, [name]: null }
            })   
        } else {
            setErrors((prev) => {
                return { ...prev, [name]: "Ce champ est obligatoire" }
            })
        }
        console.log(`form-->`, form)
        setForm({ ...form, [name]: value })
    }

    const onSubmit = ()=> {
        if (!form.Marque) {
            setErrors((prev) => {
                return { ...prev, Marque: 'Veuillez entrer la marque du vehicule ' }
            })
        }

        if (!form.Modele) {
            setErrors((prev) => {
                return { ...prev, Modele: 'Veuillez entrer le modele du vehicule ' }
            })
        }

        if (!form.Places) {
            setErrors((prev) => {
                return { ...prev, Places: 'Veuillez entrer le nombre de place du vehicule ' }
            })
        }

        if (!form.Annee) {
            setErrors((prev) => {
                return { ...prev, Annee: "Veuillez entrer l'annee du vehicule " }
            })
        }

        if (!form.Couleur) {
            setErrors((prev) => {
                return { ...prev, Couleur: "Veuillez entrer la couleur du vehicule " }
            })
        }

        if (  Object.values(form).every( item => item.trim().length > 0) 
        && Object.values(form).length === 5 
        && Object.values(errors).every( item => !item ) ) {
            getDriverCarDetails(form)(driverStateDispatch)
        }
    }

    return (
        <View >
            <EditCarDetailsComponent loading = {loading} onChange = { onChange } onSubmit = { onSubmit } errors = { errors } />
        </View>
    )
}

export default CarDetails
