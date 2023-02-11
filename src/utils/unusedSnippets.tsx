// export const testApi = () => {
//   fetch('https://api.swapzone.io/v1/exchange/currencies', {
//     method: 'GET', // or 'PUT'
//     headers: {
//       //'Content-Type': 'application/json',
//       'x-api-key': '1oZLSsD_J',
//     },
//   })
//     .then(res => res.json())
//     .then(res => {
//       //setCoinList(res);

//       //`https://api.swapzone.io/v1/exchange/get-rate?from=${item.ticker}&to=usdt&amount=1&rateType=all&availableInUSA=false&chooseRate=best&noRefundAddress=false`,

//       let a = [];

//       //setCoinList(a);
//     })
//     .catch(err => {
//       //setLoading(false);
//     });
// };

// const testApi = () => {
//   fetch('https://api.swapzone.io/v1/exchange/currencies', {
//     method: 'GET', // or 'PUT'
//     headers: {
//       //'Content-Type': 'application/json',
//       'x-api-key': '1oZLSsD_J',
//     },
//   })
//     .then(res => res.json())
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {});
// };
// testApi();

//addCoinScree: index

// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Modal,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import DatePicker from 'react-native-date-picker';
// import dayjs from 'dayjs';
// import AuthContext from '../../../config/authContext';
// import AddCoinModal from './coinsListModal';
// import {screenHeight} from '../../utils/constants';

// const AddCoinScreen = ({navigation}) => {
//   const {uid} = useContext(AuthContext);
//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [showCoinsListModal, setShowCoinsListModal] = useState(false);
//   const intiatlCoinsState = {
//     coinName: null,
//     coinSymbol: null,
//     coingeckoCoinId: null,
//     coinLogo: null,
//   };
//   const [selectedCoin, setSelectedCoin] = useState(intiatlCoinsState);

//   const [userInputs, setUserInputs] = useState({
//     amount: 0,
//     price: null,
//   });
//   const handleTextInput = (text, identifier) => {
//     userInputs[identifier] = text;
//     setUserInputs(userInputs);
//   };

//   const setUserData = async payload => {
//     try {
//       firestore()
//         .collection('usersInfo')
//         .doc(`${uid}`)
//         .set({portfolioData: payload})
//         .then(() => {
//           navigation.navigate('PortfolioScreen', {payload});
//         });
//     } catch (e) {
//       console.log('error', e);
//     } finally {
//       setSelectedCoin(intiatlCoinsState);
//       setUserInputs({amount: 0, price: null});
//     }
//   };
//   const handleSubmit = async () => {
//     const temp = Object.values(userInputs);
//     if (temp.includes(null) || temp.includes('') || !selectedCoin.coinName) {
//       Alert.alert('Invalid Input');
//       return;
//     }

//     const portfolioDataResponse = await firestore()
//       .collection(`usersInfo`)
//       .doc(`${uid}`)
//       .get();
//     const portfolioData = portfolioDataResponse.data().portfolioData || {};

//     const currentTransactionData = {
//       ...userInputs,
//       transactionId: Math.floor(Date.now() + Math.random() * 1000),
//       date: date,
//     };
//     let payload = {};
//     if (portfolioData.hasOwnProperty(selectedCoin.coinName)) {
//       payload = {...portfolioData[selectedCoin.coinName]};
//       payload.avgBuyPrice =
//         (payload.amount * payload.avgBuyPrice +
//           userInputs.amount * userInputs.price) /
//         (payload.amount + userInputs.amount);
//       payload.amount += userInputs.amount;
//       payload.transactions.push(currentTransactionData);
//     } else {
//       payload = {...selectedCoin};
//       payload.avgBuyPrice = userInputs.price;
//       payload.amount = userInputs.amount;
//       payload.transactions = [currentTransactionData];
//     }
//     portfolioData[selectedCoin.coinName] = payload;
//     setUserData(portfolioData);
//   };
//   const handleSelectCoin = (
//     coinName,
//     coinSymbol,
//     coingeckoCoinId,
//     coinLogo,
//   ) => {
//     setSelectedCoin({
//       coinName,
//       coinSymbol,
//       coingeckoCoinId,
//       coinLogo,
//     });
//     setShowCoinsListModal(false);
//   };

//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent
//         visible={showCoinsListModal}
//         onRequestClose={() => {
//           setShowCoinsListModal(!showCoinsListModal);
//         }}>
//         <View style={styles.modalView}>
//           <AddCoinModal handleSelectCoin={handleSelectCoin} />
//         </View>
//       </Modal>

