import { StyleSheet, Dimensions } from "react-native";
import colors from '../../assets/themes/colors'

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },

    btnComp: {
        width,
        height: height / 7.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnWrapper: {
        height: 95,
        width: width / 2.3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 3,
        marginHorizontal: 20,
        padding: 10
    },

    textEuro: {
        fontSize: 42,
        color: colors.orange
    },

    btnText: {
        fontSize: 18
    }, 

    formTrips: {
        width,
        height: height / 1.63,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3
    },
    sheetContent: {
        height: height / 10,
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
        fontSize: 16,
        color: '#dcdcdc',
        textAlign: 'center',
        fontWeight: '700',
    },
})