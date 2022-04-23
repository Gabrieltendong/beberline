import { Dimensions, StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";


const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  
      txtSuccess: {
        color: colors.primary,
        textAlign: 'center'
      },

      textSuccessWrapper: {
        width: '100%',
        paddingHorizontal: 10
      },

      Container: {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
  
      modalView: {
        width: width - 50,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
  
      header: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        alignContent: 'center',
      },
  
      modalBody: {
        padding: 24,
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0f0'
      },
  
      modalSection: {
        flexDirection: 'column',
        alignItems: 'center',
      },
  
      sectionText_1: {
        fontSize: 32,
        color: '#494949'
      },
  
      sectionText_2: {
        fontSize: 26,
        color: '#494949'
      },
  
      sectionText_3: {
        fontSize: 24,
        color: '#d8d8d8d8'
      },
  
      Sectionseperator: {
        height: '75%',
        width: 1,
        backgroundColor: '#f2f2f2f2'
      },
  
      footerModal: {
        alignItems: 'center',
        width: '100%'
      },
  
      modelTextAddress: {
        fontSize: 30,
        paddingHorizontal: 24,
        color: '#a6a6a6a6'
      },
  
      footerMap: {
        width: '100%',
        height: 185,
        marginVertical: 5
      },
  
      footerBtnWrapper: {
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
  
      footerBtn: {
        width: 120,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
      },
  
      btnTextValid: {
        fontSize: 20,
        color: '#1a53ff',
        fontWeight: '700'
      },
  
      btnTextInvalid: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: '700',
        opacity: 0.3
      },
  
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      textHeader: {
        fontSize: 28,
        fontWeight: '500',
        textAlign: "center"
      }
})