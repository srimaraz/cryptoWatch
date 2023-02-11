import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import ThemeContext from '../../../../config/themeContext';
import {Bold1820} from '../Text';
import COLOR_PALETTE from '../../../../config/themes';
import {screenHeight} from '../../../utils/constants';

interface HighlightButtonProps {
  fillcolor?: string;
  textColor?: string;
  width?: number | string;
  height?: number | string;
  text: string;
  onPress: any;
}
const HighlightButton = (props: HighlightButtonProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    fillcolor = theme.lossRedBlur,
    textColor = theme.lossRed,
    width = '100%',
    height = screenHeight / 15,
    text = '',
    onPress,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height,
        width,
        backgroundColor: fillcolor,
        borderWidth: 2,
        borderColor: textColor,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Bold1820 color={textColor}>{text}</Bold1820>
    </TouchableOpacity>
  );
};

export default HighlightButton;

const styles = StyleSheet.create({});
