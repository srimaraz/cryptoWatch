import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './style';
import ThemeContext from '../../../config/themeContext';
import SizedBox from '../../components/Atoms/sizedBox';
import {
  Bold1618,
  Regular1012,
  Regular1214,
  SemiBold1416,
} from '../../components/Atoms/Text';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLOR_PALETTE from '../../../config/themes';
import HomeCoinsLoader from '../../components/Atoms/SkeletonLoaders/homeCoinsLoader';
import {useNavigation} from '@react-navigation/native';
import ErrorMessage from '../../components/Atoms/ErrorComponents/errorMessage';
import {screenWidth} from '../../utils/constants';

const TrendingTokens = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const navigation = useNavigation();
  const [trendingCoinsList, setTrendingCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingTokensList();
  }, []);
  const fetchTrendingTokensList = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/search/trending',
      );
      const result = await response.json();
      setTrendingCoinsList(result.coins);
    } catch (error) {
      console.log('Failed to fetch Trending Tokens. Cause: ', error);
    } finally {
      setLoading(false);
    }
  };
  const renderTrendingCard = ({item, index}) => {
    const {item: tokenItem} = item;
    const {id, name, symbol, market_cap_rank, large: imageLarge} = tokenItem;
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
          flex: 1,
          minHeight: screenWidth / 3.4,
          minWidth: screenWidth / 3.4,
          marginRight: 12,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          elevation: 2,
          paddingVertical: 12,
          marginVertical: 10,
          backgroundColor: theme.readableBackgroundColor,
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
          <Ionicons
            name="ios-trending-up"
            size={16}
            color={theme.primaryPurple}
          />
        </View>
        <Image
          style={styles.coinsCardImage}
          source={{
            uri: imageLarge,
          }}
          resizeMode="contain"
        />
        <SizedBox height={8} />
        <SemiBold1416
          textStyle={{
            textAlign: 'center',
          }}>{`${symbol}`}</SemiBold1416>
        <SizedBox height={8} />
        <Regular1214>{`Rank: #${market_cap_rank}`}</Regular1214>
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
          <SimpleLineIcons
            name="fire"
            size={20}
            color={theme.textColor1}
            style={{marginRight: 6}}
          />
          <Bold1618>Trending Coins</Bold1618>
        </View>
        <Regular1012>Based on Popularity [24h]</Regular1012>
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
          data={trendingCoinsList}
          keyExtractor={item => item.item.coin_id}
          renderItem={renderTrendingCard}
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

export default TrendingTokens;
