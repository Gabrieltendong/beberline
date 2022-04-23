import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        height,
        width,
    },

    imgWrapper: {
        width,
        height: height / 3.1,
        alignItems: 'center',
        backgroundColor: '#c0c0c0c0',
       
    },

    BottomSheet: {
        width,
        height,
        padding: 24,
        position: 'absolute',
        bottom: 0,
      },

    editCardetails: {
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        width,
        position: 'absolute',
        paddingTop: 40,
        zIndex: 1
    },

    editCardetailsBtn: {
        fontSize: 38,
        fontWeight: '900',
        color: '#f1f1f1f1',
        textAlign: 'center',
    },

    btn: {
        height: 56,
        width: width - 35,
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    headerImage: {
        height: '25%'
    }

})