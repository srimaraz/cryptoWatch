import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import ThemeContext from '../../../config/themeContext';
import {formatNumber} from '../../utils/formatNumber';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {
  Bold1214,
  Regular1214,
  Regular1416,
  Regular1618,
  SemiBold1012,
  SemiBold1214,
  SemiBold1416,
} from '../../components/Atoms/Text';
import COLOR_PALETTE from '../../../config/themes';
import SizedBox from '../../components/Atoms/sizedBox';

const CoinListItems = ({item}) => {
  const {
    name,
    symbol,
    image: logoUrl,
    market_cap,
    market_cap_rank: rank,
    current_price,
    price_change_percentage_24h: change_percentage,
  } = item;
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const changeColorDark =
    change_percentage > 0 ? theme.profitGreen : theme.lossRed;
  const changeColorLight =
    change_percentage > 0 ? theme.profitGreenBlur : theme.lossRedBlur;

  // const chartData = item.sparkline_in_7d.price?.filter(
  //   (item, index) => index % 10 === 0,
  // );
  return (
    <View
      style={[
        styles.container,
        // {backgroundColor: theme.readableBackgroundColor},
      ]}>
      <View style={{width: '10%', alignItems: 'flex-start'}}>
        <SemiBold1214 color={theme.primaryPurple}>{rank}</SemiBold1214>
      </View>

      <View
        style={{
          width: '42%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: `${logoUrl}`,
          }}
          style={styles.imageStyle}
        />
        <View
          style={{
            marginLeft: 10,
            height: 45,
            justifyContent: 'space-evenly',
          }}>
          <SemiBold1416>{symbol?.toUpperCase()}</SemiBold1416>
          <Regular1214>{formatNumber(market_cap)}</Regular1214>
        </View>
      </View>
      <View
        style={{
          width: '30%',
        }}>
        <SemiBold1416>{formatNumber(current_price)}</SemiBold1416>
      </View>
      <View
        style={[
          {backgroundColor: changeColorLight, borderColor: changeColorDark},
          styles.pnlContainer,
        ]}>
        <SemiBold1214 color={changeColorDark}>{`${change_percentage?.toFixed(
          2,
        )}%`}</SemiBold1214>
      </View>
    </View>
  );
};

export default CoinListItems;
