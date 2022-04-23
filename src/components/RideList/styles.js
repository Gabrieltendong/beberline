import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get('screen');
export default StyleSheet.create({
    Conteiner: {
        flex: 1,
        width,
    },

    headerText: {
        fontSize: 22,
        color: '#a6a6a6a6',
        marginTop: 30,
        paddingHorizontal: 15
    },

    BottomSheet: {
        height: height / 1.5,
        width,
        bottom: 35,
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10
    },

    sheetContent: {
        height: height / 7,
        width: '100%', 
        backgroundColor:'#ffffff', 
        padding: 15, 
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 15,
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
        alignItems: 'center',
        paddingHorizontal: 8
    },

    footerRow: {
        paddingVertical: 8,
        height: '65%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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

    headerText: {
        color: '#f1f1f1',
        textAlign: 'center',
        fontSize: 32,
        paddingTop: 60,
        paddingHorizontal: 15,
        fontWeight: '700',
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