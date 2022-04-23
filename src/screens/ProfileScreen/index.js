import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import BackgroundComponent from '../../components/BackgroundComponent'
import ProfileListItems from '../../components/ProfileListItems'
import styles from './styles'
import colors from '../../assets/themes/colors'
import PickerComponent from '../../components/Common/pickerComponent'

const Profile = ({ navigation }) => {

    

    return (
        <View style = { styles.Container } >
            <BackgroundComponent>
                <ProfileListItems navigation = {navigation} />
            </BackgroundComponent>
        </View>
    )
}

export default Profile;
