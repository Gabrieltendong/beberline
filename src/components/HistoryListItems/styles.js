import { Dimensions, StyleSheet } from "react-native";

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
        marginTop: 60,
    },

    FlatList: {
        height: height / 1.2
    }
})