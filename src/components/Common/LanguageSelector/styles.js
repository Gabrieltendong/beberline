import { StyleSheet } from "react-native";

export default StyleSheet.create({
    selectorWrapper: {
        position: 'absolute',
        top: 26,
        right: 0,
        zIndex: 4
    }, 
    img: {
        width: 24,
        height: 24
    },
    btnInner: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    btnStyle: {
        alignItems: 'center',
        borderRadius: 9,
        maxWidth: 100,
        elevation: 1
    }
})