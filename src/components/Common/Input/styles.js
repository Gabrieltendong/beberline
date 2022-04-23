import { StyleSheet } from "react-native";
import colors from "../../../assets/themes/colors";

export default StyleSheet.create({

    globalWrapper: {
        marginVertical: 6
    },

    inputWrapper: {
        height: 52,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'space-evenly'
        
    },

    textInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 3
    },

    inputContent: {
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    error: {
        color: colors.danger,
        fontSize: 14
    },

    label: {
        fontSize: 16,
        color: '#011627',
        fontWeight: '700',
        opacity: 0.6,
    }
})