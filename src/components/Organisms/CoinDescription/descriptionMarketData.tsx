import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import {formatNumber} from '../../../utils/formatNumber';
import styles from './styles';
import ThemeContext from '../../../../config/themeContext';
import {
  Bold1214,
  Bold1820,
  Regular1214,
  SemiBold1416,
  SemiBold1618,
} from '../../Atoms/Text';
import SizedBox from '../../Atoms/sizedBox';
import COLOR_PALETTE from '../../../../config/themes';
import UserSettingsContext from '../../../../config/userSettingsContext';

interface DescriptionMarketDataSectionProps {
  descriptionData: any;
}
interface ChangePercentageProp {
  title: string;
  key: string;
  extraKey?: string | undefined;
}
const DescriptionMarketDataSection = (
  props: DescriptionMarketDataSectionProps,
) => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];
  const {descriptionData} = props;
  const {
    currencyInfo: {currency, symbol},
  } = useContext(UserSettingsContext);
  const width =
    (100 * descriptionData.market_data?.circulating_supply || 0) /
    descriptionData.market_data.total_supply;
  const width2 =
    (100 * descriptionData.market_data.current_price[currency] -
      descriptionData.market_data.atl[currency] || 0) /
    (descriptionData.market_data.ath[currency] -
      descriptionData.market_data.atl[currency]);

  const changePercentageMap: Array<ChangePercentageProp> = [
    {title: '24H', key: 'price_change_percentage_24h'},
    {title: '7D', key: 'price_change_percentage_7d'},
    {title: '1M', key: 'price_change_percentage_30d'},
    {title: 'ATL', key: 'atl_change_percentage', extraKey: currency},
    {title: 'ATH', key: 'ath_change_percentage', extraKey: currency},
  ];

  const renderChangePercentage = (item: ChangePercentageProp): JSX.Element => {
    const data = item.extraKey
      ? descriptionData.market_data[item.key][item.extraKey]
      : descriptionData.market_data[item.key];
    const textColor = data > 0 ? theme.profitGreen : theme.lossRed;
    const bgColor = data > 0 ? theme.profitGreenBlur : theme.lossRedBlur;
    return (
      <View
        key={item.key}
        style={[
          styles.chnageFromAthAtlContainer,
          {
            backgroundColor: bgColor,
            borderColor: textColor,
          },
        ]}>
        <Bold1214 color={textColor}>
          {`${item.title} | ` + ((formatNumber(data) ?? 'N/A') + '%')}
        </Bold1214>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.linksMainContainer,
        {
          marginTop: 0,
          backgroundColor: theme.backgroundColor,
        },
      ]}>
      <Bold1820 textStyle={{textTransform: 'capitalize', marginVertical: 8}}>
        {descriptionData.id + ' Market Data'}
      </Bold1820>
      <View
        style={[
          {
            backgroundColor: theme.readableBackgroundColor,
          },
          styles.linksDivider,
        ]}
      />
      <View style={styles.coinBasicInfoContainer1}>
        <View>
          <Regular1214>Symbol</Regular1214>
          <SizedBox height={6} />
          <SemiBold1618 color={theme.primaryPurple}>
            {(descriptionData.symbol ?? 'N/A').toUpperCase()}
          </SemiBold1618>
        </View>
        <View style={{alignItems: 'center'}}>
          <Regular1214>Market Cap</Regular1214>
          <SizedBox height={6} />
          <SemiBold1618 color={theme.primaryPurple}>
            {`${symbol}${formatNumber(
              descriptionData.market_data.market_cap[currency],
            )}`}
          </SemiBold1618>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Regular1214>Rank</Regular1214>
          <SizedBox height={6} />
          <SemiBold1618 color={theme.primaryPurple}>
            {'#' + descriptionData.market_data.market_cap_rank ?? 'N/A'}
          </SemiBold1618>
        </View>
      </View>
      <SizedBox height={16} />
      <View style={styles.textSpaceBetween}>
        <Regular1214>Circulating Supply</Regular1214>
        <Regular1214>Total Supply</Regular1214>
      </View>
      <View
        style={[
          styles.staticProgressBar,
          {backgroundColor: theme.primaryPurpleWithOpacity},
        ]}>
        <View
          style={{
            height: 10,
            width: `${width}%`,
            backgroundColor: theme.primaryPurple,
            borderRadius: 12,
          }}
        />
      </View>
      <View style={styles.textSpaceBetween}>
        <SemiBold1416 color={theme.primaryPurple}>
          {formatNumber(descriptionData.market_data.circulating_supply)}
        </SemiBold1416>
        <SemiBold1416 color={theme.primaryPurple}>
          {formatNumber(descriptionData.market_data.total_supply)}
        </SemiBold1416>
      </View>
      {/* ath atl comparison */}
      <SizedBox height={16} />
      <View style={styles.textSpaceBetween}>
        <Regular1214>All Time Low</Regular1214>
        <Regular1214>All Time High</Regular1214>
      </View>
      <View
        style={[
          styles.staticProgressBar,
          {backgroundColor: theme.primaryPurpleWithOpacity},
        ]}>
        <View
          style={[
            styles.positionRing,
            {
              left: `${width2}%`,
              backgroundColor: theme.primaryPurple,
            },
          ]}>
          <View
            style={[
              styles.positionRingInner,
              {
                backgroundColor: theme.backgroundColor,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.textSpaceBetween}>
        <SemiBold1416 color={theme.primaryPurple}>
          {`${symbol}${formatNumber(
            descriptionData.market_data.atl[currency],
          )}`}
        </SemiBold1416>
        <SemiBold1416 color={theme.primaryPurple}>
          {`${symbol}${formatNumber(
            descriptionData.market_data.ath[currency],
          )}`}
        </SemiBold1416>
      </View>
      <SizedBox height={16} />
      <Regular1214>Change Percentages</Regular1214>
      <SizedBox height={8} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {changePercentageMap.map((item: ChangePercentageProp): any =>
          renderChangePercentage(item),
        )}
      </View>
      <View style={styles.marketDatacard}>
        <Text style={{color: theme.textColor1}}>Fully Diluted Valuation</Text>
        <SemiBold1416>
          {formatNumber(
            descriptionData.market_data.fully_diluted_valuation[currency],
          )}
        </SemiBold1416>
      </View>
      <View style={styles.marketDatacard}>
        <Text style={{color: theme.textColor1}}>Max Supply</Text>
        <Text style={{color: theme.textColor1}}>
          {formatNumber(descriptionData.market_data.max_supply)}
        </Text>
      </View>
    </View>
  );
};

export default DescriptionMarketDataSection;
