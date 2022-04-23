import { StyleSheet,Dimensions } from 'react-native';
import colors from '../../../assets/themes/colors';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    Container: {
        height,
        width,
    },

    addressWrapper: {
        alignSelf: 'center',
        maxWidth: width - 10,
        backgroundColor: '#ffffffff',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        padding: 20,
        marginTop: 10
    },

    addressText: {
        textAlign: 'center',
        color: colors.orange,
        fontSize: 14,
        textTransform: 'uppercase'
    },

    address: {
        textAlign: 'center',
        color: '#585858',
        fontSize: 14,
        width: '90%',
        alignSelf: 'center',
        fontWeight: '500',
        letterSpacing: 2
    },

    iconDirection: {
        position: 'absolute',
        right: 0
    },

    bottomWrapper: {
        width,
        paddingVertical: 20,
        paddingHorizontal: 10,
        position: 'absolute',
        borderRadius: 15,
        bottom: 25,
        backgroundColor: '#f2f2f2f2'
    },

    headerText: {
        fontSize: 20,
        color: '#d0d0d0d0'
    },

     sheetContent: {
        maxHeight: height / 8.4,
        width: '100%', 
        backgroundColor:'#ffffff', 
        padding: 15, 
        borderRadius: 9,
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    rideInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        height: '95%',
        paddingHorizontal: 8
    },

    footerRow: {
        paddingVertical: 8,
        height: '65%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    textFooter: {
        fontSize: 16,
        color: '#454545',
        fontWeight: '900',
    },

    textIndice: {
        fontSize: 14,
        color: '#dcdcdc',
        fontWeight: '700',
    },

    bottomBtn: {
        width: width - 25,
        height: 56,
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 15,
        alignSelf: 'center'
    }
})