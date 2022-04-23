import { StyleSheet } from "react-native";
import colors from "../../../assets/themes/colors";

export default StyleSheet.create({
    btnWrapper: {
        height: 56,
        width: '85%',
        marginVertical: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        alignSelf: 'center'
    },

    btnContent: {
        flexDirection: 'row',
    },

    btnText: {
        paddingHorizontal: 4,
        fontSize: 15,
        fontWeight: '500',
        color: colors.secondary
    }
})