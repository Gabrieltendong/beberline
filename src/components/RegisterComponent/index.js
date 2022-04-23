import { useNavigation } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ButtonToggleGroup from 'react-native-button-toggle-group'
import colors from '../../assets/themes/colors'
import Container from '../../components/Common/Container'
import CustomButton from '../../components/Common/CustomButton'
import Input from '../../components/Common/Input'
import { HOME, LOGIN } from '../../constants/routes'
import { selectUserType } from '../../context/actions/Register/auth'
import RadioButtonRN from 'radio-buttons-react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { GlobalContext } from '../../context/provider'
import styles from './styles'
import Icon from '../Common/Icon'
import { useTranslation } from 'react-i18next'

const RegisterComponent = ({ onChange, onSubmit, form, errors, route, data }) => {
    
    const { navigate } = useNavigation()
    const [value, setValue] = React.useState('');
    const { authDispatch, authState: { loading, error, userType } } = useContext(GlobalContext);
    const [radio, setRadioValue] = useState()
    const [ isSecureTextEntry, setIsSecureTextEntry ] = useState(true)
    const { t, i18n } = useTranslation();

    const onSelect = (val)=> {
        setValue(val);
        console.log(`val`, val)
        selectUserType(val)(authDispatch)
    }

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

    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: t('Client'),
        value: 'Client'
    }, {
        id: '2',
        label: t('Driver'),
        value: 'Chauffeur'
    }]

    function setInitials() {
        if ( userType == 'Chauffeur' ) {
            return 2
        }
        if ( userType == 'Client' ) {
            return 1
        }
        if ( userType == '' ) {
            return undefined
        }
    }

    return (
        <View style = { styles.Container } >
            <Container>
            <Image style = { styles.image } source = { require('../../assets/images/BEBerline_Logo.png') } />
            <Text style = { styles.headerText } >
                { t('Create Your Account') } { getUserType() }
            </Text>
            
            <RadioButtonRN
                data={radioButtonsData}
                selectedBtn = { (e) => onSelect(e?.value) }
                box = {false}
                textStyle = {{ fontSize: 17, color: '#484848', paddingLeft: 10, textAlign: 'center' }}
                style = {styles.radioGroup}
                boxStyle = {{ width: 150, alignItems: 'center', justifyContent: 'center' , paddingHorizontal: 10, alignSelf: 'center' }}
            />
            <Input 
                iconPosition = 'right' 
                label =  { t('Fname') }
                onChangeText = { (value) => {
                    onChange({ name: 'firstName', value })
                } }
                error = { errors.username || error?.username?.[0] }
            />
            <Input 
                keyboardType = 'default' 
                iconPosition = 'left' 
                label = { t('Lname') }
                onChangeText = { (value) => {
                    onChange({ name: 'lastName', value })
                } }
                error = { errors.telephone }
            />
            <Input 
                keyboardType = 'email-address' 
                iconPosition = 'left' 
                label = { t('Email') } 
                onChangeText = { (value) => {
                    onChange({ name: 'email', value })
                } }
                error = { errors.email }
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
            <CustomButton loading = {loading} disabled = { loading } onPress = { onSubmit } primary = {true} title = { t('Create Account') } />
            <View style = { styles.section } >
                <Text>{ t('Have Account') } ?</Text>
                <TouchableOpacity onPress = { () => navigate(LOGIN)  } >
                    <Text style = { styles.txtSection } >{ t('Login') }</Text>
                </TouchableOpacity>
            </View>
            
        </Container>
        </View>
        
    )
}

export default RegisterComponent
