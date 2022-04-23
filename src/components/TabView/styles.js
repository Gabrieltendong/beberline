import { Dimensions, StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";
const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    tabContent: {
        width,
        height: height - 300,
        position: 'absolute',
        bottom: 0,
        borderRadius: 35,
        backgroundColor: colors.secondary
    }
})