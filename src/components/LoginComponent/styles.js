import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";

const { height, width } = Dimensions.get('screen')

export default StyleSheet.create({
    Container: {
        marginTop: 50,
        width,
        flex: 1
    },

    radioGroup: {
        marginVertical: 5, 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    image: {
        width: 175,
        height: 175,
        borderRadius: 25,
        elevation: 3,
        alignSelf: 'center',
        marginTop: 25
    },

    headerText: {
        marginBottom: 35,
        marginTop: 25,
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '600',
        color: colors.orange,
        opacity: 0.6,
        textAlign: 'center'
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 15
    },

    txtSection: {
        color: colors.link, 
        fontSize: 16,
        paddingHorizontal: 15
    }
})