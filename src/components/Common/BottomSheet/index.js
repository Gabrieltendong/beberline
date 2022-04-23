// import React, { useCallback, useMemo, useRef } from 'react'
// import { View, Text } from 'react-native';
// import BottomSheet, {  BottomSheetModal,BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
// import styles from './styles';

// const CustomBottomSheet = () => {
//     // ref
//     const bottomSheetRef = useRef(null);
  
//     // variables
//     const snapPoints = useMemo(() => ['8%', '25%', '50%'], []);
  
//     // callbacks
//     const handleSheetChanges = useCallback((index) => {
//       console.log('handleSheetChanges', index);
//     }, []);
  
//     // renders
//     return (
//         <BottomSheet
//           ref={bottomSheetRef}
//           index={1}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}
//         >
//           <View style={styles.contentContainer}>
//             <Text>Awesome 🎉</Text>
//           </View>
//         </BottomSheet>
//     );
//   };

//   export default CustomBottomSheet;

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Button, Text, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import colors from '../../../assets/themes/colors';
import Destination from '../../../screens/Destination';
import RideInfo from '../../../screens/DriveType';
import PaymentMethods from '../../../screens/ChoosePaymentMethods';
import CommandConfirm from '../../../screens/ComandeConfirm';
import * as Location from 'expo-location';
import { io } from 'socket.io-client';
import AddCardComponent from '../../AddCardComponent';
import AddCard from '../../../screens/AddCard';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();
const ScreenA = ({navigation})=> {
  return (
    <View style = {{ width: '100%' }} >
      <Text>Screen A</Text>
      <Button title = 'Screen B' onPress = { () => navigation.navigate('ScrollView Screen') } />
    </View>
  )
}

const ScreenB = ()=> {
  return (
    <View>
      <Text>Screen B</Text>
    </View>
  )
}

const ScreenC = ()=> {
  return (
    <View>
      <Text>Screen C</Text>
    </View>
  )
}

const ScreenD = ()=> {
  return (
    <View>
      <Text>Screen D</Text>
    </View>
  )
}

const Navigator = ({ useCurrentPosition, setUseCurrentPosition }) => {
  const { navigate } = useNavigation()
  const screenOptions = useMemo(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
      safeAreaInsets: { top: 0 },
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible',
      },
    }),
    []
  );

  const screenAOptions = useMemo(() => ({ headerLeft: () => null }), []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator 
        initialRouteName = "FlatList Screen" screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        animationTypeForReplace: 'push',
        safeAreaInsets: { top: 0 },
        cardStyle: {
          backgroundColor: 'white',
          overflow: 'visible'
        }
      }} >
        <Stack.Screen
          name="FlatList Screen"
          options={screenAOptions}
          children = { (props)=> <Destination useCurrentPosition = { useCurrentPosition } setUseCurrentPosition = {setUseCurrentPosition} props = {props} /> }
        />
        <Stack.Screen name="ScrollView Screen" component={RideInfo} />
        {/* <Stack.Screen name="payments" component={AddCard} /> */}
        <Stack.Screen name="Confirm_command" component={CommandConfirm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavigatorExample = ( { useCurrentPosition, setUseCurrentPosition } ) => {

  const { t, i18n } = useTranslation();


  useEffect(() => {
    (async () => {
        let location = await Location.getCurrentPositionAsync({});
        const { coords: { latitude, longitude } } = location;
       setLoc({ latitude, longitude })
      })();
}, []);


  // variables
  const snapPoints = useMemo(() => ['2%','6%','93%'], []);

  // const requestRide = ()=> {
  //   socket.on('connect', ()=> {
  //     console.log('Client connected');
  //     socket.emit('rideRequest', { name: "username", loc })
  //   })
  // }

  let bottomSheetRef = useRef();
  const [ expand, setExpand ] = useState(false)
  const [ loc, setLoc ] = useState({})

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log(`index`, index)
    // eslint-disable-next-line no-console
    if (index == 1) {
      setExpand(false)
    }
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();

    setExpand(!expand)

  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);


  // renders
  return (
    <View style={styles.container}>


        <TouchableOpacity onPress = { ()=> {handleExpandPress(); } } style = {{ width: '85%', height: 75, borderRadius: 14, backgroundColor: colors.primary, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', position: 'absolute', top: 70, }} >
            <Text style = {{ fontSize: 24, color: colors.secondary, fontWeight: '500', textAlign: 'center' }} >{ t('DoCommand') }</Text>
        </TouchableOpacity> 
      
     <BottomSheet
        index={1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animateOnMount={true}
        detached = {true}
        ba
        onChange={handleSheetChange}
        keyboardBehavior = 'fullScreen'
      >
        <Navigator useCurrentPosition = {useCurrentPosition} setUseCurrentPosition = { setUseCurrentPosition } />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height - 80 ,
    padding: 24,
    position: 'absolute',
    bottom: 0,
  },

});

export default NavigatorExample;