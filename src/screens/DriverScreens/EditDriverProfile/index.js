import React from 'react'
import { View, Text } from 'react-native'
import BackgroundComponent from '../../../components/BackgroundComponent'
import ProfileListItems from '../../../components/ProfileListItems'

const EditDriverProfile = ( { navigation } ) => {
    return (
        <View >
            <BackgroundComponent>
                <ProfileListItems navigation = { navigation } />
            </BackgroundComponent>
        </View>
    )
}

export default EditDriverProfile
