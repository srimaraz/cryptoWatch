import {Text, View, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../../config/themeContext';
import {screenHeight, screenWidth} from '../../../utils/constants';
import SizedBox from '../sizedBox';
import COLOR_PALETTE from '../../../../config/themes';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeCoinsLoader = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const shimmerLocations = [0.3, 0.5, 0.7];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        minHeight: screenWidth / 3.4,
        minWidth: screenWidth / 3.4,
        backgroundColor: theme.backgroundColor,
        flexDirection: 'row',
      }}>
      {[...Array(6).keys()].map(key => (
        <View
          key={key}
          style={{
            minHeight: screenWidth / 3.4,
            minWidth: screenWidth / 3.4,
            marginRight: 12,
            borderRadius: 10,
            backgroundColor: theme.readableBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            padding: 8,
          }}>
          <ShimmerPlaceholder
            style={{
              height: screenHeight / 20,
              width: screenHeight / 20,
              borderRadius: 60,
            }}
            shimmerColors={theme.shimmerColors}
            location={shimmerLocations}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <ShimmerPlaceholder
              style={{
                height: screenHeight / 40,
                width: screenWidth / 4,
                borderRadius: 12,
              }}
              shimmerColors={theme.shimmerColors}
              location={shimmerLocations}
            />
            <SizedBox height={8} />
            <ShimmerPlaceholder
              style={{
                height: screenHeight / 40,
                width: screenWidth / 4.5,
                borderRadius: 12,
              }}
              shimmerColors={theme.shimmerColors}
              location={shimmerLocations}
            />
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default HomeCoinsLoader;
