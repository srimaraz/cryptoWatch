import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SemiBold1416} from '../../components/Atoms/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenHeight} from '../../utils/constants';
import ModalCoinsListLoader from '../../components/Atoms/SkeletonLoaders/modalCoinsListLoader';
import COLOR_PALETTE from '../../../config/themes';
import ThemeContext from '../../../config/themeContext';
import ErrorMessage from '../../components/Atoms/ErrorComponents/errorMessage';

interface SupportedCoinsListProps {
  handleCoinNamePress: Function;
}
const SupportedCoinsList = (props: SupportedCoinsListProps) => {
  const {handleCoinNamePress} = props;
  const [coinsList, setCoinsList] = useState([]);
  const [filteredCoinsList, setFilteredCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [userInputText, setUserInputText] = useState('');
  const theme = useContext(ThemeContext);
  const COLORS = COLOR_PALETTE[theme];
  const firstPageUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1';
  const secondPageUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=2';

  useEffect(() => {
    fetchCoinsList();
  }, []);

  const fetchCoinsList = () => {
    let coinsResponse: any = [];
    Promise.all([fetch(firstPageUrl), fetch(secondPageUrl)])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          }),
        );
      })
      .then(function (data) {
        // You would do something with both sets of data here
        coinsResponse = [...data[0], ...data[1]];
        setCoinsList(coinsResponse);
        setFilteredCoinsList(coinsResponse);
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
        setFailed(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const filterCoins = e => {
    if (e.trim() === '') {
      setUserInputText('');
      setFilteredCoinsList(coinsList);
      return;
    }
    setUserInputText(e);
    const temp = coinsList.filter((item: any) =>
      (item.name + item.symbol).toLowerCase().includes(e),
    );
    setFilteredCoinsList(temp);
  };

  if (loading) {
    return <ModalCoinsListLoader />;
  }
  if (failed) {
    return <ErrorMessage />;
  }
  const renderCoinItem = ({item, index}) => {
    const {name, symbol, id, image} = item;
    return (
      <TouchableOpacity
        style={{
          height: 40,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={() => {
          handleCoinNamePress(name, symbol, id, image);
        }}>
        <Image
          source={{uri: image}}
          style={{height: 35, width: 35, borderRadius: 30, marginRight: 20}}
        />
        <SemiBold1416>{name + ` (${symbol?.toUpperCase()})`}</SemiBold1416>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height: screenHeight / 1.5}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 50,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 10,
          marginBottom: 16,
        }}>
        <AntDesign name="search1" size={22} color={COLORS.textColor1} />
        <TextInput
          style={{
            width: '100%',
            marginLeft: 10,
            color: COLORS.textColor1,
            fontFamily: 'SF Pro Text Regular',
          }}
          value={userInputText}
          onChangeText={filterCoins}
          placeholder="Search Coin"
          placeholderTextColor={COLORS.textColor1}
        />
      </View>
      <FlatList
        data={filteredCoinsList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        maxToRenderPerBatch={10}
        renderItem={renderCoinItem}
      />
    </View>
  );
};

export default SupportedCoinsList;

const styles = StyleSheet.create({});
