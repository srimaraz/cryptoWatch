import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  leftTitle: {
    marginLeft: 10,
  },
  imageStyle: {
    width: 32,
    height: 32,
    resizeMode: 'center',
    borderRadius: 20,
  },
  coinFullName: {
    fontSize: 14,
    marginBottom: 10,
  },
  coinSymbol: {
    fontSize: 14,
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
  coinPrice: {fontSize: 14, fontWeight: '500', marginRight: 8},
  changeRate: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pnlContainer: {
    width: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
});
export default styles;
