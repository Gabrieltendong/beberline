import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image, View } from 'react-native'
import { Overlay, Tab, TabView, Text } from 'react-native-elements';
import BackgroundComponent from '../../components/BackgroundComponent';
import HistoryListItems from '../../components/HistoryListItems';
import PaymentMethodComponent from '../../components/paymentMethodComponent';
import Icons from '../../components/Common/Icon'
import styles from './styles'
import { io } from 'socket.io-client';
import { useFocusEffect } from '@react-navigation/core';

const Payments = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [ index, setIndex ] = useState(0)

    // }, [])

    return (
        <View style = { styles.container } >
            <BackgroundComponent>
                <PaymentMethodComponent navigation = {navigation} />
            </BackgroundComponent>
        </View>
    )
}

export default Payments
