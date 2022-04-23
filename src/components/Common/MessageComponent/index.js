import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '../Icon'
import styles from './styles'

const MessageComponent = ({ title, retryFn }) => {
    const [ dismiss, setDismiss ] = useState(false)
    return (
        <>
         {
            dismiss ? null : (
                typeof(title) != 'undefined' ? (
                <View style = { styles.msgWrapper }>
                    <Text style = {styles.errorTxt} > {title} </Text>
                    { typeof(retryFn) === 'function' && <TouchableOpacity><Text>Retry</Text></TouchableOpacity> }
                    <TouchableOpacity onPress = { ()=> {
                        setDismiss(!dismiss)
                        setTimeout(()=>{ setDismiss(!dismiss) }, 3000)
                    } } >
                        <Icon iconType = 'antdesign' name = 'closecircleo' size = {28} color = 'white' />
                    </TouchableOpacity>
                </View>
            )  : null
            )
         }   
        </>
    )
}

export default MessageComponent
