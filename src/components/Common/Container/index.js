import React from 'react'
import {View, Text, ScrollView } from 'react-native'
import styles from './styles'

const Container = ({ children, styless }) => {
    return (
        <ScrollView style ={ [ styles.wrapper, styless ] }>
           { children }
        </ScrollView>
    )
}

export default Container
