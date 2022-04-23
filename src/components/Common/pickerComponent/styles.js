import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colors from "../../../assets/themes/colors";

export default StyleSheet.create({

    globalWrapper: {
        marginVertical: 6
    },

    inputWrapper: {
        height: 60,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        backgroundColor: '#f1f1f1'
        
    },

    cardInput: {
        width: '25%',        
    },

    textInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 3,
        flexDirection: 'row',
    },

    inputContent: {
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#90e'
    },

    paymentBtn: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 4
    },

    btnWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-around",
        flexDirection: 'row',
        width: '100%',
    },

    textConfig: {
        fontSize: 17,
        color: colors.primary,
        fontWeight: '700',        
    },

    textModifier: {
        fontSize: 17,
        color: colors.secondary,
        fontWeight: '700'
    },

    textDelete: {
        fontSize: 17,
        color: colors.danger,
        fontWeight: '700'
    }
})