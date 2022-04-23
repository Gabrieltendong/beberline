import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const RoundedBtn = ({ onPress, type, styless, icon, iconTextStyle, ImageStyle }) => {

    const getbtnContent = ()=> {
        switch (type) {
            case 'icon':
                return (
                    <Text style = {[{ fontSize: 16, fontWeight: '400', }, iconTextStyle ]} >{icon}</Text>
                )
            case 'image':
                return (
                    <Image style = {[{ height: 50, width: 50, borderRadius: 30 }], ImageStyle} source = { require('../../assets/images/user.png') } />
                )
            default:
                break;
        }
    }
    return (
        <TouchableOpacity style = {[{ height: 55, width: 55, borderRadius: 35, alignItems: 'center', justifyContent: 'center',  position: 'absolute', top: 35 }, styless]} onPress = {onPress} >
            {
                getbtnContent()
            }
        </TouchableOpacity>
    )
}

export default RoundedBtn
