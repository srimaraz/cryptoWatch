import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarketPage from '../screens/MarketsScreen';

const Stack = createNativeStackNavigator();

const MarketStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Markets"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Markets" component={MarketPage} />
    </Stack.Navigator>
  );
};

export default MarketStack;
