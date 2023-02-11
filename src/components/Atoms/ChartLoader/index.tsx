import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {screenHeight, screenWidth} from '../../../utils/constants';
import ThemeContext from '../../../../config/themeContext';
import COLOR_PALETTE from '../../../../config/themes';

const ChartLoader = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  return (
    <View
      style={{
        height: screenHeight / 3,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 40,
          width: 120,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.greyBlur,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: 'black',
          }}>
          Calculating..
        </Text>
      </View>
      <Text style={{fontSize: 12, color: theme.textColor1, marginTop: 10}}>
        This may take few seconds.
      </Text>
    </View>
  );
};

export default ChartLoader;

const styles = StyleSheet.create({});
