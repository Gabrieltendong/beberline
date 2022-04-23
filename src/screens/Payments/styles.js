import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        height,
        width,
        alignItems: 'center'
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