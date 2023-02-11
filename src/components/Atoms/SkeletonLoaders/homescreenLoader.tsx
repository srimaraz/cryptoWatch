import {Text, View, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../../config/themeContext';
import {screenWidth} from '../../../utils/constants';
import SizedBox from '../sizedBox';
import COLOR_PALETTE from '../../../../config/themes';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeScreenSkeletonLoader = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const shimmerLocations = [0.3, 0.5, 0.7];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.backgroundColor}}>
      {[...Array(5).keys()].map(key => (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 18,
            marginVertical: 14,
          }}>
          <ShimmerPlaceholder
            style={{height: 70, width: 70, borderRadius: 50, marginRight: 10}}
            shimmerColors={theme.shimmerColors}
            location={shimmerLocations}
          />
          <View style={{width: screenWidth - 150}}>
            <ShimmerPlaceholder
              style={{height: 50, width: '100%', borderRadius: 12}}
              shimmerColors={theme.shimmerColors}
              location={shimmerLocations}
            />
            <SizedBox height={10} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {[1, 2, 3].map((i, j) => (
                <ShimmerPlaceholder
                  key={i}
                  style={{
                    height: 25,
                    width: 60,
                    borderRadius: 12,
                    marginRight: 10,
                  }}
                  shimmerColors={theme.shimmerColors}
                  location={shimmerLocations}
                />
              ))}
            </View>
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default HomeScreenSkeletonLoader;
