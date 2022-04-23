import React from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Zocial } from '@expo/vector-icons'


const Icon = ({iconType, ...props}) => {

    const getIconType = (type)=>{
        switch (type) {
            case 'antdesign':
                return AntDesign;
            case 'entypo':
                return Entypo;
            case 'fontawesome':
                return FontAwesome;
            case 'fontawesome5':
                return FontAwesome5;
            case 'fontisto':
                return Fontisto;
            case 'foundation':
                return Foundation;
            case 'materialcommunityicons':
                return MaterialCommunityIcons;
            case 'materialicons':
                return MaterialIcons;
            case 'evilicons':
                return EvilIcons;
            case 'feather':
                return Feather;
            case 'ionicons':
                return Ionicons;
            case 'simplelineicons':
                return SimpleLineIcons;
            case 'octicons':
                return Octicons;
            case 'zocial':
                return Zocial;
            default:
                return null;
                
        }
    }

    const IconFont = getIconType(iconType)
    

    return (
        <IconFont {...props} />
    )
}

export default Icon
