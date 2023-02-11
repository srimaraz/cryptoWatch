import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import ThemeContext from '../../../../config/themeContext';
import COLOR_PALETTE from '../../../../config/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Bold1618} from '../Text';

const ErrorWarning = () => {
  const theme = useContext(ThemeContext);
  const COLOR = COLOR_PALETTE[theme];
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.backgroundColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: COLOR.lossRedBlur,
          borderRadius: 12,
        }}>
        <Ionicons name="warning" color={COLOR.lossRed} size={35} />
        <Bold1618 color={COLOR.lossRed}>Something Went Wrong!</Bold1618>
      </View>
    </View>
  );
};

export default ErrorWarning;

const styles = StyleSheet.create({});
