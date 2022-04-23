import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { io } from 'socket.io-client';
import BackgroundComponent from '../../components/BackgroundComponent';
import HistoryListItems from '../../components/HistoryListItems';
import styles from './styles';


const History = () => {

    const [ command, setCommand ] = useState()


    return (
        <View style = { styles.Container } >
            <BackgroundComponent>
                <HistoryListItems />
                <Text> { command?.paymentMethod } </Text>
            </BackgroundComponent>
        </View>
    )
}

export default History
