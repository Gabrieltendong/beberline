import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    Container: {
        height,
        width,
        backgroundColor: '#f1f1f1'
    },

    header: {
        width: '100%',
        height: height / 3.2,
        backgroundColor: colors.primary,
        position: 'absolute',
        top: 0
    },
})