import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import Container from '../../components/Common/Container';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../components/Common/CustomButton';
import Selection from '../../components/Common/Selection';
import { GlobalContext } from '../../context/provider';
import { useFocusEffect } from '@react-navigation/core';

const RideInfo = ({navigation}) => {
     
    return (
            <Container>
                <Selection navigation = {navigation} />
            </Container>
    )
}

export default RideInfo
