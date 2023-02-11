import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import ToggleButton from 'react-native-toggle-element';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemeContext from '../../../config/themeContext';
import COLOR_PALETTE from '../../../config/themes';
import theme from '../../../config/themes';
import SizedBox from '../../components/Atoms/sizedBox';
import {Bold1820, Bold2428, SemiBold1012} from '../../components/Atoms/Text';
import CoinDescription from '../../components/Organisms/CoinDescription';
import PriceHistoryCandleSticks from '../../components/PriceHistoryCandleStick';
import PriceHistoryLineChart from '../../components/PriceHistoryLineChart';
import {tabConfig} from '../../utils/constants';

const CoinChartScreen = ({route, navigation}) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {tokenId, name, symbol} = route.params;
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedMainTabIndex, setSelectedMainTabIndex] = useState<number>(0);

  const chartConfigMain = [
    {
      title: <SemiBold1012>price</SemiBold1012>,
      value: 'prices',
      defaultRange: '1h',
      isOHLC: false,
    },
    {
      title: <SemiBold1012>mCap</SemiBold1012>,
      value: 'market_caps',
      defaultRange: '1h',
      isOHLC: false,
    },
    {
      title: <SemiBold1012>volume</SemiBold1012>,
      value: 'total_volumes',
      defaultRange: '1h',
      isOHLC: false,
    },
    {
      title: (
        <Image
          source={require('../../assets/Images/candleStickLow.png')}
          style={{height: 24, width: 40}}
          resizeMode="stretch"
        />
      ),
      value: '',
      defaultRange: '1',
      isOHLC: true,
    },
  ];
  return (
    <SafeAreaView style={{backgroundColor: theme.backgroundColor, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: 12,
          marginVertical: 10,
          marginTop: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="ios-chevron-back"
            size={28}
            color={theme.primaryPurple}
          />
        </TouchableOpacity>
        <Bold2428
          textStyle={{}}
          color={
            theme.primaryPurple
          }>{`${name} (${symbol?.toUpperCase()})`}</Bold2428>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginVertical: 6,
          }}>
          {chartConfigMain.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.isOHLC) {
                  setSelectedTabIndex(1);
                }
                setSelectedMainTabIndex(index);
              }}
              style={[
                {
                  height: 25,
                  width: 60,
                  margin: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  backgroundColor: theme.readableBackgroundColor,
                },
                index === selectedMainTabIndex
                  ? {
                      borderWidth: 2,
                      borderColor: theme.primaryPurple,
                      backgroundColor: theme.primaryPurpleMaxBlur,
                    }
                  : {},
              ]}>
              {item.title}
            </TouchableOpacity>
          ))}
        </View>
        {selectedMainTabIndex === 3 ? (
          <PriceHistoryCandleSticks
            selectedTabIndex={selectedTabIndex}
            //selctedMainTabIndex={chartConfigMain[selectedMainTabIndex]?.value}
            tabConfig={tabConfig}
            tokenId={tokenId}
          />
        ) : (
          <PriceHistoryLineChart
            selectedTabIndex={selectedTabIndex}
            selctedMainTabValue={
              chartConfigMain[selectedMainTabIndex]?.value ?? 'price'
            }
            tabConfig={tabConfig}
            tokenId={tokenId}
          />
        )}
        <View
          style={{
            height: 40,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: theme.backgroundColor,
          }}>
          {tabConfig.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                height: '100%',
                paddingHorizontal: 10,
                borderColor: theme.primaryPurple,
                borderBottomWidth: index == selectedTabIndex ? 3 : 0,
                // backgroundColor:
                //   index == selectedTabIndex
                //     ? theme.primaryPurple
                //     : theme.readableBackgroundColor,
              }}
              onPress={() => {
                setSelectedTabIndex(index);
              }}>
              <Text
                style={{
                  fontWeight: index === selectedTabIndex ? '700' : '400',
                  color:
                    index === selectedTabIndex
                      ? theme.primaryPurple
                      : theme.textColor1,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <CoinDescription tokenId={tokenId} />
    </SafeAreaView>
  );
};

export default CoinChartScreen;
