import AsyncStorage from '@react-native-async-storage/async-storage'
import RadioButtonRN from 'radio-buttons-react-native'
import React, {useContext, useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import Icon  from '../../components/Common/Icon'
import PickerComponent from '../../components/Common/pickerComponent'
import colors from '../../assets/themes/colors'
import styles from './styles'
import { GlobalContext } from '../../context/provider'
import { getSource } from '../../context/actions/commandActions'
import CustomButton from '../../components/Common/CustomButton'
import AddCardComponent from '../../components/AddCardComponent'


const index = ({navigation}) => {

    const [ cardData, setCardData ] = useState([]);
    const [value, setValue] = React.useState(false);
    const { commandState: { paymentMethod, reservationDay, reservationTime, loading }, commandDispatch } = useContext(GlobalContext)


    var cards = {};
    const getInfo = async () => {
    var radioButtonsData = []

        try {
            const payments = await AsyncStorage.getItem('paymentMethods');
            if (payments) {
                cards = JSON.parse(payments) ;
               Object.values(cards).forEach(item => {
                   radioButtonsData.push({...item, label: item.card_holder + ' ' + item.exp_date})
               })
                let x = Object.values(cards)
                setCardData(radioButtonsData)

            }
        } catch (error) {
            console.log(`error`, error)
        }
    }

    useEffect(()=> {
        getInfo()
    }, []);

   
    const checkSelect = ()=> {
        console.log(`value`, paymentMethod);
        let date = paymentMethod.exp_date.split('-');
        let month = date[0];
        let year = date[1];

        if (value) {
            // getSource(paymentMethod.card_number, month, year, paymentMethod.CVC)(commandDispatch)
            
        } else {
            alert('Selection une methode de paiement')
        }
    }

    return (
        <View style = { styles.container } >
           
           <AddCardComponent navigation={ navigation } />
           
        </View>
    )
}

export default index
