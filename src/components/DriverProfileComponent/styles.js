import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        height,
        width, 
    },

    imgWrapper: {
        width,
        height: height / 3.1,
    },

    editCardetails: {
        position: 'absolute',
        bottom: 10,
        right: 20
    },

    editCardetailsBtn: {
        fontSize: 18,
        fontWeight: '900',
        color: '#f1f1f1f1'
    },

    image: {
        flex: 1,
        justifyContent: "center",
        height: height / 3.1,
    },

    profileWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width,
        minHeight: 50,
        paddingHorizontal: 10,
        marginBottom: 20
    },

    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary
    },

    editProfileBtn: {
        fontSize: 18,
        fontWeight: '900',
        color: '#c0c0c0c0'
    },

    sideProfile: {
        paddingHorizontal: 7
    },

    navBtn: {
        width,
        height: height / 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0e0',
        paddingHorizontal: 10,

    },

    btnText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary,
        marginLeft: 20,
        width: '75%',
    },
})