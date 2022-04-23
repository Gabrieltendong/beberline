import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from '../Common/Icon';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import { DRIVER_TRIP, ON_TRIP } from '../../constants/routes';
import { io } from 'socket.io-client';
import MapViewDirections from 'react-native-maps-directions';
import { getShippingAddress } from '../../context/actions/driverActions';
import { GlobalContext } from '../../context/provider';
import { GOOGLE_API } from '../../constants/GOOGLE_API';
import colors from '../../assets/themes/colors';

const socket = io("http://192.168.100.19:8080");


const CustomModal = ({ modalVisible, setModalVisible, navigation }) => {




    return (
        <Modal
          animationType="slide"
          transparent = {true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View  style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style = {{ marginTop: 10,  }} >
                  <Icon iconType={'feather'} name = 'check-circle' color = '#1e90ff' size = { 64 } />
              </View>
              <View style = {styles.textSuccessWrapper } >
                <Text style = { styles.txtSuccess } >
                    Un chauffeur vient de valider votre commande. Veuillez cliquez sur suivre pour suivre le parcour
                </Text>
              </View>
              <View style= {styles.footerModal} >
                <View style = {styles.footerBtnWrapper} >
                  <View pointerEvents='none' style = {styles.footerBtn} >
                      <Text style = { styles.btnTextInvalid } >REJECTER</Text>
                  </View>
                  <TouchableOpacity onPress = { ()=> {
                      setModalVisible(!modalVisible)
                      navigation.navigate(ON_TRIP)
                      } } style = {styles.footerBtn} >
                      <Text style = { styles.btnTextValid } >SUIVRE</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
            </View>
          </View>
        </Modal>
    
    )
}

export default CustomModal
