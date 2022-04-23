import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },

    creditCards: {
        alignSelf: 'center',
        width: width - 10,
        padding: 15,
        elevation: 2,
        height: height / 2.6,
        marginVertical: 5, 
        backgroundColor: '#ffffff',
        borderRadius: 16

    }
})