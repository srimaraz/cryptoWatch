import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import ThemeContext from '../../../config/themeContext';
import {screenHeight} from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  newsTitleView: {
    flex: 1,
    paddingLeft: 12,
  },
  dateTimeText: {
    fontSize: 8,
    fontWeight: '500',
    color: 'black',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  newsImage: {width: 60, height: 60, borderRadius: 30},
  coinsCardImage: {
    width: screenHeight / 25,
    height: screenHeight / 25,
    borderRadius: 20,
  },
  tagsListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.75,
  },
});
export default styles;
