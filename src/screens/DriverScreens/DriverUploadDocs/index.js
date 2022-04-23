import React from 'react'
import { View, Text } from 'react-native'
import BackgroundComponent from '../../../components/BackgroundComponent'
import UploadDocsDriverComponent from '../../../components/UploadDocsDriver'

const DriverUploadDocs = ({ navigation }) => {
    return (
        <View style = {{ flex: 1 }} >
            <BackgroundComponent>
                <UploadDocsDriverComponent navigation = { navigation } />
            </BackgroundComponent>
        </View>
    )
}

export default DriverUploadDocs
