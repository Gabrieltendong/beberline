import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown'
import { useTranslation } from 'react-i18next';

export default function LanguageSelector({ style }) {

    const countries = [
        { title: "Francais", value: "fr", logo: require('../../../assets/images/france.png') },
        { title: "Anglais", value: "en", logo: require('../../../assets/images/royaume-uni.png') },
        { title: "Italien", value: "it", logo: require('../../../assets/images/italie.png') },
        { title: "Arab", value: "sa", logo: require('../../../assets/images/arabie-saoudite.png') },
    ]

    const { t, i18n } = useTranslation()

    const DropBtn = (selectedItem, index)=> {
        return(
            <View style= { styles.btnInner } >
                <Image source={selectedItem?.logo} style= { styles.img } />
                <Text> { selectedItem?.title } </Text>
            </View>
        )
    }

  return (
    <View style = {[ styles.selectorWrapper, style ]} >
        <SelectDropdown
            data={countries}
            defaultValueByIndex={0}
            buttonStyle={styles.btnStyle}
            dropdownOverlayColor='transparent'
            onSelect={(selectedItem, index) => {
                i18n.changeLanguage(selectedItem?.value)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.title
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.title
            }}
            renderCustomizedButtonChild={DropBtn}
        />
     </View>
  );
}
