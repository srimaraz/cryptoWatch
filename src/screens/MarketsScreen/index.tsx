import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import CoinListItems from './coinListItems';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CoinListSkeletonLoader from '../../components/Atoms/SkeletonLoaders/coinListScreenLoader';
import ThemeContext from '../../../config/themeContext';
import COLOR_PALETTE from '../../../config/themes';
import {SemiBold1214} from '../../components/Atoms/Text';
import ErrorWarning from '../../components/Atoms/ErrorWarnings';
import {useIsFocused} from '@react-navigation/native';
import UserSettingsContext from '../../../config/userSettingsContext';
import Header from '../../components/Atoms/header';

const MarketPage = ({navigation}) => {
  const {currencyInfo} = useContext(UserSettingsContext);
  const {currency, symbol: currencySymbol} = currencyInfo;
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const [coinDataArray, setCoinDataArray] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [sortingKey, setSortingKey] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [failed, setFailed] = useState(false);
  const isFocused: boolean = useIsFocused();

  const onRefresh = () => {
    setIsRefreshing(true);
    getCoinPricesList();
  };
  useEffect(() => {
    if (isFocused) {
      getCoinPricesList();
    }
  }, [isFocused]);

  const getCoinPricesList = () => {
    setPageLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=1&sparkline=true&price_change_percentage=24h`,
    )
      .then(res =>
        res.json().then(res2 => {
          setCoinDataArray(res2);
          setIsRefreshing(false);
          setPageLoading(false);
        }),
      )
      .catch(err => {
        console.log('failed to fetch coin data', err);
        setIsRefreshing(false);
        setPageLoading(false);
      });
  };

  // if (pageLoading) {
  //   return <CoinListSkeletonLoader />;
  // }

  const handleRedirection = (item: any) => {
    const {id, name, symbol} = item;
    if (id) {
      navigation.navigate('CoinChartAndDetailsPage', {
        tokenId: id,
        name,
        symbol,
      });
    }
  };

  const handleSort = (selectedSortingKey: string): void => {
    if (!coinDataArray?.length) {
      return;
    }
    if (selectedSortingKey === sortingKey) {
      setIsAscending(!isAscending);
    }
    const temp = [...coinDataArray];
    if (isAscending) {
      temp.sort((a, b) => a[selectedSortingKey] - b[selectedSortingKey]);
    } else {
      temp.sort((a, b) => b[selectedSortingKey] - a[selectedSortingKey]);
    }
    setCoinDataArray(temp);
    setSortingKey(selectedSortingKey);
  };
  const sortHeadersMap = [
    {title: '#', key: 'market_cap_rank', width: '10%'},
    {title: 'Market Cap', key: 'market_cap', width: '42%'},
    {
      title: `Price (${currency.toUpperCase()})`,
      key: 'current_price',
      width: '30%',
    },
    {title: '24h', key: 'price_change_percentage_24h', width: '18%'},
  ];

  const renderHeader = (item: any, index) => {
    const {title, key, width} = item;
    return (
      <TouchableOpacity
        onPress={() => {
          handleSort(key);
        }}
        key={key}
        style={{
          width,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: key === 'market_cap' ? 35 : 4,
        }}>
        <SemiBold1214
          color={sortingKey === key ? theme.primaryPurple : theme.textColor1}>
          {title}
        </SemiBold1214>
        <Ionicons
          name={sortingKey === key && isAscending ? 'caret-up' : 'caret-down'}
          color={sortingKey === key ? theme.primaryPurple : theme.textColor1}
          style={{marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.mainContainer, {backgroundColor: theme.backgroundColor}]}>
      <View style={{marginLeft: -10}}>
        <Header title={'Market'} />
      </View>

      <View style={{height: 40, flexDirection: 'row'}}>
        {sortHeadersMap.map(renderHeader)}
      </View>
      {pageLoading ? (
        <View style={{height: '100%', width: '100%'}}>
          <CoinListSkeletonLoader />
        </View>
      ) : failed ? (
        <ErrorWarning />
      ) : (
        <FlatList
          data={coinDataArray}
          keyExtractor={(item: unknown) => item.id}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          // updateCellsBatchingPeriod={30}
          removeClippedSubviews={true}
          renderItem={({item}) => (
            <TouchableOpacity onPress={(): void => handleRedirection(item)}>
              <CoinListItems item={item} />
            </TouchableOpacity>
          )}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={
          //   <View>
          //     <Text style={styles.textHeading}>Markets</Text>
          //     <View style={styles.divider} />
          //   </View>
          // }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padingTop: 20,
    paddingHorizontal: 10,
  },
  textHeading: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default MarketPage;
