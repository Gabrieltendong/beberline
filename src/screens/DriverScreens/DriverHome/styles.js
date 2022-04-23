import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    Container: {
        alignItems:'center',
        justifyContent: 'center',
        flex: 1
    },
})