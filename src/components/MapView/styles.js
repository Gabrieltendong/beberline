import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    conatiner: {
        height,
        width,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
})