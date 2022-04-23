import { StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";

export default StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 50
    },

    image: {
        height: 120,
        width: 120,
        borderRadius: 25,
        elevation: 3,
        marginVertical: 15
    },

    navBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20
    },

    btnText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary,
        marginLeft: 20,
        width: '75%',
    },


})