import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LineChart} from 'react-native-wagmi-charts';
import ThemeContext from '../../../config/themeContext';
import COLOR_PALETTE from '../../../config/themes';
import UserSettingsContext from '../../../config/userSettingsContext';
import {screenHeight, screenWidth} from '../../utils/constants';
import ChartLoader from '../Atoms/ChartLoader';
import {SemiBold1214} from '../Atoms/Text';

interface Iprops {
  selectedTabIndex: number;
  selctedMainTabValue: string;
  tabConfig: Array<any>;
  tokenId: string;
}
interface MarketDataArrayProps {
  timestamp: any;
  value: any;
}
const PriceHistoryLineChart = (props: Iprops) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {
    currencyInfo: {symbol: currencySymbol, currency},
  } = useContext(UserSettingsContext);
  const {
    selectedTabIndex,
    tabConfig,
    tokenId,
    selctedMainTabValue = 'prices',
  } = props;
  const [marketHistoryData, setMarketHistoryData] = useState<
    Array<MarketDataArrayProps>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartColor, setChartColor] = useState(theme.profitGreen);
  const [apiResposePricesMcapVolumes, setApiResposePricesMcapVolumes] =
    useState({
      prices: [],
      market_cap: [],
      total_volumes: [],
    });

  useEffect(() => {
    fetchPriceHistoryLineChartData();
  }, [selectedTabIndex]);

  useEffect(() => {
    if (!apiResposePricesMcapVolumes?.[selctedMainTabValue]?.length) {
      return;
    }
    handleDataMapping(apiResposePricesMcapVolumes);
  }, [selctedMainTabValue]);

  const fetchPriceHistoryLineChartData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=${currency}&days=${tabConfig[selectedTabIndex].value}&interval=${tabConfig[selectedTabIndex].interval}`,
      );
      const res2 = await res.json();
      if (!res2[selctedMainTabValue]) {
        setLoading(false);
        return;
      }
      setApiResposePricesMcapVolumes(res2);
      handleDataMapping(res2);
    } catch (e) {
      console.log('error in fetchPriceHistoryLineChartData', e);
      setLoading(false);
    }
  };

  const handleDataMapping = (res2: any) => {
    setLoading(true);
    const arr = res2?.[selctedMainTabValue] ?? [];
    const tempDiff = arr[arr.length - 1]?.[1] - arr[0]?.[1];
    if (tempDiff < 0) {
      setChartColor(theme.lossRed);
    } else {
      setChartColor(theme.profitGreen);
    }
    const temp = arr.map((item: Array<any>, index: number) => {
      return {timestamp: item[0], value: item[1]};
    });
    setMarketHistoryData(temp);
    setLoading(false);
  };
  if (loading) {
    return <ChartLoader />;
  }
  if (!marketHistoryData?.length) {
    return (
      <View
        style={{
          height: screenHeight / 3,
          width: '100%',
          backgroundColor: theme.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SemiBold1214>Failed to fetch the Data!</SemiBold1214>
      </View>
    );
  }

  return (
    <LineChart.Provider data={marketHistoryData}>
      <View
        style={{
          height: 40,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 16,
          justifyContent: 'center',
        }}>
        <LineChart.PriceText
          style={{
            color: theme.textColor1,
            fontSize: 16,
            fontWeight: 'bold',
          }}
          format={d => {
            'worklet';
            return d.formatted ? `${currencySymbol}${d.formatted}` : '';
          }}
        />
      </View>
      <LineChart width={screenWidth} height={screenHeight / 3}>
        <LineChart.Path
          color={chartColor}
          // color={
          //   marketHistoryData[marketHistoryData.length - 1]?.value <
          //   marketHistoryData[0]?.value
          //     ? theme.lossRed
          //     : theme.profitGreen
          // }
          mountAnimationDuration={800}
          animateOnMount="foreground">
          <LineChart.HorizontalLine at={{index: 0}} />
          <LineChart.HorizontalLine
            at={{index: marketHistoryData.length - 1}}
          />
          <LineChart.Gradient color={chartColor} />
        </LineChart.Path>
        <LineChart.CursorCrosshair color={chartColor}>
          {/* <LineChart.Tooltip
            cursorGutter={60}
            textStyle={{color: theme.textColor1}}
          /> */}
          <LineChart.Tooltip position="bottom">
            <LineChart.DatetimeText style={{color: theme.textColor1}} />
          </LineChart.Tooltip>
        </LineChart.CursorCrosshair>
      </LineChart>
    </LineChart.Provider>
  );
};

export default PriceHistoryLineChart;

const styles = StyleSheet.create({});
