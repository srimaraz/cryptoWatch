import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SemiBold1618} from '../Text';
import COLOR_PALETTE from '../../../../config/themes';
import ThemeContext from '../../../../config/themeContext';

const ErrorMessage = () => {
  const theme = useContext(ThemeContext);
  const COLORS = COLOR_PALETTE[theme];
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.backgroundColor,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="warning" size={40} color={COLORS.lossRed} />
      <SemiBold1618 color={COLORS.lossRed}>Something went wrong!</SemiBold1618>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({});
