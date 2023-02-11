import {Text, View} from 'react-native';
import React, {ReactElement, useContext} from 'react';
import {screenHeight} from '../../utils/constants';
import {
  Bold1416,
  Bold1820,
  Bold2024,
  Regular1214,
  Regular1416,
  SemiBold1214,
  SemiBold1416,
} from '../../components/Atoms/Text';
import {FlatList} from 'react-native-gesture-handler';
import styles from './styles';
import FilledButton from '../../components/Atoms/Buttons/filledButton';
import {formatNumber} from '../../utils/formatNumber';
import ThemeContext from '../../../config/themeContext';
import COLOR_PALETTE from '../../../config/themes';
import SizedBox from '../../components/Atoms/sizedBox';

interface TransactionInfoType {
  amount: number;
  date: any;
  price: string | number;
  transactionType: string;
  transactionId: number;
}
interface SelectedAssetType {
  amount: number;
  avgBuyPrice: number;
  coinLogo: string;
  coinName: string;
  coinSymbol: string;
  coingeckoCoinId: string;
  currentValue: number;
  investedValue: number;
  pnl: number;
  pnlPercent: number;
  transactions: Array<TransactionInfoType>;
}
interface TransactionDetailsProps {
  selectedAsset: SelectedAssetType;
  handleAddTransactionInmodal: Function;
}
const TransactionsDetails = (props: TransactionDetailsProps) => {
  const {selectedAsset, handleAddTransactionInmodal} = props;
  const {
    amount,
    avgBuyPrice,
    coinLogo,
    coinName,
    coinSymbol,
    currentValue,
    investedValue,
    pnl,
    pnlPercent,
    transactions,
  } = selectedAsset;
  const theme = useContext(ThemeContext);
  const COLOR = COLOR_PALETTE[theme];
  const pnlColor = pnl > 0 ? COLOR.profitGreen : COLOR.lossRed;
  const pnlColorBlur = pnl > 0 ? COLOR.profitGreenBlur : COLOR.lossRedBlur;
  const renderTransactionCard = (
    transactionItem: TransactionInfoType,
  ): ReactElement => {
    const {amount, date, price, transactionType, transactionId} =
      transactionItem;
    return (
      <View
        style={[
          styles.portfolioCard,
          {backgroundColor: COLOR.readableBackgroundColor},
        ]}>
        <View>
          <SemiBold1416>{transactionType}</SemiBold1416>
          <SizedBox height={12} />
          <Regular1214>{date.toDate().toLocaleString('en-US')}</Regular1214>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <SemiBold1416
            color={
              transactionType === 'BUY' ? COLOR.profitGreen : COLOR.lossRed
            }>
            {amount}
          </SemiBold1416>
          <SizedBox height={12} />
          <Regular1416>{formatNumber(price)}</Regular1416>
        </View>
      </View>
    );
  };

  return (
    <View style={{height: screenHeight / 1.5, width: '100%'}}>
      <Bold2024>{`${coinName}`}</Bold2024>
      <SizedBox height={8} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 40,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Regular1214>Asset Value : </Regular1214>
          <SemiBold1416>{formatNumber(currentValue)}</SemiBold1416>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Regular1214>P/L : </Regular1214>
          <SemiBold1416 color={pnlColor}>{formatNumber(pnl)}</SemiBold1416>
          <View
            style={{
              marginLeft: 10,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: pnlColor,
              backgroundColor: pnlColorBlur,
            }}>
            <SemiBold1416 color={pnlColor}>
              {`${formatNumber(pnlPercent)}%`}
            </SemiBold1416>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Regular1214>Invested : </Regular1214>
          <SemiBold1416>{formatNumber(investedValue)}</SemiBold1416>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Regular1214>Avg. Buy Price : </Regular1214>
          <SemiBold1416>{formatNumber(avgBuyPrice)}</SemiBold1416>
        </View>
      </View>
      <SizedBox height={8} />
      <Bold1820
        textStyle={{
          marginVertical: 20,
        }}>{`${coinName} Transaction Details`}</Bold1820>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: TransactionInfoType) => item.transactionId + ''}
        data={transactions}
        renderItem={({item}) => renderTransactionCard(item)}
      />
      <FilledButton
        text={'Add Transaction'}
        onPress={handleAddTransactionInmodal}
      />
    </View>
  );
};

export default TransactionsDetails;
