/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  LogBox,
  Dimensions,
  Image,
  Modal,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import AuthContext from '../../../config/authContext';
import ThemeContext from '../../../config/themeContext';
import {formatNumber} from '../../utils/formatNumber';
import AddCoinModal from '../AddCoinScreen/addCoinModal';
import {
  Bold1416,
  Bold1618,
  Bold1820,
  Bold2024,
  Bold2830,
  Regular1214,
  Regular1618,
  SemiBold1214,
  SemiBold1416,
  SemiBold1820,
} from '../../components/Atoms/Text';
import {randomColors, screenHeight} from '../../utils/constants';
import SizedBox from '../../components/Atoms/sizedBox';
import COLOR_PALETTE from '../../../config/themes';
import TransactionsDetails from './transactionsDetails';
import Lottie from 'lottie-react-native';
import PortfolioBottomSkeletonLoader from '../../components/Atoms/SkeletonLoaders/portfolioSkeletonLoader';
import FilledButton from '../../components/Atoms/Buttons/filledButton';
import UserSettingsContext from '../../../config/userSettingsContext';
import CustomModal from '../../components/Molecules/CustomModal';
import ErrorMessage from '../../components/Atoms/ErrorComponents/errorMessage';

interface Iprops {
  route: any;
  navigation: any;
}

