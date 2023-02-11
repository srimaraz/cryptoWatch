import {View} from 'react-native';
import React, {useContext} from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../../../config/themeContext';
import SizedBox from '../sizedBox';
import COLOR_PALETTE from '../../../../config/themes';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ModalCoinsListLoader = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const shimmerLocations = [0.3, 0.5, 0.7];
  return (
    <View
      style={{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: theme.backgroundColor,
      }}>
      {[...Array(10).keys()].map(key => (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ShimmerPlaceholder
              style={{height: 45, width: 45, borderRadius: 30, marginRight: 18}}
              shimmerColors={theme.shimmerColors}
              location={shimmerLocations}
            />
            <View>
              <ShimmerPlaceholder
                style={{height: 30, width: 300, borderRadius: 12}}
                shimmerColors={theme.shimmerColors}
                location={shimmerLocations}
              />
              <SizedBox height={8} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ModalCoinsListLoader;
