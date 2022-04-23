import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
    Image: {
        height: 115,
        width: 115,
        borderRadius: 55,
        marginTop: 40,
        elevation: 3
    },

    listWrapper: {
        width: '100%', 
        height,
        alignItems: 'center',
    },

    profileForm: {
        height: height / 1.68,
        width: '100%',
        backgroundColor: '#f2f2f2f2',
        position:'absolute',
        bottom: 0,
        paddingVertical: 10,
        borderRadius: 25,
        elevation: 5,
        alignItems: 'center'

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
        width: '100%'
    },

    marker: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 8
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
        marginTop: 80,
        paddingVertical: 15,
        width: '100%'
    },
})