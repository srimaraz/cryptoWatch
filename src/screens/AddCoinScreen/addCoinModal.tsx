import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Bold1820,
  Regular1214,
  Regular1416,
  SemiBold1214,
  SemiBold1416,
} from '../../components/Atoms/Text';
import ThemeContext from '../../../config/themeContext';
import SizedBox from '../../components/Atoms/sizedBox';
import SupportedCoinsList from './supportedCoinsList';
import RadioButtonBox from '../../components/Atoms/RadioButton/radioButtonBox';
import DatePicker from 'react-native-date-picker';
import ToggleButton from 'react-native-toggle-element';
import dayjs from 'dayjs';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import AuthContext from '../../../config/authContext';
import FilledButton from '../../components/Atoms/Buttons/filledButton';
import {screenHeight} from '../../utils/constants';
import COLOR_PALETTE from '../../../config/themes';
import UserSettingsContext from '../../../config/userSettingsContext';

interface CoinListProps {
  selectedCoinData?: any;
  onCloseModal: Function;
}
interface SelectedCoinType {
  coinName: string;
  coinSymbol: string;
  coingeckoCoinId: string;
  coinLogo: string;
}
const AddCoinModal = (props: CoinListProps) => {
  const {uid} = useContext(AuthContext);
  const colorMode = useContext(ThemeContext);
  const {
    currencyInfo: {currency, symbol},
  } = useContext(UserSettingsContext);
  const theme = COLOR_PALETTE[colorMode];
  const {selectedCoinData, onCloseModal} = props;
  const [priceLoading, setPriceLoading] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState('BUY');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showCoinsList, setShowCoinsList] = useState(false);
  const [addCoinCurrency, setAddCoinCurrency] = useState(currency ?? 'usd');
  const [priceEnetedManually, setPriceEnetedManually] = useState(true);
  const [priceInUSD, setPriceInUSD] = useState(0);

  const intiatlCoinsState = {
    coinName: '',
    coinSymbol: '',
    coingeckoCoinId: '',
    coinLogo: '',
  };
  const [selectedCoin, setSelectedCoin] =
    useState<SelectedCoinType>(intiatlCoinsState);

  const [userInputs, setUserInputs] = useState<any>({
    amount: '',
    price: '',
  });
  const handleTextInput = (
    text: string | number | undefined,
    identifier: string,
  ): void => {
    if (submitError) {
      setSubmitError('');
    }
    const temp = {...userInputs};
    temp[identifier] = text;
    setUserInputs(temp);
  };

  const setUserData = (payload: any) => {
    firestore()
      .collection('usersInfo')
      .doc(`${uid}`)
      .set({portfolioData: payload})
      .then(() => {
        setSubmitInProgress(false);
        onCloseModal(payload);
      })
      .catch(e => {
        console.log('error', e);
        setSubmitInProgress(false);
        setSelectedCoin(intiatlCoinsState);
        setUserInputs({amount: 0, price: null});
        setSubmitError('Something went Wrong!');
      });
  };
  const handleSubmit = async () => {
    const temp = Object.values(userInputs);
    if (
      temp.includes(null) ||
      temp.includes('') ||
      temp.includes(0) ||
      !selectedCoin.coinName
    ) {
      setSubmitError('Invalid Input , Please check all the fields!');
      return;
    }
    setSubmitInProgress(true);
    let priceInUSDTemp = priceInUSD;
    try {
      const portfolioDataResponse: any = await firestore()
        .collection(`usersInfo`)
        .doc(`${uid}`)
        .get();
      //if user has entered inr value manually
      if (priceEnetedManually && addCoinCurrency !== 'usd') {
        const res = await fetch(
          'https://api.exchangerate.host/latest?base=USD',
        );
        const res2 = await res.json();

        priceInUSDTemp =
          userInputs.price / res2?.rates[addCoinCurrency.toUpperCase()];
        setPriceInUSD(priceInUSDTemp);
      } else if (addCoinCurrency === 'usd') {
        priceInUSDTemp = userInputs.price;
      }
      priceInUSDTemp = parseFloat(priceInUSDTemp);
      if (isNaN(priceInUSDTemp)) {
        setSubmitError('Something went wrong!');
        return;
      }
      const portfolioData: any =
        portfolioDataResponse.data()?.portfolioData ?? {};
      const currentTransactionData = {
        ...userInputs,
        price: priceInUSDTemp,
        transactionType,
        transactionId: uuidv4(),
        date: firestore.Timestamp.fromDate(date),
      };
      let payload: any = {};
      if (portfolioData.hasOwnProperty(selectedCoin.coinName)) {
        payload = {...portfolioData[selectedCoin.coinName]};
        const payloadAmountCopy = payload.amount;
        if (transactionType === 'BUY') {
          payload.amount += userInputs.amount;
        } else {
          if (payload.amount >= userInputs.amount) {
            portfolioData.carryPNL =
              //(userInputs.price - payload.avgBuyPrice) * payload.amount;
              (priceInUSDTemp - payload.avgBuyPrice) * payload.amount;
            payload.amount -= userInputs.amount;
          } else {
            setSubmitError('Sell value is higher than your current holding!');
            return;
          }
        }
        payload.avgBuyPrice =
          (payloadAmountCopy * payload.avgBuyPrice +
            //userInputs.amount * userInputs.price) /
            userInputs.amount * priceInUSDTemp) /
          (payloadAmountCopy + userInputs.amount);
        payload.transactions.push(currentTransactionData);
      } else {
        payload = {...selectedCoin};

        //payload.avgBuyPrice = userInputs.price;
        payload.avgBuyPrice = priceInUSDTemp;
        payload.amount = userInputs.amount;
        payload.transactions = [currentTransactionData];
        portfolioData.carryPNL = 0;
      }
      portfolioData[selectedCoin.coinName] = payload;
      setUserData(portfolioData);
    } catch (e) {
      setSubmitInProgress(false);
      setSubmitError('Something went Wrong!');
    }
  };
  const handleCoinNamePress = (
    coinName: string,
    coinSymbol: string,
    coingeckoCoinId: string,
    coinLogo: string,
  ) => {
    setSelectedCoin({
      coinName,
      coinSymbol,
      coingeckoCoinId,
      coinLogo,
    });
    setSubmitError('');
    setErrorMessage('');
    setShowCoinsList(false);
  };

  const handleRadioButtonPress = () => {
    if (transactionType === 'BUY') {
      setTransactionType('SELL');
    } else {
      setTransactionType('BUY');
    }
  };

  const fetchPriceOfCoinForDate = async () => {
    setPriceLoading(true);
    if (!selectedCoin) {
      setErrorMessage('Select Asset First !');
    }
    setPriceEnetedManually(false);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          selectedCoin.coingeckoCoinId
        }/history?date=${dayjs(date).format('DD-MM-YYYY')}&localization=false`,
      );
      const result = await response.json();
      const temp = {...userInputs};
      temp.price =
        result.market_data.current_price?.[addCoinCurrency].toFixed(4) + '';
      const priceInUSDFromApi =
        result.market_data.current_price.usd.toFixed(4) + '';
      setPriceInUSD(priceInUSDFromApi);
      setUserInputs(temp);
    } catch (e) {
      setErrorMessage('Failed, Please enter manually!');
      console.log(e);
    } finally {
      setPriceLoading(false);
    }
  };
  const renderPriceLoadMessage = () => {
    if (priceLoading) {
      return <SemiBold1416 color={theme.profitGreen}>Loading..</SemiBold1416>;
    } else if (errorMessage) {
      return <SemiBold1416 color={theme.lossRed}>{errorMessage}</SemiBold1416>;
    } else {
      return (
        <SemiBold1416 color={theme.primaryPurple}>
          Get the price for the entered date
        </SemiBold1416>
      );
    }
  };
  const renderInputForm = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        {submitError && (
          <>
            <SemiBold1214 color={theme.lossRed}>{submitError}</SemiBold1214>
            <SizedBox height={8} />
          </>
        )}
        <SemiBold1416>Select Asset</SemiBold1416>

        <TouchableOpacity
          style={styles.inputStyle}
          onPress={() => {
            setShowCoinsList(true);
          }}>
          <Regular1416>
            {selectedCoin.coinName
              ? selectedCoin.coinName +
                ` (${selectedCoin.coinSymbol?.toUpperCase()})`
              : 'Click to select'}
          </Regular1416>
          <AntDesign name="right" size={18} color={theme.textColor1} />
        </TouchableOpacity>
        <SizedBox height={10} />
        <SemiBold1416>Transaction Type</SemiBold1416>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 12,
          }}>
          <RadioButtonBox
            title="BUY"
            colorLight={theme.profitGreenBlur}
            colorDark={theme.profitGreen}
            selected={transactionType === 'BUY'}
            onSelect={handleRadioButtonPress}
          />
          <RadioButtonBox
            title="SELL"
            colorLight={theme.lossRedBlur}
            colorDark={theme.lossRed}
            selected={transactionType === 'SELL'}
            onSelect={handleRadioButtonPress}
          />
        </View>
        <SizedBox height={12} />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={{flex: 1, marginRight: 10, alignItems: 'flex-start'}}>
            <SemiBold1416>Currency</SemiBold1416>
            <View
              style={{
                height: 50,
                marginVertical: 12,
                justifyContent: 'center',
              }}>
              <ToggleButton
                value={addCoinCurrency === 'usd'}
                onPress={() => {
                  setAddCoinCurrency(addCoinCurrency === 'usd' ? 'inr' : 'usd');
                }}
                thumbInActiveComponent={
                  <FontAwesome name="rupee" size={18} color={'white'} />
                }
                thumbActiveComponent={
                  <FontAwesome name="dollar" size={18} color={'white'} />
                }
                thumbButton={{
                  width: 40,
                  height: 40,
                  radius: 25,
                }}
                trackBar={{
                  borderWidth: 2,
                  borderActiveColor: theme.primaryPurple,
                  borderInActiveColor: theme.primaryPurple,
                  activeBackgroundColor: theme.primaryPurpleMaxBlur,
                  inActiveBackgroundColor: theme.primaryPurpleMaxBlur,
                  width: 80,
                  height: 40,
                }}
                thumbStyle={{
                  backgroundColor: theme.primaryPurple,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View>
          <View style={{flex: 3}}>
            <SemiBold1416>Date of Transaction</SemiBold1416>
            <TouchableOpacity
              style={styles.inputStyle}
              onPress={() => {
                setShowDatePicker(true);
                //setShowCoinsList(true);
              }}>
              <Regular1416>
                {dayjs(date).format('ddd, DD MMM YYYY')}
              </Regular1416>
            </TouchableOpacity>
          </View>
        </View>
        <SizedBox height={10} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SemiBold1416>Price</SemiBold1416>
          <TouchableOpacity onPress={fetchPriceOfCoinForDate}>
            {renderPriceLoadMessage()}
          </TouchableOpacity>
        </View>
        <TextInput
          value={userInputs.price}
          style={[styles.inputStyle, {color: theme.textColor1}]}
          keyboardType="number-pad"
          onChangeText={text => {
            if (!priceEnetedManually) {
              setPriceEnetedManually(true);
            }
            handleTextInput(text, 'price');
          }}
        />
        <SizedBox height={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SemiBold1416>Amount</SemiBold1416>
          <Regular1214>How many Tokens?</Regular1214>
        </View>
        <TextInput
          style={[styles.inputStyle, {color: theme.textColor1}]}
          keyboardType="number-pad"
          onChangeText={text => {
            handleTextInput(Number(text), 'amount');
          }}
          placeholder={`0 ` + selectedCoin.coinSymbol?.toUpperCase()}
        />
        <View style={{width: '100%'}}>
          <FilledButton
            text={submitInProgress ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            disabled={
              !userInputs.price ||
              !userInputs.amount ||
              !selectedCoin.coinName ||
              submitInProgress
            }
          />
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={[styles.mainContainer, {height: screenHeight / 1.5}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Bold1820>Add Asset</Bold1820>
        <TouchableOpacity onPress={() => onCloseModal(null)}>
          <AntDesign name="closecircle" size={20} color={theme.textColor1} />
        </TouchableOpacity>
      </View>
      <SizedBox height={28} />
      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        mode="date"
        fadeToColor={'none'}
        maximumDate={new Date()}
        androidVariant="iosClone"
        onConfirm={date => {
          setShowDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />

      {showCoinsList ? (
        <SupportedCoinsList handleCoinNamePress={handleCoinNamePress} />
      ) : (
        renderInputForm()
      )}
    </View>
  );
};

export default AddCoinModal;

const styles = StyleSheet.create({
  mainContainer: {width: '100%'},
  inputStyle: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
});
