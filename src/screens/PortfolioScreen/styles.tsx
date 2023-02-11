import {StyleSheet} from 'react-native';
import {screenHeight} from '../../utils/constants';
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: screenHeight,
  },
  totalValueText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
  },
  totalValueTextSmall: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  pnlContainer: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  coinsCardImage: {width: 60, height: 60, borderRadius: 40},
  modalView: {
    // marginVertical: 150,
    // marginHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // marginTop: screenHeight / 4,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  portfolioCard: {
    height: 80,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingVertical: 10,
  },
});
export default styles;
