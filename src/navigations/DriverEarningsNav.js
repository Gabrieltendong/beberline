import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DriverDaylyEarnings from "../screens/DriverScreens/DriverDaylyEarnings";
import { DRIVER_DAYLY_EARNINGS, DRIVER_WEEKLY_EARNINGS } from "../constants/routes";
import DriverWeeklyEarnings from "../screens/DriverScreens/DriverWeeklyEarnings";
import { useTranslation } from "react-i18next";

const TopNav = createMaterialTopTabNavigator();

const EarningsTopNav = ()=> {

    const { t, i18n } = useTranslation();

    return(
        <TopNav.Navigator>
            <TopNav.Screen options = {{ tabBarLabel: t('DailyPays') }} component = { DriverDaylyEarnings } name = { DRIVER_DAYLY_EARNINGS } />
            <TopNav.Screen options = {{ tabBarLabel: t('WeeklyPays') }} component = { DriverWeeklyEarnings } name = { DRIVER_WEEKLY_EARNINGS } />
        </TopNav.Navigator>
    )
}

export default EarningsTopNav;