import {View} from 'react-native';
import React, {useContext} from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../../config/themeContext';
import SizedBox from '../sizedBox';
import COLOR_PALETTE from '../../../../config/themes';
import {screenHeight} from '../../../utils/constants';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const PortfolioBottomSkeletonLoader = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const shimmerLocations = [0.3, 0.5, 0.7];
  return (
    <View
      style={{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 40,
        backgroundColor: theme.backgroundColor,
      }}>
      {[...Array(8).keys()].map(key => (
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
                  height: screenHeight / 25,
                  width: screenHeight / 5,
                  borderRadius: 12,
                }}
                shimmerColors={theme.shimmerColors}
                location={shimmerLocations}
              />
              <SizedBox height={8} />
              <ShimmerPlaceholder
                style={{
                  height: screenHeight / 28,
                  width: screenHeight / 8,
                  borderRadius: 12,
                  marginRight: 14,
                }}
                shimmerColors={theme.shimmerColors}
                location={shimmerLocations}
              />
            </View>
          </View>

          <ShimmerPlaceholder
            style={{
              height: screenHeight / 28,
              width: screenHeight / 8,
              borderRadius: 12,
              alignSelf: 'flex-start',
            }}
            shimmerColors={theme.shimmerColors}
            location={shimmerLocations}
          />
        </View>
      ))}
    </View>
  );
};

export default PortfolioBottomSkeletonLoader;
