import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Container from '../../components/Common/Container'
import CustomButton from '../../components/Common/CustomButton'
import Input from '../../components/Common/Input'
import { REGISTER } from '../../constants/routes'
import { selectUserType } from '../../context/actions/Register/auth'
import { GlobalContext } from '../../context/provider'
import Icon from '../Common/Icon'
import MessageComponent from '../Common/MessageComponent'
import RadioButtonRN from 'radio-buttons-react-native';
import styles from './styles'
import LanguageSelector from '../Common/LanguageSelector'
import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'




const LoginComponent = ({ error, loading, onChange, onSubmit, form, errors }) => {

    const { authState: { isLoggedIn, userType }, authDispatch } = useContext(GlobalContext)
    const { navigate } = useNavigation()
    const [value, setValue] = React.useState('');
    const [ isSecureTextEntry, setIsSecureTextEntry ] = useState(true)
    const { t, i18n } = useTranslation()
    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: t('Client'),
        value: 'Client'
    }, {
        id: '2',
        label: t('Driver'),
        value: 'Chauffeur'
    }]
    const getUserType = ()=> {
        if ( userType == 'Client' ) {
            return <Text style = { styles.headerText } >{ t('Client') }</Text>
        }

        if ( userType == 'Chauffeur' ) {
            return <Text style = { styles.headerText } > { t('Driver') } </Text>
        }

        if ( userType == '' ) {
            return null
        }
    }
    const onSelect = (val)=> {
        setValue(val);
        selectUserType(val)(authDispatch)
    }
    useEffect(() => {
        const socket = io("http://192.168.115.23:8080");
        socket.on("connect", ()=> {
            socket.emit("notify_paiement", { command_ID: 2, driver_ID: 4, client_ID: 6 })
        })
        return () => {
           
        }
    }, [0])
    return (
        <View style = { styles.Container } >
            <Container>
            <LanguageSelector />
            <Image style = { styles.image } source = { require('../../assets/images/BEBerline_Logo.png') } />
            <Text style = { styles.headerText } >
                { t('Connect to account') } { getUserType() }
            </Text>
            <RadioButtonRN
                    data={radioButtonsData}
                    selectedBtn = { (e) => onSelect(e?.value) }
                    box = {false}
                    textStyle = {{ fontSize: 17, color: '#484848', paddingLeft: 10, textAlign: 'center' }}
                    style = {styles.radioGroup}
                    boxStyle = {{ width: 170, alignItems: 'center', paddingHorizontal: 10 }}
                />
            <Input 
                iconPosition = 'right' 
                label = {t('Email')} 
                keyboardType = 'email-address' 
                value = { form.email || null }
                onChangeText = { (value) => {
                    onChange({ name: 'email', value })
                } }
                error = { errors.username }
            />
            
            <Input 
                iconPosition = 'right' 
                setIsSecureTextEntry = { setIsSecureTextEntry }
                isSecureTextEntry = { isSecureTextEntry }
                secureTextEntry = { isSecureTextEntry }
                label = { t('Password') }  
                icon = { isSecureTextEntry ? <Icon iconType = 'materialicons' name = 'visibility-off' color = '#48484848' size = {28} /> : <Icon iconType = 'materialicons' name = 'visibility' color = '#000111' size = {28} /> }
                onChangeText = { (value) => {
                    onChange({ name: 'password', value })
                } }
                error = { errors.password }
            />

            <MessageComponent title = { error?.message || error?.error }  />
            
            <CustomButton loading = {loading} disabled = {loading} onPress = { onSubmit } primary = {true} title = { t('Login') } />
            <View style = { styles.section } >
                <Text>{ t('New Account') } ?</Text>
                <TouchableOpacity onPress = { () => navigate(REGISTER)  } >
                    <Text style = { styles.txtSection } >{ t('Register') }</Text>
                </TouchableOpacity>
            </View>
        </Container>
        </View>
        
    )
}

export default LoginComponent
