import { StyleSheet, Dimensions } from "react-native";
import { colors } from "react-native-elements";

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    headerText: {
        color: '#f1f1f1',
        fontSize: 48,
        fontWeight: '700'
    },

    headerFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 75,
    },

    button: {
        height: height / 4.7,
        width: width - 10,
        alignSelf: 'center',
        borderRadius: 15,
        padding: 20, 
        elevation: 3
    },

    text: {
        fontSize: 20,
        color: colors.white,
        fontWeight: '600'
    },

    cardNo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 56
    },

    cardInput: {
        width: '20%',
        height: 45,
        textAlign: 'center',
        fontSize: 32,
        letterSpacing: 5,
        color: '#f1f1f1'
    },

    textDetails: {
        fontSize: 18,
        color: '#e8e8e8e8'
    },

    inputDetails: {
        height: 45,
        fontSize: 22,
        color: '#ffff'
    },

    cardForm: {
        height: height / 2.4 ,
        bottom: 0,
        backgroundColor: '#f5f5f5',
        marginTop: 25,
        borderRadius: 15,
        paddingVertical: 20,
        width: '100%'
    },

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },

    buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    },
})