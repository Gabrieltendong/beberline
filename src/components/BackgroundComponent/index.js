import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { View, Text, Platform } from 'react-native'
import colors from '../../assets/themes/colors'
import { HOME } from '../../constants/routes'
import RoundedBtn from '../RoundedBtn'
import styles from './styles'

const BackgroundComponent = ({children}) => {

    return (
        <View style = {styles.Container} >
            <View style = { styles.header } >
                
            </View>
            {children}
        </View>
    )
}

export default BackgroundComponent
