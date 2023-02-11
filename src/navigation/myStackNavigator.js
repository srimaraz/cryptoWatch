/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {DarkTheme, LightTheme, DefaultTheme} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import ThemeContext from '../../config/themeContext';
import {StyleSheet, Text, View} from 'react-native';
import COLOR_PALETTE from '../../config/themes';
import MyBottomTabNavigator from './myBottomNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CoinChartScreen from '../screens/CoinChartScreen';

const Stack = createNativeStackNavigator();

export default function MyStackNavigator() {
  const theme = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <Stack.Navigator
        screenOptions={{
          showLabel: false,
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabs" component={MyBottomTabNavigator} />
        <Stack.Screen
          name="CoinChartAndDetailsPage"
          component={CoinChartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
