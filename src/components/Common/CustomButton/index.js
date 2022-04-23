import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../../../assets/themes/colors'
import styles from './styles'

const CustomButton = ({ title, disabled, danger, loading, onPress, primary, styless }) => {

    const getBgColor = ()=> {
        if (primary) {
            return colors.primary
        }

        if (danger) {
            return colors.danger
        }

        if (disabled) {
            return colors.grey
        }
    }

    return (
        <TouchableOpacity onPress = { onPress } disabled = { disabled } style = {[ styles.btnWrapper, { backgroundColor: getBgColor() }, styless ]} >
            <View style = { styles.btnContent } >
                { loading && <ActivityIndicator color = 'white' /> }
                <Text style = { styles.btnText } > { title } </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton
