import React, {useState, useContext} from 'react';
import {View, Image, TouchableOpacity, Linking, ScrollView} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AuthContext from '../../../config/authContext';
import ThemeContext from '../../../config/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToggleButton from 'react-native-toggle-element';
import {CONTACT_MAIL_ID} from '@env';
import COLOR_PALETTE from '../../../config/themes';
import {Bold1820, Regular1416} from '../../components/Atoms/Text';
import SizedBox from '../../components/Atoms/sizedBox';
import HighlightButton from '../../components/Atoms/Buttons/highlightButton';
import UserSettingsContext from '../../../config/userSettingsContext';
import {currencies, screenHeight} from '../../utils/constants';
import CustomModal from '../../components/Molecules/CustomModal';
import TermsAndConditions from '../../publicPages/termsAndConditions';
import Header from '../../components/Atoms/header';
import styles from './styles';

const ProfileScreen = () => {
  const theme: any = useContext(ThemeContext);
  const COLOR = COLOR_PALETTE[theme];
  const {displayName, email, photoURL} = useContext(AuthContext);
  const {currencyInfo} = useContext(UserSettingsContext);
  const [showModal, setShowModal] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(theme === 'dark');
  const [profileCurrencyInfo, setProfileCurrencyInfo] = useState(
    currencyInfo?.currency,
  );

  const handleOpenMail = async () => {
    const mailUrl = `mailto:${CONTACT_MAIL_ID}?subject=CrypoWatch`;
    try {
      const check = await Linking.canOpenURL(mailUrl);
      const openResponse = await Linking.openURL(mailUrl);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSignout = () => {
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess();
      });
  };
  return (
    <View
      style={[
        styles.profileContainer,
        {backgroundColor: COLOR.backgroundColor, flex: 1},
      ]}>
      <View style={{marginLeft: -10}}>
        <Header title="Profile" showCurrency={false} />
      </View>

      <CustomModal
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        component={<TermsAndConditions />}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <View
            style={[
              styles.userDeatails,
              {
                backgroundColor: COLOR.readableBackgroundColor,
              },
            ]}>
            <View
              style={[
                styles.userProfileimageContainer,
                {backgroundColor: COLOR.primaryPurple},
              ]}>
              <Image source={{uri: photoURL}} style={styles.userProfileImage} />
            </View>
            <SizedBox height={24} />
            <Bold1820 textStyle={{textTransform: 'capitalize'}}>
              {displayName}
            </Bold1820>
            <Regular1416 textStyle={styles.emailText}>{email}</Regular1416>
          </View>
          <View
            style={[
              {backgroundColor: COLOR.readableBackgroundColor},
              styles.optionsContainerMain,
            ]}>
            <View style={styles.switchContainer}>
              <View style={styles.leftTitlesIconContainer}>
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color={COLOR.textColor1}
                />
                <Regular1416 textStyle={styles.titleStyle}>
                  Dark Theme
                </Regular1416>
              </View>
              <ToggleButton
                value={isDarkModeEnabled}
                onPress={() => {
                  EventRegister.emit(
                    'onChangeTheme',
                    theme === 'dark' ? 'light' : 'dark',
                  );
                  setIsDarkModeEnabled(val => !val);
                }}
                thumbActiveComponent={
                  <Ionicons name="ios-moon" size={22} color={'black'} />
                }
                thumbInActiveComponent={
                  <Ionicons name="sunny" size={22} color={COLOR.yellow} />
                }
                thumbButton={styles.thumbButton}
                trackBar={{
                  activeBackgroundColor: COLOR.primaryPurpleWithOpacity,
                  inActiveBackgroundColor: COLOR.primaryPurpleWithOpacity,
                  width: 80,
                  height: 40,
                }}
                thumbStyle={{
                  backgroundColor: COLOR.primaryPurple,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={styles.switchContainer}>
              <View style={styles.leftTitlesIconContainer}>
                <Ionicons
                  name="cash-outline"
                  size={24}
                  color={COLOR.textColor1}
                />
                <Regular1416 textStyle={styles.titleStyle}>
                  Default Currency
                </Regular1416>
              </View>
              <ToggleButton
                value={profileCurrencyInfo === 'usd'}
                onPress={() => {
                  const temp =
                    profileCurrencyInfo === 'usd'
                      ? currencies.inr
                      : currencies.usd;
                  EventRegister.emit('onChangeCurrency', temp);
                  setProfileCurrencyInfo(temp.currency);
                }}
                thumbActiveComponent={
                  <FontAwesome name="usd" size={18} color={'white'} />
                }
                thumbInActiveComponent={
                  <FontAwesome name="inr" size={18} color={'white'} />
                }
                thumbButton={styles.thumbButton}
                trackBar={{
                  activeBackgroundColor: COLOR.primaryPurpleWithOpacity,
                  inActiveBackgroundColor: COLOR.primaryPurpleWithOpacity,
                  width: 80,
                  height: 40,
                }}
                thumbStyle={{
                  backgroundColor: COLOR.primaryPurple,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <TouchableOpacity
              style={[styles.switchContainer, {justifyContent: 'flex-start'}]}
              onPress={() => {
                setShowModal(true);
              }}>
              <Ionicons
                name="clipboard-outline"
                size={24}
                color={COLOR.textColor1}
              />
              <Regular1416 textStyle={styles.titleStyle}>
                Terms and conditions
              </Regular1416>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switchContainer,
                {justifyContent: 'flex-start', borderBottomWidth: 0},
              ]}
              onPress={handleOpenMail}>
              <Ionicons name="at-sharp" size={24} color={COLOR.textColor1} />
              <Regular1416 textStyle={styles.titleStyle}>
                Contact Us
              </Regular1416>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.logoutButton}>
        <HighlightButton text="Sign Out" onPress={() => handleSignout()} />
      </View>
    </View>
  );
};

export default ProfileScreen;