//       <Text>Add Token to portfolio</Text>

//       <TouchableOpacity
//         onPress={() => setShowCoinsListModal(true)}
//         style={styles.formField}>
//         <TextInput
//           value={selectedCoin.coinName}
//           onChangeText={text => {
//             handleTextInput(text, 'coinName');
//           }}
//           editable={false}
//         />
//       </TouchableOpacity>
//       <Text>Amount</Text>
//       <TextInput
//         value={userInputs.amount}
//         keyboardType="number-pad"
//         onChangeText={text => {
//           handleTextInput(Number(text), 'amount');
//         }}
//         style={styles.formField}
//       />
//       <Text>price</Text>
//       <TextInput
//         value={userInputs.price}
//         keyboardType="number-pad"
//         onChangeText={text => {
//           handleTextInput(Number(text), 'price');
//         }}
//         style={styles.formField}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}>
//         <Text>{dayjs(date).format('ddd, DD MMM YYYY')}</Text>
//         <Text>{dayjs(date).format('hh:mm A')}</Text>

//         <TouchableOpacity
//           style={{backgroundColor: 'green', padding: 20, marginTop: 10}}
//           onPress={() => setShowCoinsListModal(true)}>
//           <Text>Chnage Date</Text>
//         </TouchableOpacity>
//         <DatePicker
//           modal
//           open={open}
//           date={date}
//           onConfirm={date => {
//             setOpen(false);
//             setDate(date);
//           }}
//           onCancel={() => {
//             setOpen(false);
//           }}
//         />
//       </View>

//       <TouchableOpacity
//         style={{backgroundColor: 'green', padding: 20, marginTop: 10}}
//         onPress={handleSubmit}>
//         <Text>Submit+++</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   formField: {
//     borderWidth: 2,
//     marginHorizontal: 20,
//     height: 40,
//     marginTop: 10,
//     width: '100%',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'red',
//   },
//   modalView: {
//     // marginVertical: 150,
//     // marginHorizontal: 20,
//     marginTop: screenHeight / 4,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default AddCoinScreen;

//DescriptionAboutToken

// import {Alert, BackHandler, Linking, Text, View} from 'react-native';
// import React, {useContext, useEffect, useRef, useState} from 'react';
// import WebView from 'react-native-webview';
// import ThemeContext from '../../../../config/themeContext';
// import {Bold1820} from '../../Atoms/Text';
// import COLOR_PALETTE from '../../../../config/themes';

// interface DescriptionAboutTokenProps {
//   descriptionHTML: string;
// }
// const DescriptionAboutToken = (props: DescriptionAboutTokenProps) => {
//   const {descriptionHTML} = props;
//   const WEBVIEW_REF = useRef<WebView>(null);
//   const colorMode = useContext(ThemeContext);
//   const theme = COLOR_PALETTE[colorMode];

//   return (
//     <View
//       style={{
//         marginTop: 20,
//         marginHorizontal: 10,
//         padding: 10,
//         elevation: 10,
//         borderRadius: 10,
//         backgroundColor: theme.backgroundColor,
//       }}>
//       <Bold1820 textStyle={{marginVertical: 8}} color={theme.primaryPurple}>
//         {'About Token'}
//       </Bold1820>
//       <View
//         style={{
//           width: '100%',
//           height: 3,
//           backgroundColor: theme.readableBackgroundColor,
//           marginTop: 6,
//           marginBottom: 18,
//         }}
//       />
//       <View style={{height: 600}}>
//         <WebView
//           startInLoadingState
//           renderLoading={() => (
//             <View style={{flex: 1, alignItems: 'center'}}>
//               <Text>Loading...</Text>
//             </View>
//           )}
//           onShouldStartLoadWithRequest={(request: any) => {
//             if (request.url !== 'about:blank') {
//               Linking.openURL(request.url);
//               return false;
//             } else {
//               return true;
//             }
//           }}
//           allowsBackForwardNavigationGestures
//           originWhitelist={['*']}
//           ref={WEBVIEW_REF}
//           source={{
//             html: `<body style="background-color:${theme.backgroundColor}"><p style="font-size:28px; text-indent: 90; color:${theme.textColor1};font-weight:500; white-space: pre-wrap;">${descriptionHTML}</p><body>`,
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default DescriptionAboutToken;
