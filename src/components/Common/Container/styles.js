import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10,
        width,
        
    }
})