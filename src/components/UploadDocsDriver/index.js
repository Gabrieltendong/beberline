import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native'
import CustomButton from '../Common/CustomButton'
import Icon from '../Common/Icon'
import RoundedBtn from '../RoundedBtn';
import Container from '../Common/Container';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './styles'
import { useTranslation } from 'react-i18next';

const UploadDocsDriverComponent = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const UploadPicComponent = ({ upload_name })=> {
      const [image, setImage] = useState(null);
      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const carImage = await AsyncStorage.getItem(upload_name);
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }

            if (carImage != ( null || undefined )) {
                setImage(carImage)
            }
          }
        })();
      }, []);

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
          AsyncStorage.setItem(upload_name, result.uri);
        }
      };

        return(
            <View style = { styles.uploadPicWrapper } >
                <Text style = { styles.header } >
                    { upload_name }
                </Text>
                {
                    image != null ? (
                        <View style = {{ height: 190, width: '100%',  }} >
                            {image && <Image source={{ uri: image }} style={{...StyleSheet.absoluteFillObject}} />}
                        </View>
                    ) : (
                        <View style = {{ height: 43, width: '100%' }} >

                        </View>
                    )
                }
                <View>
                    <CustomButton onPress = { pickImage } styless = {{ width: 265, height: 56, borderRadius: 45, alignSelf: 'center' }} primary title = { image != null ? t('Modify') : t('AddImage') }  />
                </View>
            </View>
        )

    }

    return (
        <View style = {{ flex: 1 }} >
        <RoundedBtn onPress = { ()=> navigation.goBack() } type = 'icon' icon = { <Icon iconType = 'entypo' name = 'chevron-left' size = {48} color = '#c8c8c8c8' /> } styless = {{ left: 0 }} />
        <View style = { styles.headerFooter } >  
            <Text style = { styles.headerText } >
            { t('ImportDocs') }
            </Text>
            
        </View>
        <View  style = { styles.FlatList } >
          <ScrollView showsVerticalScrollIndicator = {false} >
            <UploadPicComponent upload_name = { t('CarInsurance') } />
            <UploadPicComponent upload_name = { t('GoldInsurance') } />
            <UploadPicComponent upload_name = { t('CivilInsurance') } />
            <UploadPicComponent upload_name = { t('GrayCard') } />
            <UploadPicComponent upload_name = { t('VTCCard') } />
            <UploadPicComponent upload_name = { t('KBIS') } />
            <UploadPicComponent upload_name = { t('JustificationTVA') } />
            <UploadPicComponent upload_name = { t('JustificationVTC') } />
            <UploadPicComponent upload_name = { t('VTCMacaron') } />
            <UploadPicComponent upload_name = { t('DriveLicRec') } />
            <UploadPicComponent upload_name = { t('DriveLicVer') } />
            <UploadPicComponent upload_name = { t('NICRec') } />
            <UploadPicComponent upload_name = { t('NICVer') } />
            <UploadPicComponent upload_name = { t('RIB') } />
          </ScrollView>
        </View>
    </View>
    )
}

export default UploadDocsDriverComponent
