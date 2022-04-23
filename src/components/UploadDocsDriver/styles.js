import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1
    },

    uploadPicWrapper: {
        width: width - 30,
        alignSelf: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 13,
        elevation: 2,
        marginBottom: 6
    },

    header: {
        fontSize: 20,
        color: '#404040',
        padding: 10,
        fontWeight: '700'
    },

    headerText: {
        color: '#f1f1f1',
        width: '70%',
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
        height: height / 1.50,
    }
})