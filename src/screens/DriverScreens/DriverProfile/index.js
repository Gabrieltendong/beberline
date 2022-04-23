import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity } from "react-native";
import BackgroundComponent from '../../../components/BackgroundComponent'
import Icon from '../../../components/Common/Icon'
import DriverProfileComponent from '../../../components/DriverProfileComponent';


const DriverProfile = ( { navigation } ) => {
    
    return (
      <View>
        <DriverProfileComponent navigation = {navigation} />
      </View>
    );
}

export default DriverProfile
const styles = StyleSheet.create({
  
});