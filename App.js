import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalProvider from './src/context/provider';
import AppNavContainer from './src/navigations';
import i18n from './src/context/lang/i18n';

export default function App() {
  return (
    <GlobalProvider>
        {/* <StatusBar backgroundColor='white' /> */}
        <AppNavContainer />
    </GlobalProvider>
  );
}

