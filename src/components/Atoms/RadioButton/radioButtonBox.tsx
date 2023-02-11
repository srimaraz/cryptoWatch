import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {screenWidth} from '../../../utils/constants';
import {SemiBold1416, SemiBold1618} from '../Text';

const RadioButtonBox = props => {
  const {title, colorLight, colorDark, selected, onSelect} = props;
  return (
    <Pressable
      onPress={onSelect}
      style={{
        height: 50,
        width: screenWidth / 2.3,
        backgroundColor: colorLight,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colorDark,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 26,
          width: 26,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: colorDark,
          padding: 4,
          marginRight: 10,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            backgroundColor: selected ? colorDark : null,
          }}
        />
      </View>
      <SemiBold1618 color={colorDark}>{title}</SemiBold1618>
    </Pressable>
  );
};

export default RadioButtonBox;

const styles = StyleSheet.create({});
