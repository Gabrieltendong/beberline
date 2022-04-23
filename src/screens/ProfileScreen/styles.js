// import { StyleSheet } from "react-native";
// import { Dimensions } from 'react-native'

// const { height, width } = Dimensions.get('screen');

// export default StyleSheet.create({
//     Container: {
//         height,
//         width,
//         alignItems:'center'
//     }
// })

import { Dimensions, StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";

const { width, height } = Dimensions.get('screen')

export default StyleSheet.create({

    Container: {
                height,
                width,
                alignItems:'center'
            },
            
    profileContainer: {
        height: height / 1.36,
        width: '100%',
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        borderRadius: 25,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 100,
        marginTop: 20
    }, 

    container: {
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
    },

    userImg: {
        height: 120,
        width: 120, 
        borderRadius: 60,
        borderColor: 'white',
        position: 'absolute',
        top: -55,
        borderWidth: 3,
        marginBottom: 25,
        marginTop: 10
    },

    text: {
        fontSize: 24,
        width: '85%',
        fontWeight: 'bold',
        justifyContent:'flex-start',
        marginVertical: 3

    }, 

    profileInfo: {
        width: '100%',
        paddingVertical: 10,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
        marginBottom: 15
    },

    scrollProfile: {
        width: '100%',
    },

    btnContainer: {
        width: '100%',
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }
})