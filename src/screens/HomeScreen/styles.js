import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    Container: {
        alignItems:'center',
        justifyContent: 'center',
        width,
        height,
    },
})