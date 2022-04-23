import {  StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    
    card: {
        height: height / 2.5,
        width,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 15,
    },

    cardHead: {
        height: '25%',
        width: '100%',
        backgroundColor: 'rgba(242, 242, 242, 0.32)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 10
    },

    cardAvatar: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginRight: 10
    },

    headText: {
        fontSize: 20,
        color: '#001',
        fontWeight: '900'
    },

    cardRecoms: {
        width: '100%',
        padding: 12,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#f1f1f1',
        paddingHorizontal: 10
    },

    recomImages: {
        flexDirection: 'row',
        marginRight: 10
    },

    textRecom: {
        fontSize: 18,
        color: '#484848',
        fontWeight: '300'
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    ratingText: {
        fontSize: 17,
        color: 'lightgrey',
    },

    cardFooter: {
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    footerRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    footerSection: {
        flexDirection: 'column',
        width: '85%'
    },

    textFooter: {
        fontSize: 16,
        color: '#DCDCDC',
        fontWeight: '800'
    },

    textIndice: {
        fontSize: 17,
        color: '#181818',
        textAlign: 'center',
        fontWeight: '700'
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
})