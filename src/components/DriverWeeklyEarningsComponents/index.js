import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, Image } from 'react-native'
import { colors } from 'react-native-elements'
import styles from './styles';

const DriverWeeklyEarningsComponents = ({ commandWeeklyList }) => {

    const { t, i18n } = useTranslation();

    const getRidesAmount = () => {
        var finalAmt = 0
        var amount = 0
        commandWeeklyList.forEach(element => {
            amount = amount + Number(element.amount)
        });
        finalAmt = amount
        console.log('amount :>> ', amount);
        return finalAmt
    }
    return (
        <View style = { styles.container } >
            <View style = { styles.btnComp } >
                <View style = { styles.btnWrapper } >
                    <Text style = { styles.textEuro } >{ getRidesAmount() }<Text style = {{ fontSize: 28 }} >€</Text> </Text>
                    <Text style = { styles.btnText } > { t('MyPays') } </Text>
                </View>
                <View style = { styles.btnWrapper } >
                    <Text style = {[ styles.textEuro, { color: colors.primary } ]} > { commandWeeklyList.length } </Text>
                    <Text style = { styles.btnText } > { commandWeeklyList.length > 1 ? t('RidesMade') : t('RideMade') } </Text>
                </View>
            </View>
            <View style = { styles.formTrips } >
                <Text style = {[ styles.btnText, { padding: 5 } ]} > { t('WeeklyRides') } </Text>
                <ScrollView>
                {
                        commandWeeklyList.map((item, index)=> {
                            let amount = amount + item.amount
                            return(
                            <View style = {styles.sheetContent} >
                                <Image style = {{ width: 45, height: 45 }} source = { require('../../assets/images/user.png') } />
                                <View style ={styles.rideInfo} >
                                    <View style = { styles.footerRow } >
                                        <Text style = { styles.textFooter } >
                                            { item.customer.user.first_name } { item.customer.user.last_name }
                                        </Text>
                                        <Text style = { styles.textIndice } >
                                            il y a une heure
                                        </Text>
                                    </View>
                                    <View style = { styles.footerRow } >
                                        <Text style = { styles.textFooter } >
                                            { Math.round(item.amount) } €
                                        </Text>
                                        <Text style = { styles.textIndice } >
                                            Prix
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default DriverWeeklyEarningsComponents;
