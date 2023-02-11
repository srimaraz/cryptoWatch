import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Bold1416, Bold2024} from './Text';
import ThemeContext from '../../../config/themeContext';
import COLOR_PALETTE from '../../../config/themes';
import Tryl from '../../assets/Images/logoSvgCopy.svg';
import {useNavigation} from '@react-navigation/native';
import UserSettingsContext from '../../../config/userSettingsContext';

interface HeaderProps {
  title: string;
  showIcon?: boolean;
  showCurrency?: boolean;
}
const Header = (props: HeaderProps) => {
  const {title, showIcon = false, showCurrency = true} = props;
  const theme = useContext(ThemeContext);
  const COLOR = COLOR_PALETTE[theme];
  const navigation = useNavigation();
  const {
    currencyInfo: {currency, symbol},
  } = useContext(UserSettingsContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: COLOR.backgroundColor,
        paddingHorizontal: 10,
      }}>
      {/* <SVGComponent2 /> */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 10}}>
          <Tryl width={40} height={40} style={{merginLeft: 40}} />
        </View>

        <Bold2024 color={COLOR.primaryPurple}>{title}</Bold2024>
      </View>
      {showCurrency && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Bold1416 color={COLOR.primaryPurple}>
            {currency?.toUpperCase() ?? 'Chnage Currency'}
          </Bold1416>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
