import { useFocusEffect, useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import colors from '../../assets/themes/colors'
import { HOME, PAYMENT } from '../../constants/routes'
import CustomButton from '../Common/CustomButton'
import Icon from '../Common/Icon'
import Input from '../Common/Input'
import { LinearGradient } from 'expo-linear-gradient';
import RoundedBtn from '../RoundedBtn'
import styles from './styles'
import Container from '../Common/Container'
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlobalContext } from '../../context/provider'
import { getSource } from '../../context/actions/commandActions'

const { height, width } = Dimensions.get('screen')

const AddCardComponent = ({ navigation, onChange, onSubmit, setForm, form, errors, setErrors }) => {

    const { navigate } = useNavigation();

    const { commandState: { loading }, commandDispatch } = useContext(GlobalContext)

    
    const [clientName, setClientName] = useState('');
    const [ dateValue, setDateValue ] = useState(null);
    const [ cardType, setCardType ] = useState();


     //DatePicker states
     const [date, setDate] = useState(new Date());
     const [mode, setMode] = useState('date');
     const [show, setShow] = useState(false);

     useFocusEffect(
        React.useCallback(()=>{
            return ()=> {
                onComplete()
            }
        }, [1]),
    )

    const setInputRef = (date)=>{ return date }

     const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        setDateValue(currentDate)
        setForm({...form, 'exp_date': typeof( dateValue?.getMonth() ) != 'undefined' ? (dateValue?.getMonth() + 1).toLocaleString()  + '/' + dateValue?.getFullYear().toLocaleString() : '' })
        console.log(`form`, form)
        // if (date < (new Date)) {
        //     console.log(`2222`, 2222)
        //     setDisabled((prev)=>{
        //         return prev = true
        //     })
        // }  
        
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

   

   
    
    

    return (
        <View style = {{ flex: 1,  }} >
             {/* <LinearGradient
                // Button Linear Gradient
                colors={[ '#4da6ff', '#cc99ff']}
                end = {{ x: 1.0, y: 0.0 }}
                style={styles.button}>
                { typeof(cardType) == 'string' ? (<Icon iconType = 'fontisto' name = {cardType} color = '#f5f5f5' size = {32} />) : (<Text style={styles.text}>MASTERCARD/VISA</Text>) }
                <View pointerEvents = 'none' style = { styles.cardNo } >
                   { formatCardNumber()?.map((item, index)=>{
                       let lastIndex = formatCardNumber().length - 1;
                       while( index != lastIndex ){
                            return(
                                <TextInput key = {index} value = {item} secureTextEntry style = { styles.cardInput } />
                        )
                       }
                       return(
                            <TextInput key = {index} value = {item} secureTextEntry style = { styles.cardInput } />
                       )
                   }) }
                </View>
                <View pointerEvents = 'none' style = { styles.cardDetails } > 
                   <View>
                       <Text style = { styles.textDetails } >DATE EXP </Text>
                       <TextInput style = { styles.inputDetails } placeholder = 'Date exp' value = {form.exp_date} />
                   </View>
                   <View>
                       <Text style = { styles.textDetails } >NOM DU CLIENT </Text>
                       <TextInput keyboardType = 'numbers-and-punctuation' placeholder = 'Nom du Client' style = { styles.inputDetails } value = {form.card_holder} />
                   </View>
                </View>
            </LinearGradient> */}
            <KeyboardAvoidingView behavior = 'padding' style = { styles.cardForm } >
                <Text style =  {{ textAlign:'center', fontSize: 24, color: '#c0c0c0', marginBottom: 6, fontWeight: '600' }} > Entrer les details de votre carte </Text>
                <Container>
                {/* <Input 
                    iconPosition = 'right' 
                    label = " Nom du Detenteur de la Carte " 
                    value = {clientName}
                    keyboardType = 'default' 
                    onChangeText = { (value) => {
                        onChange({ name: "card_holder", value })
                        setClientName(value)
                    } }
                    error = { errors.card_holder }
                /> */}
               
                 
                </Container>
            </KeyboardAvoidingView>
             <CustomButton primary title = 'Ajouter la Carte'/>
             {/* {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDate}
                                />
                                
            )} */}
        </View>
    )
}

export default AddCardComponent;
