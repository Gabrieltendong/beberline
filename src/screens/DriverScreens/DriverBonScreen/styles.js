import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/themes/colors";

const { height, width } = Dimensions.get('window');


export default StyleSheet.create({
    container: {
        flex: 1
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
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
        marginTop: 60,
    },

})