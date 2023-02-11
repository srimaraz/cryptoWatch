import {StyleProp, Text, TextStyle} from 'react-native';
import React, {useContext} from 'react';
import ThemeContext from '../../../../config/themeContext';
import COLOR_PALETTE from '../../../../config/themes';

interface TextProps {
  textStyle?: StyleProp<TextStyle>;
  fontFamily?: string;
  color?: string | undefined;
  children: string | React.ReactElement | undefined;
}

const getStyles = (
  fontSize: number,
  lineHeight: number,
  fontFamily: string,
  color: string | undefined,
): StyleProp<TextStyle> => {
  return {
    fontSize,
    lineHeight,
    fontFamily,
    color: color,
  };
};
const Regular1012 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Text Regular',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(10, 12, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const Regular1214 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Text Regular',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(12, 14, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const SemiBold1012 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Semibold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(10, 12, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const SemiBold1214 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Semibold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(12, 14, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const Bold1214 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Bold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(12, 14, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const Regular1416 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Text Regular',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(14, 16, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const SemiBold1416 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Semibold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(14, 16, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const Bold1416 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Bold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(14, 16, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const Regular1618 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Text Regular',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(16, 18, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const SemiBold1618 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Semibold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(16, 18, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const SemiBold2428 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Bold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(24, 28, fontFamily, color)]}>
      {children}
    </Text>
  );
};

const Bold1618 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Bold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(16, 18, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const SemiBold1820 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Semibold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(18, 20, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const Bold1820 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Bold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(18, 20, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const Bold2024 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Heavy',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(20, 24, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const Bold2428 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Heavy',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(24, 28, fontFamily, color)]}>
      {children}
    </Text>
  );
};
const Bold2830 = (props: TextProps) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    textStyle,
    fontFamily = 'SF Pro Display Bold',
    color = theme.textColor1,
    children = '',
  } = props;
  return (
    <Text style={[textStyle, getStyles(28, 30, fontFamily, color)]}>
      {children}
    </Text>
  );
};

export {
  Regular1012,
  SemiBold1012,
  SemiBold1214,
  Regular1214,
  Bold1214,
  SemiBold1416,
  Regular1416,
  Bold1416,
  SemiBold1618,
  Regular1618,
  Bold1618,
  SemiBold1820,
  Bold1820,
  Bold2024,
  SemiBold2428,
  Bold2428,
  Bold2830,
};
