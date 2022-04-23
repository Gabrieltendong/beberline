import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffff'
    },

    headerText: {
        backgroundColor:'transparent',
        color: colors.primary,
        padding: 20,
        fontSize: 28, 
        textAlign:'center'
    }
})