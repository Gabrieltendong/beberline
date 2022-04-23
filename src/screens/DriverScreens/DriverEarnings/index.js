import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import BackgroundComponent from '../../../components/BackgroundComponent'
import EarningsTopNav from '../../../navigations/DriverEarningsNav'
import styles from './styles'

const DriverEarnings = () => {

    const { t, i18n } = useTranslation();


    return (
        <View style = { styles.container } >
            <BackgroundComponent>
                <View style = {{ marginTop: 100, height: 65 }} >
                    <Text style = {{ fontSize: 36, color: '#f5f5f5f5', paddingLeft: 10, position: 'relative', top: 0 }} >
                        { t('ConsultPays') }
                    </Text>
                </View>
                <EarningsTopNav />
            </BackgroundComponent>
        </View>
    )
}

export default DriverEarnings;
