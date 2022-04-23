const { width, height } = Dimensions.get('window')
import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";

export default StyleSheet.create({
    container: {
        height,
        width,
       paddingTop: 50
    },

    mapWrapper: {
        height: height / 3,
        width: '100%',
        backgroundColor: colors.secondary, 
        borderRadius: 16,
        elevation: 3, 
    },

    txtDesc: {
        fontSize: 17,
        color: colors.primary,
        marginBottom: 2
    },

    txtInfo: {
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center'
    },

    card: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: colors.secondary,
        elevation: 1,
        padding: 13
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
        color: colors.primary,
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
        padding: 3,
        borderRadius: 10
    },

    headerText: {
        color: '#f1f1f1',
        fontSize: 48,
        fontWeight: '700'
    },


    imgDriver: {
        height: 85,
        width: 85,
        borderRadius: 55, 
        marginBottom: 12
    },
    
    bottom: {
        borderRadius: 8,
        alignItems: 'center',
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

})