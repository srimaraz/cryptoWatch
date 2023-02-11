import {ScrollView, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ThemeContext from '../../../../config/themeContext';
import DescriptionMarketDataSection from './descriptionMarketData';
import DescriptionTokenLinks from './descriptionLinks';
import COLOR_PALETTE from '../../../../config/themes';
import {SemiBold1618} from '../../Atoms/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

interface CoinDescriptionProps {
  tokenId: string;
}
const CoinDescription = (props: CoinDescriptionProps) => {
  const {tokenId} = props;
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const [descriptionData, setDescriptionData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    fetchCoinDescriptionData();
  }, []);

  const fetchCoinDescriptionData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${tokenId}?localization=false&market_data=true&sparkline=false`;
    try {
      const res = await fetch(url);
      const res2 = await res.json();
      setDescriptionData(res2);
    } catch (err) {
      console.log('Failed to fetch description data, Reason:', err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <SemiBold1618 textStyle={{alignSelf: 'center'}}>Loading..</SemiBold1618>
      </View>
    );
  }
  if (failed) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="warning" size={40} color={theme.lossRed} />
        <SemiBold1618 color={theme.lossRed}>Something went wrong!</SemiBold1618>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: theme.readableBackgroundColor, paddingTop: 10}}>
      <DescriptionMarketDataSection descriptionData={descriptionData} />
      <DescriptionTokenLinks
        links={descriptionData?.links}
        logo={descriptionData.image?.large ?? ''}
      />
    </ScrollView>
  );
};

export default CoinDescription;
