import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const tabConfig = [
  {title: '1H', value: '1h', interval: ''},
  {title: '1D', value: '1', interval: ''},
  {title: '1W', value: '7', interval: ''},
  {title: '1M', value: '30', interval: 'daily'},
  {title: '3M', value: '90', interval: 'daily'},
  {title: '1Y', value: '365', interval: 'daily'},
  {title: 'MAX', value: 'max', interval: 'daily'},
];

export const chartConfigMain = [
  {title: 'price', value: 'prices', defaultRange: '1h', isOHLC: false},
  {title: 'mCap', value: 'market_caps', defaultRange: '1h', isOHLC: false},
  {title: 'volume', value: 'total_volumes', defaultRange: '1h', isOHLC: false},
  {title: 'candle', value: '', defaultRange: '1', isOHLC: true},
];

export const currencies = {
  inr: {
    name: 'Indian Rupees',
    currency: 'inr',
    symbol: '₹',
  },
  usd: {
    name: 'U.S Dollar',
    currency: 'usd',
    symbol: '$',
  },
};
export const randomColors = [
  'yellow',
  '#74ee15',
  'cyan',
  '#ff34e2',
  'red',
  '#05ffa1',
  '#ffc0eb',
  '#D35400',
  '#21618C',
  '#5D6D7E',
  '#ff34e2',
  '#74ee15',
  'black',
  'white',
  'yellow',
];
export {screenWidth, screenHeight};
