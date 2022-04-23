import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import ButtonToggleGroup from 'react-native-button-toggle-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'
import CustomButton from '../CustomButton';
import { ButtonGroup} from 'react-native-elements'
import colors from '../../../assets/themes/colors'
import Icon from '../Icon';
import { GlobalContext } from '../../../context/provider';
import { Alert } from 'react-native';
import { getShipping, setReservationDateTime } from '../../../context/actions/commandActions';
import { useTranslation } from 'react-i18next';

const Selection = ({navigation}) => {

    const { navigate } = useNavigation()
    const { commandState: { pickUp, drop,loading }, commandDispatch } = useContext(GlobalContext);

    const [index, setIndex] = React.useState(null);
    const [radioValue, setRadioValue] = React.useState('')
    const { t, i18n } = useTranslation();

    //DatePicker states
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //Button states
    const [ disabled, setDisabled ] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (date < (new Date)) {
            console.log(`2222`, 2222)
            setDisabled((prev)=>{
                return prev = true
            })
        }  
        
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


   const confirmCommandType = ()=> {
       if ( index === null ) {
        Alert.alert('Erreur !', 'Preciser le type de commande', [
            {
                text: 'Cancel', onPress: ()=>{}
            },
            {
                text: 'OK', 
            }
        ])
       } else {
        if (typeof(index) === 'number') {
            let x = date.toLocaleDateString()
            let y = date.toLocaleTimeString()
            const cty = 'France'
            console.log(`drop`, drop)
            console.log(`pickUp`, pickUp)
            getShipping( pickUp.id, drop.id, cty )(commandDispatch)( ()=> navigate("Confirm_command") )
             if (index === 1) {
                setReservationDateTime(x, y)(commandDispatch)
            }
        }
        
       }
     
   }
    return (
        <View>
            <TouchableOpacity style = {{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row',  }} onPress = { ()=> navigation.goBack() } ><Icon iconType = 'entypo' name = 'chevron-left' size = {24} /><Text style = {{ fontSize: 17, color: '#494949', paddingHorizontal: 7, marginVertical: 20,  }} >{t('Return')}</Text></TouchableOpacity>
            <View style = {styles.container} >
                {/* <ButtonToggleGroup
                    highlightBackgroundColor={'orange'}
                    highlightTextColor={'white'}
                    inactiveBackgroundColor={'transparent'}
                    inactiveTextColor={'grey'}
                    values={['Commande Direct', 'Reservation']}
                    value={value}
                    onSelect={val => setValue(val)}
                    textStyle = {styles.btnText}
                    style = {styles.btnGroup}
                /> */}

                <ButtonGroup
                    onPress={ val => {setIndex(val); console.log(val) } }
                    selectedIndex={index}
                    buttons={[t('DirectCommand'), t('Reservation')]}
                    containerStyle={{height: 62}}
                    selectedTextStyle={{ color: colors.secondary }}
                    selectedButtonStyle = {{ backgroundColor: colors.primary }}
                />

                    {
                        index === 0 ? (
                            <View>
                                <Text style = { styles.tarifDesc } >
                                    {t('Tarif')}
                                </Text>
                            </View>
                        ) : index === 1 ? (
                            <View>
                                <Text style = { styles.optionText } >
                                    {t('EnterDateTime')}:
                                </Text>
                                
                                <View>
                                    <View style = { styles.dateContainer } >
                                        { 
                                            date.toDateString() === (new Date).toDateString() ? (
                                                <Text style = { styles.dateText } >
                                                    {t('Today')}, {date.toDateString()}
                                                </Text>
                                            ) : date < (new Date) ? (
                                                <Text style = { styles.dateTextError } >
                                                    { t('InvalidDate') }
                                                </Text>
                                            ) : (
                                                <Text style = { styles.dateText } >
                                                    {date.toDateString()}
                                                </Text>
                                            )
                                        }
                                        <CustomButton onPress = {showDatepicker} title = {t('EnterDate')} primary styless = {{ backgroundColor: '#3399ff', width: 120, paddingHorizontal: 10, height: 46 }} />
                                    </View>
                                    <View style = {styles.dateContainer} >
                                        <Text style = { styles.dateText } >{date.toLocaleTimeString()}</Text>
                                        <CustomButton onPress = {showTimepicker} title = {t('EnterTime')} primary styless = {{ backgroundColor: '#3399ff', width: 120, paddingHorizontal: 10, height: 46 }} />
                                    </View>
                                    {show && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        />
                                    )}
                                </View>
                            </View>
                        ) : (
                            <Text style = { styles.tarifDesc } >
                                { t('ServiceType') }
                            </Text>
                        )
                    }
            </View>
            <CustomButton loading={loading} primary disabled = { date > (new Date) || date.toDateString() === (new Date).toDateString() ? false : true} onPress = { ()=> confirmCommandType()  } title = { t('Confirm') } styless = {{ alignSelf: 'center', marginVertical: 20 }} />
        </View>
        
    )
}

export default Selection
