import React, { useEffect } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import colors from '../../../assets/themes/colors'
import styles from './styles'

const Input = ({ label, error, icon, iconPosition, setIsSecureTextEntry, isSecureTextEntry, showDatepicker, setInputRef, ...props }) => {

    const [ focused, setFocused ] = React.useState(false)
    const inputRef = React.useRef()
    
    if (typeof(setInputRef) =='function' ) {
        setInputRef(inputRef)
    }

    const getBorderColor = ()=> {
        if (focused) {
            return colors.primary;
        } 

        else if ( error ) {
            return colors.danger
        }

        else {
            return 'lightgrey'
        }
    }

    const getIconDirection = () => {
        if ( iconPosition == 'left' ) {
            return 'row-reverse'
        }

        if ( iconPosition == 'right' ) {
            return 'row'
        }
    }
 

    const focuse = ()=>{
        setFocused(true);
        if ( typeof(showDatepicker) === 'function' ) {
            showDatepicker();
        }
    }

    return (
        <View style = { styles.globalWrapper } >

            { label && <Text style = { styles.label } >{label}</Text> }

            <View style = { [styles.inputWrapper, { borderColor: getBorderColor() }  ] } >

                <View style = { [ styles.inputContent, { flexDirection: getIconDirection(), } ] } >
                    <TextInput ref = {inputRef} onFocus = { ()=> { focuse() } } onBlur = { ()=> setFocused(false) } style = {[ styles.textInput ]} { ...props }/>
                    <TouchableOpacity onPress = { ()=> setIsSecureTextEntry(!isSecureTextEntry) } >
                        { icon && icon }
                    </TouchableOpacity>
                </View>
            </View>
            { error && <Text style = { styles.error } >{error}</Text> }
        </View>
    )
}

export default Input
