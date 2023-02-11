import {StyleSheet} from 'react-native';
import {screenHeight} from '../../utils/constants';

const styles = StyleSheet.create({
  profileContainer: {
    height: '100%',
    paddingHorizontal: 20,
  },
  logoutButton: {
    width: '100%',
  },
  userDeatails: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 20,
  },
  userDeatailsTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  userDeatailsText: {fontWeight: 'bold'},
  emailText: {marginVertical: 12, textDecorationLine: 'underline'},
  userProfileImage: {
    width: screenHeight / 10,
    height: screenHeight / 10,
    borderRadius: 60,
  },
  switchContainer: {
    height: screenHeight / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  optionsContainerMain: {
    marginTop: 30,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  userProfileimageContainer: {
    width: screenHeight / 9,
    height: screenHeight / 9,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTitlesIconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleStyle: {marginLeft: 16},
  thumbButton: {
    width: 40,
    height: 40,
    radius: 30,
  },
});
export default styles;
