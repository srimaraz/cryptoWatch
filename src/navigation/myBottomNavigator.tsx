/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomeScreen';
import MarketPage from '../screens/MarketsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ThemeContext from '../../config/themeContext';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import COLOR_PALETTE from '../../config/themes';
import {screenHeight} from '../utils/constants';

const Tab = createBottomTabNavigator();

function AllTabs({itemColor, secondaryPurpleBlur}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        showLabel: false,
        tabBarStyle: {
          height: 68,
        },

        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <Entypo
              name="home"
              size={focused ? 32 : 28}
              color={focused ? itemColor : secondaryPurpleBlur}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketPage}
        options={{
          tabBarIcon: ({focused}) => (
            <Entypo
              name="area-graph"
              size={focused ? 30 : 26}
              color={focused ? itemColor : secondaryPurpleBlur}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Entypo
              name="pie-chart"
              size={focused ? 30 : 26}
              color={focused ? itemColor : secondaryPurpleBlur}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="user-alt"
              size={focused ? 28 : 24}
              color={focused ? itemColor : secondaryPurpleBlur}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MyBottomTabNavigator() {
  const theme = useContext(ThemeContext);
  const {primaryPurple, primaryPurpleWithOpacity: secondaryPurpleBlur} =
    COLOR_PALETTE[theme];

  return (
    // <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
    <AllTabs
      itemColor={primaryPurple}
      secondaryPurpleBlur={secondaryPurpleBlur}
    />
    // </NavigationContainer>
  );
}
