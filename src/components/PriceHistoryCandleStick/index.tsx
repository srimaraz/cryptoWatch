import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThemeContext from '../../../config/themeContext';
import {CandlestickChart} from 'react-native-wagmi-charts';
import {screenHeight, screenWidth} from '../../utils/constants';
import ChartLoader from '../Atoms/ChartLoader';
import COLOR_PALETTE from '../../../config/themes';
import {Bold1416} from '../Atoms/Text';

interface Iprops {
  selectedTabIndex: number;
  tabConfig: Array<any>;
  tokenId: string;
}
const PriceHistoryCandleSticks = (props: Iprops) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {selectedTabIndex, tabConfig, tokenId} = props;
  const [marketHistoryData, setMarketHistoryData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPriceHistoryCandlesData();
  }, [selectedTabIndex]);

  const fetchPriceHistoryCandlesData = async () => {
    if (tabConfig[selectedTabIndex].value === '1h') {
      setErrorMessage('Chart not available for selected range');
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${tokenId}/ohlc?vs_currency=inr&days=${tabConfig[selectedTabIndex].value}`,
      );

      const res2 = await res.json();
      const temp = res2.map((item, index) => {
        return {
          timestamp: item[0],
          open: item[1],
          close: item[2],
          high: item[3],
          low: item[4],
        };
      });
      setMarketHistoryData(temp);
    } catch (err) {
      console.log('errorr', err);
    } finally {
      setErrorMessage('');
      setLoading(false);
    }
  };
  if (loading) {
    return <ChartLoader />;
  }
  if (!marketHistoryData.length || errorMessage) {
    return (
      <View
        style={{
          width: screenWidth,
          height: screenHeight / 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Bold1416>{errorMessage || 'No data found'}</Bold1416>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <CandlestickChart.Provider data={marketHistoryData}>
        <CandlestickChart width={screenWidth} height={screenHeight / 3}>
          <CandlestickChart.Candles />
          <CandlestickChart.Crosshair>
            <CandlestickChart.Tooltip />
          </CandlestickChart.Crosshair>
        </CandlestickChart>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: screenWidth,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View>
            <CandlestickChart.PriceText
              style={{color: theme.textColor1}}
              type="high"
              format={({value}) => {
                'worklet';
                return `High: ${value}`;
              }}
            />
            <CandlestickChart.PriceText
              style={{color: theme.textColor1}}
              type="low"
              format={({value}) => {
                'worklet';
                return `Low: ${value}`;
              }}
            />
          </View>
          <View>
            <CandlestickChart.PriceText
              style={{color: theme.textColor1}}
              type="open"
              format={({value}) => {
                'worklet';
                return `Open: ${value}`;
              }}
            />
            <CandlestickChart.PriceText
              style={{color: theme.textColor1}}
              type="close"
              format={({value}) => {
                'worklet';
                return `Close: ${value}`;
              }}
            />
          </View>
        </View>
      </CandlestickChart.Provider>
    </GestureHandlerRootView>
  );
};

export default PriceHistoryCandleSticks;
