import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen');

export default StyleSheet.create({
    Container: {
        height,
        width,
        alignItems:'center'
    }
})