import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import BackgroundComponent from '../../../components/BackgroundComponent'
import styles from './styles';
import RoundedBtn from '../../../components/RoundedBtn';
import Icon from '../../../components/Common/Icon';
import colors from '../../../assets/themes/colors';
import { useRoute } from '@react-navigation/native';
import { Fontisto, Entypo } from '@expo/vector-icons'; 


const DriverBonScreen = ({ navigation }) => {


    const { params } = useRoute();


    return (
        <View style = { styles.container } >
            <BackgroundComponent>
            <RoundedBtn onPress = { ()=> navigation.goBack() } type = 'icon' icon = { <Icon iconType = 'entypo' name = 'chevron-left' size = {38} color = '#c8c8c8c8' /> } styless = {{ left: 0 }} />
            <View style = { styles.headerFooter } >  
                <Text style = { styles.headerText } >
                    Bon de Course
                </Text>
             </View>
             <View style = { styles.btnComp } >
                <View style = { styles.btnWrapper } >
                    <Text style = { styles.textEuro } >{ 2 * params.distance }<Text style = {{ fontSize: 28 }} >€</Text> </Text>
                    <Text style = { styles.btnText } > Frais Total </Text>
                </View>
                <View style = { styles.btnWrapper } >
                    <Text style = {[ styles.textEuro, { color: colors.primary } ]} > { params.distance } Km </Text>
                    <Text style = { styles.btnText } > Distance Parcouru </Text>
                </View>
            </View>
                <View style = { styles.listCard } >
                            <View style = { styles.marker } >
                                <Fontisto name="map-marker" size={22} color="#66ff66" />
                                <Text style={ styles.textDest } > Adresse Depart... </Text>
                            </View>
                            <View style = { styles.marker } >
                                <Fontisto name="map-marker-alt" size={22} color="#ff4d4d" />
                                <Text style={ styles.textDest } > Adresse D'arriver </Text>
                            </View>
                    </View>
            </BackgroundComponent>
        </View>
    )
}

export default DriverBonScreen