const PortfolioScreen = (props: Iprops) => {
  const colorMode = useContext(ThemeContext);
  const {currencyInfo} = useContext(UserSettingsContext);
  const {currency: curr, symbol: currSymbol} = currencyInfo;
  const theme = COLOR_PALETTE[colorMode];
  const {route, navigation} = props;
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const {uid} = useContext(AuthContext);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);
  const [clickedAsset, setClickedAsset] = useState({});
  const [totalPortfolioValueData, setTotalPortfolioValueData] = useState({
    investedValue: 0,
    currentValue: 0,
    pnlPercentage: 0,
  });
  const [pieData, setPieData] = useState([]);
  const [portfolioData, setPortfolioData] = useState<Array<Object>>([]);
  const [showModal, setShowModal] = useState(false);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const isFocused: boolean = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setLoading(true);
    firestore()
      .collection('usersInfo')
      .doc(`${uid}`)
      .get()
      .then((querySnapshot: any) => {
        let data = querySnapshot.data()?.portfolioData || {};
        formatPortfolioResponse(data);
      })
      .catch(error => {
        console.log('getUsersData error', error);
        setFailed(true);
        setLoading(false);
      });
  }, [isFocused]);

  const formatPortfolioResponse = async (data: Object) => {
    let formattedRes: Array<any> = [];
    let coingeckoCoinIds: Array<any> = [];
    Object.keys(data).forEach((key: string) => {
      if (key === 'carryPNL') {
        return;
      }
      formattedRes.push({coinName: key, ...data[key]});
      coingeckoCoinIds.push(data[key].coingeckoCoinId);
    });
    if (!coingeckoCoinIds?.length) {
      setLoading(false);
      return;
    }
    if (!coingeckoCoinIds.includes('tether')) {
      coingeckoCoinIds.push('tether');
    }

    try {
      let res: any = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoCoinIds.join(
          '%2C',
        )}&vs_currencies=inr%2Cusd`,
      );
      res = await res.json();

      let totalInvestMents: number = 0;
      let totalCurrent: number = 0;
      const mappedData = formattedRes
        .map(item => {
          const {amount, avgBuyPrice, coingeckoCoinId} = item;
          let investedValue = amount * avgBuyPrice * res.tether[curr];
          let currentValue = amount * res[coingeckoCoinId][curr];
          let pnl = currentValue - investedValue;
          let pnlPercent = (pnl * 100) / investedValue;
          totalInvestMents += investedValue;
          totalCurrent += currentValue;

          return {
            ...item,
            currentValue,
            investedValue,
            pnl,
            pnlPercent,
          };
        })
        .sort((a, b) => b.currentValue - a.currentValue);

      const pieTemp = mappedData.map((item): any => {
        return {
          y: (item.currentValue / totalCurrent) * 100,
          x: item.coinSymbol.toUpperCase(),
          z: item.coinLogo,
        };
      });
      setPieData(pieTemp);
      setTotalPortfolioValueData({
        currentValue: totalCurrent,
        investedValue: totalInvestMents,
        pnlPercentage:
          ((totalCurrent - totalInvestMents) * 100) / totalInvestMents,
      });
      setPortfolioData(mappedData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setFailed(true);
      console.log(e);
    }
  };
  const onCloseModal = (payload: any) => {
    if (payload) {
      formatPortfolioResponse(payload);
    }
    setShowModal(false);
  };
  const handleAddTransactionInmodal = () => {
    setShowTransactionsModal(false);
    setShowModal(true);
  };
  const renderCard = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setClickedAsset(item);
          setShowTransactionsModal(true);
        }}
        style={[
          styles.portfolioCard,
          {backgroundColor: theme.readableBackgroundColor},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: item.coinLogo}}
            style={{
              height: 40,
              width: 40,
              marginRight: 20,
              borderRadius: 20,
            }}
          />

          <View style={{flexDirection: 'column'}}>
            <Bold1416>{`${item.coinName}`}</Bold1416>
            <SizedBox height={12} />
            <Regular1214>
              {`${item.amount} ${item.coinSymbol?.toUpperCase()}s`}
            </Regular1214>
          </View>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.totalValueTextSmall, {color: theme.textColor1}]}>
            {currSymbol} {`${item.currentValue.toFixed(2)}`}
          </Text>
          <SizedBox height={10} />
          <Text
            style={[
              styles.totalValueTextSmall,
              {color: item.pnl >= 0 ? 'green' : 'red'},
            ]}>
            <Icon name={item.pnl >= 0 ? 'caret-up' : 'caret-down'} />
            {` ${formatNumber(Math.abs(item.pnl))}  (${item.pnlPercent.toFixed(
              1,
            )}%)`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderPortfolioTopSection = () => {
    return (
      <View style={{height: screenHeight / 3}}>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View>
            <SemiBold1416 color="white" textStyle={{opacity: 0.5}}>
              Total Asset Value
            </SemiBold1416>
            <SizedBox height={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Bold2830 color="white">
                {`${currSymbol}${formatNumber(
                  totalPortfolioValueData.currentValue,
                )}`}
              </Bold2830>
              <View
                style={[
                  {
                    backgroundColor:
                      totalPortfolioValueData.pnlPercentage > 0
                        ? theme.profitGreen
                        : theme.lossRed,
                  },
                  styles.pnlContainer,
                ]}>
                <Icon
                  name={
                    totalPortfolioValueData.pnlPercentage > 0
                      ? 'caret-up'
                      : 'caret-down'
                  }
                  color={'white'}
                  size={14}
                />
                <Bold1618 color="white">
                  {`${formatNumber(
                    Math.abs(totalPortfolioValueData.pnlPercentage),
                  )}%`}
                </Bold1618>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <SemiBold1416 color="white" textStyle={{opacity: 0.5}}>
              Total Investments
            </SemiBold1416>
            <SizedBox height={6} />
            <Bold1820 color="white">
              {`${currSymbol}${formatNumber(
                totalPortfolioValueData.investedValue,
              )}`}
            </Bold1820>

            {/* <View style={{alignItems: 'flex-end'}}>
            <Bold1820 color="white" textStyle={{opacity: 1}}>
              {`${formatNumber(
                totalPortfolioValueData.currentValue -
                  totalPortfolioValueData.investedValue,
              )}`}
            </Bold1820>
          </View> */}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <SemiBold1416 color="white" textStyle={{opacity: 0.5}}>
            Asset Distribution
          </SemiBold1416>
          <View
            style={{
              marginTop: 8,
              width: '100%',
              height: 30,
              flexDirection: 'row',
              overflow: 'hidden',
            }}>
            {pieData.map((item, index) => {
              return (
                <View
                  key={item.x}
                  style={{
                    flexGrow: item.y,
                    backgroundColor: randomColors[index],
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignItems: 'center',
                    marginHorizontal: 1,
                  }}>
                  <Image
                    source={{uri: item.z}}
                    style={{height: 20, width: 20}}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };
  const renderLoadingPortfolioTopSections = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Lottie
        source={require('../../assets/LottieAnimations/portfolioLoadingLottie.json')}
        autoPlay
        loop
        style={{height: 150, width: 150}}
      />
      <SemiBold1820 color="white">
        Hold on! Might take a second or two!
      </SemiBold1820>
      <SizedBox height={10} />
    </View>
  );
  const renderEmptyPortfolioTopSections = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Lottie
        source={require('../../assets/LottieAnimations/portfolioEmpty.json')}
        autoPlay
        loop
        style={{height: 150, width: 150}}
      />
      <SemiBold1820 color="white">It's empty in here!</SemiBold1820>
      <SizedBox height={10} />
    </View>
  );
  const renderFailedPortfolioBottomSection = () => (
    <View style={{flex: 1}}>
      <ErrorMessage />
    </View>
  );
  const renderEmptyPortfolioBottomSection = () => (
    <View
      style={{
        height: screenHeight * 0.65,
        width: '100%',
        backgroundColor: theme.backgroundColor,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingBottom: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          top: 180,
        }}>
        <SemiBold1820>Create your portfolio</SemiBold1820>
        <SizedBox height={12} />
        <Regular1618>
          Keep track of all your cryot assets in one place
        </Regular1618>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          width: '100%',
          // position: 'absolute',
          // bottom: 130,
        }}>
        <FilledButton
          text="Add Asset"
          onPress={() => {
            setShowModal(true);
          }}
        />
      </View>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      {/* {isFocused && <StatusBar backgroundColor={'pink'} />} */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#6441a5', '#8241B8']}
        style={[
          styles.mainContainer,
          {backgroundColor: theme.backgroundColor},
        ]}>
        {/* <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}>
          <KeyboardAvoidingView
            style={[
              styles.modalView,
              {
                backgroundColor: theme.backgroundColor,
                shadowColor: theme.textColor1,
              },
            ]}>
            <AddCoinModal onCloseModal={onCloseModal} />
          </KeyboardAvoidingView>
        </Modal> */}
        <CustomModal
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}
          component={
            <KeyboardAvoidingView
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.backgroundColor,
                  shadowColor: theme.textColor1,
                },
              ]}>
              <AddCoinModal onCloseModal={onCloseModal} />
            </KeyboardAvoidingView>
          }
        />
        <CustomModal
          visible={showTransactionsModal}
          onRequestClose={() => {
            setShowTransactionsModal(!showTransactionsModal);
          }}
          component={
            <KeyboardAvoidingView
              style={[
                styles.modalView,
                {
                  backgroundColor: theme.backgroundColor,
                  shadowColor: theme.textColor1,
                },
              ]}>
              <TransactionsDetails
                selectedAsset={clickedAsset}
                handleAddTransactionInmodal={handleAddTransactionInmodal}
              />
            </KeyboardAvoidingView>
          }
        />
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            height: screenHeight / 3.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="wallet-outline"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
              <Bold2024 color="white">My PortFolio</Bold2024>
            </View>
            <TouchableOpacity
              disabled={loading}
              style={{
                height: 30,
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setShowModal(true);
              }}>
              <SemiBold1214 color={theme.primaryPurple}>
                + Add Asset
              </SemiBold1214>
              {/* <Icon name="add-circle" size={30} color="white" /> */}
            </TouchableOpacity>
          </View>
          {loading
            ? renderLoadingPortfolioTopSections()
            : failed || !portfolioData?.length
            ? renderEmptyPortfolioTopSections()
            : renderPortfolioTopSection()}
        </View>
        {loading ? (
          <PortfolioBottomSkeletonLoader />
        ) : failed ? (
          renderFailedPortfolioBottomSection()
        ) : !portfolioData?.length ? (
          renderEmptyPortfolioBottomSection()
        ) : (
          <FlatList
            style={{
              backgroundColor: theme.backgroundColor,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingHorizontal: 20,
              paddingTop: 30,
            }}
            ListHeaderComponent={
              <Bold1820 textStyle={{marginBottom: 16, marginLeft: 10}}>
                My Assets
              </Bold1820>
            }
            ListFooterComponent={
              <View
                style={{
                  height: 140,
                  width: '100%',
                  backgroundColor: theme.backgroundColor,
                }}
              />
            }
            keyExtractor={item => item.coinName}
            data={portfolioData}
            renderItem={({item}) => renderCard(item)}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default PortfolioScreen;
