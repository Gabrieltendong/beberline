import React, { useContext, useState } from 'react'
import { View, Text, FlatList, TouchableOpacityComponent, TouchableOpacity, ScrollView, Button } from 'react-native'
import Container from '../../components/Common/Container'
import Input from '../../components/Common/Input'
import styles from './styles'
import ChooseLocation from '../../components/ChooseLocation'
import CustomButton from '../../components/Common/CustomButton'
import { getDropAddress, getPickAddress } from '../../context/actions/commandActions'
import { GlobalContext } from '../../context/provider'
import { State } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'
import { showError, showSuccess } from '../../helpers/flashMessage'
import { CheckBox } from 'react-native-elements'
import PickerComponent from '../../components/Common/pickerComponent'
import { useTranslation } from 'react-i18next'

const Destination = ({props, useCurrentPosition, setUseCurrentPosition}) => {

    const { commandDispatch, commandState: { loading, pickUp, drop } } = useContext(GlobalContext)
    const [ coords, setCoords ] = useState({
        depart: {},
        dest: {}
    })
  const { t, i18n } = useTranslation();
  const [ checked, setChecked ] = useState(false)
    const {navigation} = props;

    const fetchPickAddress = (lat, lng, name)=> {
        console.log(`lng, lat`, lng, lat, name)
        setCoords({
            ...coords,
            depart: {
                latitude: lat,
                longitude: lng,
                address: name
            }
        })
        
    }

    const fetchDropAddress = (lat, lng, name)=> {
        console.log(`dest`, lng, lat)
       setCoords({
        ...coords,
        dest: {
            latitude: lat,
            longitude: lng,
            address: name
        }
    })
    }

    const checkValid = ()=> {
      
        if (Object.keys(coords.depart).length === 0) {
            showError(t('ErrDepLoc'));
            return false
        }

        if (Object.keys(coords.dest).length === 0) {
            showError(t('ErrDestLoc'));
            return false
        }

        return true;
    }

    const { depart, dest } = coords;    

    const onDone = ()=> {
        const Valid = checkValid()
        if (Valid) {
            if ( pickUp.address ) {
                navigation.navigate("ScrollView Screen");
            }
                getPickAddress(depart.latitude, depart.longitude, depart.address)(commandDispatch);
                getDropAddress(dest.latitude, dest.longitude, dest.address)(commandDispatch)( () => navigation.navigate("ScrollView Screen") );
        }

        
    }
    return (
        <View style = { styles.Container } >
            <Text style = { styles.headerText } >
                {
                   t('EntreTripLocs')
                }
            </Text>
            <View style = {{ height: '85%' }} >
            <ScrollView
            keyboardShouldPersistTaps = 'handled'
             style = {{ padding: 24, height: '75%' }} >
               {<ChooseLocation placeholderText = { t('DepAdd') } fetchAddressDetails = {fetchPickAddress} useCurrentPosition = {true} />}
                <View style = {{ marginVertical: 12 }} />
                <ChooseLocation placeholderText = { t('DestAdd') } fetchAddressDetails = {fetchDropAddress} useCurrentPosition = {false} />
                <CustomButton loading = {loading} onPress = { ()=> onDone()  } title = {t('Confirm')} primary styless = {{ alignSelf: 'center', marginVertical: 20, position: 'relative', }} />
               
            </ScrollView>
            </View>
            {/* <CheckBox
                    center
                    title='Utiliser ma postition comme address de depart ?'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked = { useCurrentPosition }
                    onPress = { ()=> setUseCurrentPosition(!useCurrentPosition) }
                /> */}

                
        </View>
    )
}

export default Destination
