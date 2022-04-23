import { StyleSheet } from "react-native";
import colors from "../../../assets/themes/colors";

export default StyleSheet.create({

    container: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#b3d1ff',
        borderRadius: 7,
        marginTop: 20
    },

    btnText: {
        fontSize: 17,
        fontWeight: '600'
    },

    btnGroup: {
        padding: 6,
        height: 65,
        marginBottom: 10
    },

    radioGroup: {
        marginVertical: 5, 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    tarifDesc: {
        fontSize: 20,
        fontWeight: '500',
        color: '#909090',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 20
    },

    optionText: {
        fontSize: 18,
        color: '#A8A8A8',
        paddingLeft: 10,
        fontWeight:'700'
    },

    dateText: {
        fontSize: 16.7,
        paddingHorizontal: 6,
        color: '#a6a6a6a6'
    },

    dateTextError: {
        fontSize: 16.5,
        paddingHorizontal: 4,
        color: colors.danger
    },

    dateContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    }
    
})