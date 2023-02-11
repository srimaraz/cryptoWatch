import {View, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../../config/themeContext';
import SizedBox from '../sizedBox';
import COLOR_PALETTE from '../../../../config/themes';
import {screenHeight, screenWidth} from '../../../utils/constants';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CoinListSkeletonLoader = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const shimmerLocations = [0.3, 0.5, 0.7];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.backgroundColor}}>
      {[...Array(15).keys()].map(key => (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 18,
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ShimmerPlaceholder
              style={{
                height: screenHeight / 20,
                width: screenHeight / 20,
                borderRadius: 60,
                marginRight: 20,
              }}
              shimmerColors={theme.shimmerColors}
              location={shimmerLocations}
            />
            <View>
              <ShimmerPlaceholder
                style={{
                  height: screenHeight / 30,
                  width: screenWidth / 5,
                  borderRadius: 12,
                }}
                shimmerColors={theme.shimmerColors}
                location={shimmerLocations}
              />
              <SizedBox height={8} />
              <ShimmerPlaceholder
                style={{
                  height: screenHeight / 35,
                  width: screenWidth / 7,
                  borderRadius: 12,
                  marginRight: 10,
                }}
                shimmerColors={theme.shimmerColors}
                location={shimmerLocations}
              />
            </View>
          </View>
          <ShimmerPlaceholder
            style={{
              height: screenHeight / 35,
              width: screenWidth / 7,
              borderRadius: 12,
              alignSelf: 'flex-start',
            }}
            shimmerColors={theme.shimmerColors}
            location={shimmerLocations}
          />
          <View
            style={{
              alignSelf: 'flex-start',
              alignItems: 'flex-end',
            }}>
            <ShimmerPlaceholder
              style={{
                height: screenHeight / 35,
                width: screenWidth / 7,
                borderRadius: 12,
                marginRight: 10,
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

export default CoinListSkeletonLoader;
