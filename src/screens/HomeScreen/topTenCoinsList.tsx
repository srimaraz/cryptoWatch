import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Bold1618,
  Regular1012,
  Regular1214,
  SemiBold1214,
  SemiBold1416,
} from '../../components/Atoms/Text';
import SizedBox from '../../components/Atoms/sizedBox';
import styles from './style';
import ThemeContext from '../../../config/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../utils/formatNumber';
import COLOR_PALETTE from '../../../config/themes';
import HomeCoinsLoader from '../../components/Atoms/SkeletonLoaders/homeCoinsLoader';
import {useNavigation} from '@react-navigation/native';
import UserSettingsContext from '../../../config/userSettingsContext';
import ErrorMessage from '../../components/Atoms/ErrorComponents/errorMessage';
import {screenHeight, screenWidth} from '../../utils/constants';

const TopTenCoins = () => {
  const navigation = useNavigation();
  const {currencyInfo} = useContext(UserSettingsContext);
  const {currency, symbol: currencySymbol} = currencyInfo;
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const [topTenCoinsList, setTopTenCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopTenCoinsList();
  }, []);

  const fetchTopTenCoinsList = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setTopTenCoinsList(result);
    } catch (error) {
      console.log('Failed to fetch Trending Tokens. Cause: ', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTopTenCoinsCard = ({item, index}) => {
    const {
      id,
      market_cap_rank,
      image,
      name,
      symbol,
      current_price,
      price_change_percentage_24h,
    } = item;
    let changeColorDark =
      price_change_percentage_24h > 0 ? theme.profitGreen : theme.lossRed;
    const changeColor =
      price_change_percentage_24h > 0
        ? theme.profitGreenBlur
        : theme.lossRedBlur;

    return (
      <TouchableOpacity
        onPress={() => {
          if (id) {
            navigation.navigate('CoinChartAndDetailsPage', {
              tokenId: id,
              name,
              symbol,
            });
          }
        }}
        style={{
          //same style is in in skeletonloader
          flex: 1,
          minHeight: screenWidth / 3.4,
          minWidth: screenWidth / 3.4,
          marginRight: 12,
          borderRadius: 10,
          backgroundColor: theme.readableBackgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
          padding: 8,
          paddingVertical: 12,
          marginVertical: 12,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            height: 22,
            width: 22,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.primaryPurpleMaxBlur,
          }}>
          <SemiBold1214
            color={theme.primaryPurple}>{`${market_cap_rank}`}</SemiBold1214>
        </View>
        <Image
          style={styles.coinsCardImage}
          source={{
            uri: image,
          }}
          resizeMode="contain"
        />
        <SizedBox height={8} />
        <SemiBold1416>{(symbol ?? '').toUpperCase()}</SemiBold1416>
        <SizedBox height={4} />
        <Regular1214>
          {currencySymbol + ' ' + formatNumber(item.current_price)}
        </Regular1214>
        <SizedBox height={4} />
        <View
          style={{
            backgroundColor: changeColor,
            borderColor: changeColorDark,
            borderWidth: 0.5,
            alignItems: 'center',
            width: '80%',
            justifyContent: 'center',
            paddingVertical: 4,
            borderRadius: 6,
          }}>
          <SemiBold1214
            color={changeColorDark}>{`${price_change_percentage_24h.toFixed(
            2,
          )} %`}</SemiBold1214>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        paddingHorizontal: 10,
        paddingTop: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="crown-outline"
            size={26}
            color={theme.textColor1}
            style={{marginRight: 6}}
          />
          <Bold1618>Top 10</Bold1618>
        </View>
        <Regular1012>Based on Market Cap</Regular1012>
      </View>
      {loading ? (
        <View
          style={{
            marginVertical: 10,
            minHeight: screenWidth / 3.4,
            minWidth: screenWidth / 3.4,
          }}>
          <HomeCoinsLoader />
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topTenCoinsList}
          keyExtractor={item => item.id}
          renderItem={renderTopTenCoinsCard}
          ListEmptyComponent={
            <View
              style={{
                height: 160,
                width: screenWidth,
                justifyContent: 'center',
              }}>
              <ErrorMessage />
            </View>
          }
        />
      )}
    </View>
  );
};

export default TopTenCoins;
