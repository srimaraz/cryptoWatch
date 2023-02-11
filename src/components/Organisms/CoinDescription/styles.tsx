import {StyleSheet} from 'react-native';
import {screenHeight} from '../../../utils/constants';

const styles = StyleSheet.create({
  linksMainContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 12,
    elevation: 2,
    borderRadius: 10,
  },
  marketDatacard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textSpaceBetween: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staticProgressBar: {
    height: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 6,
  },
  positionRing: {
    height: 20,
    width: 20,
    position: 'relative',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionRingInner: {height: 10, width: 10, borderRadius: 12},
  chnageFromAthAtlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
  },
  coinBasicInfoContainer1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    height: screenHeight / 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkHeadingText: {marginLeft: 4, marginVertical: 8},
  linkContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 4,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  linksDivider: {width: '100%', height: 3, marginTop: 6, marginBottom: 18},
  linksMapWrapper: {flexDirection: 'row', flexWrap: 'wrap', width: '100%'},
  linksIconContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  linkTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
