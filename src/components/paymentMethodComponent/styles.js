import { Dimensions, StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    marker: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 8
    },

    textDest: {
        fontSize: 17.5,
        fontWeight: '500',
        color: '#1a1a1a',
        paddingHorizontal: 9
    },

    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        marginVertical: 10,
    },

    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0d0d0d'
    },

    listCard: {
        width: '100%',
        backgroundColor: '#ffffff',
        marginVertical: 9,
        elevation: 3,
        padding: 10,
        borderRadius: 10
    },

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

    cashPayment: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#ffff',
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 6
    },

    iconWrapper: {
        height: 64,
        width: 64,
        borderRadius: 50,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },

    iconContent: {
        height: 32,
        width: 32,
        borderRadius: 50,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },

    textCash: {
        fontSize: 20,
        color: '#454545',
        fontWeight: '700'
    },

    textDefault: {
        fontSize: 19,
        color: '#c0c0c0c0',
        fontWeight: '600'
    },

    containerSheet: {
        width,
        height: height / 1.3,
        padding: 24,
        position: 'absolute',
        bottom: 0,
    },

    addCardWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20
    },

    cards: {
        fontSize: 17,
        fontWeight: '600',
        color: '#f5f5f5f5'
    },

    addBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    txtAdd: {
        fontSize: 17,
        color: colors.orange
    },

    cardView: {
        height: height / 2.6, 
        width: '100%' ,
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

    cardDetails: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        marginTop: 6,
    },

    view: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '45%'
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


    button: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15,
        padding: 20, 
        elevation: 3,
        marginBottom: 5
    },

    cashTextWrapper: {
        paddingHorizontal: 15
    },

    FlatList: {
        height: height / 2,
    }
})