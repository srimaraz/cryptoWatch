import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import ThemeContext from '../../../../config/themeContext';
import {Bold1820} from '../Text';
import COLOR_PALETTE from '../../../../config/themes';
import {screenHeight} from '../../../utils/constants';

interface FilledButtonProps {
  fillcolor?: string;
  textColor?: string;
  width?: number | string;
  height?: number | string;
  text: string;
  onPress: any;
  disabled?: boolean;
}
const FilledButton = (props: FilledButtonProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    fillcolor = theme.primaryPurple,
    textColor = 'white',
    width = '100%',
    height = screenHeight / 15,
    text = '',
    onPress,
    disabled = false,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        height,
        width,
        backgroundColor: fillcolor,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Bold1820 color={textColor}>{text}</Bold1820>
    </TouchableOpacity>
  );
};

export default FilledButton;

const styles = StyleSheet.create({});
