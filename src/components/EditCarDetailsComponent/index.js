import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { View, Text, Platform, ImageBackground, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, Dimensions, ActivityIndicator, Image, FlatList, ScrollView } from 'react-native'
import colors from '../../assets/themes/colors'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import Icon from '../Common/Icon'
import Input from '../Common/Input'
import { ListItem, Avatar } from 'react-native-elements'
import styles from './styles'
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import { GlobalContext } from '../../context/provider'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('window')


const EditCarDetailsComponent = ({ onChange, onSubmit, errors, loading, }) => {

    const { t, i18n } = useTranslation();   


  const [image, setImage] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
  const [modify, setModify] = useState(false);
  let bottomSheetRef = React.useRef();
  const snapPoints = useMemo(() => ['0%','3%','100%'], []);

  const { driverState: { vehicleDetails }, driverStateDispatch } = useContext(GlobalContext)


  const handleSheetChange = useCallback(index => {
    console.log(`index`, index)
    // eslint-disable-next-line no-console
  }, []);

  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();


  }, []);

  

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const carImage = await AsyncStorage.getItem('driverImgCar');
        const carDetails = await AsyncStorage.getItem('carDetails');
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

        if (carImage != ( null || undefined )) {
            setImage(carImage)
        }

        if ( carDetails != ( null || undefined ) ) {
            let x = Object.entries(JSON.parse(carDetails));
            setCarDetails(x);

        }
      }
    })();
  }, [vehicleDetails]);

    const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
      ]

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      AsyncStorage.setItem('driverImgCar', result.uri);
    }
  };

    return (
        <View style = { styles.container } >
            <View style={{ flex: 1 }} >
                <View style={{ height: '35%' }} >
                {image && <Image source={{ uri: image }} style={{...StyleSheet.absoluteFillObject}} />} 
                </View>
                    <View style = {{ height: '50%' }} >
                        {
                            carDetails?.map((item, index)=>
                                (
                                    <View key={index} style = {{  flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 10, width: '100%', height: 65, backgroundColor: '#fff', marginBottom: 2 }} >
                                        <Text style = {{ fontSize: 24, color: '#111000', fontWeight: '500' }} >
                                            { item[0] }
                                        </Text>
                                        <Text style = {{ fontSize: 17, color: '#c0c0c0', fontWeight: '550' }} >
                                            { item[1] }
                                        </Text>
                                    </View>
                                )
                            )
                        }
                </View>
                <CustomButton onPress={ ()=> handleExpandPress() } title= { t('Modify') } primary />
            </View>
                    
           
            <View style={styles.BottomSheet}>
                <BottomSheet
                    index={1}
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    animateOnMount={true}
                    detached = {true}
                    onChange={handleSheetChange}
                    keyboardBehavior = 'interactive'
                >
                    <View style = {{ flex: 1, alignItems: 'center' }} >        
                <View style = { styles.imgWrapper } >
                    
                    <Text style = { styles.editCardetailsBtn } >
                            {
                                t('AddCarImage')
                            }
                        </Text>
                        <Icon iconType = 'entypo' name = 'upload' size = {48} color = '#40404040' style = {{ paddingVertical: 10, opacity: 1 }} />
                    <TouchableOpacity onPress = { pickImage } style = { styles.editCardetails } >
                    {image && <Image style = {[ { ...StyleSheet.absoluteFillObject,height: '100%', width: '100%', position: 'absolute', zIndex: 3 }]} source={{ uri: image }} />}
                    </TouchableOpacity>   
                </View>
                <KeyboardAvoidingView behavior='height' style = {{ height: height / 2, }} >
                <ScrollView style ={{ height: height / 2.7 }} >
                <Input 
                    keyboardType = 'default' 
                    iconPosition = 'left' 
                    label = { t('CarMark') }
                    onChangeText = { (value) => {
                        onChange({ name: t('CarMark'), value })
                    } }
                    error = { errors.Marque }
                />
                <Input 
                    keyboardType = 'default' 
                    iconPosition = 'left' 
                    label = { t('CarModel') } 
                    onChangeText = { (value) => {
                        onChange({ name: t('CarModel'), value })
                    } }
                    error = { errors.Modele }
                />
                 <Input 
                    keyboardType = 'default' 
                    iconPosition = 'left' 
                    label = {t('CarPlaceNumb')}
                    onChangeText = { (value) => {
                        onChange({ name: t('CarPlaceNumb'), value })
                    } }
                    error = { errors.Places }
                />
                <Input 
                    keyboardType = 'default' 
                    iconPosition = 'left' 
                    label = { t('CarYear') } 
                    onChangeText = { (value) => {
                        onChange({ name: t('CarYear'), value })
                    } }
                    error = { errors.Annee }
                />
                <Input 
                    keyboardType = 'default' 
                    iconPosition = 'left' 
                    label = { t('CarColor') }  
                    onChangeText = { (value) => {
                        onChange({ name: t('CarColor') , value })
                    } }
                    error = { errors.Couleur }
                />

<TouchableOpacity disabled = { loading } style = { styles.btn } onPress = { ()=> onSubmit() } >
                
                <Text style= {{ color: colors.secondary }} > { t('Reg') } </Text> 
                </TouchableOpacity>
               
                </ScrollView>
                
            </KeyboardAvoidingView>
           
            </View> 
                </BottomSheet>
            </View>
             
        </View>
            
    )
}


export default EditCarDetailsComponent;
