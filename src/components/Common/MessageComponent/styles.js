import { StyleSheet } from "react-native";
import { colors } from "react-native-elements";

export default StyleSheet.create({
    msgWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: colors.error,
        borderRadius: 12
    },

    errorTxt: {
        fontSize: 17,
        color: colors.white,
        fontWeight: '400'
    }
})