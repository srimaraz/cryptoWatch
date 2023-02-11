import {View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Lottie from 'lottie-react-native';
import {
  SemiBold1416,
  Regular1214,
  Regular1416,
  Bold2830,
} from '../../components/Atoms/Text';
import SizedBox from '../../components/Atoms/sizedBox';
import FilledButton from '../../components/Atoms/Buttons/filledButton';
import {screenWidth} from '../../utils/constants';
import TermsAndConditions from '../../publicPages/termsAndConditions';

const LoginNew = ({onGoogleButtonPress}) => {
  const [signInProgress, setSigninProgress] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleSignIn = () => {
    setSigninProgress(true);
    onGoogleButtonPress()
      .then(() => console.log('Signed in with Google!'))
      .catch(error => console.log('sign In error', error))
      .finally(() => setSigninProgress(false));
  };
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#7f11e0',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
      }}>
      <Modal
        animationType="slide"
        visible={showTermsModal}
        onRequestClose={() => {
          setShowTermsModal(!showTermsModal);
        }}>
        <TermsAndConditions />
      </Modal>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <Bold2830 color="white" textStyle={{alignSelf: 'flex-start'}}>
          Welcome to CryptoWatch!
        </Bold2830>
        <SizedBox height={12} />
        <Regular1416 color="white" textStyle={{alignSelf: 'flex-start'}}>
          Keep track of the Crypto Market , News , Portfolio , Profits & Loss .
          All in one place.
        </Regular1416>
      </View>
      <SizedBox height={40} />
      <View
        style={{
          width: screenWidth,
          height: screenWidth,
          borderRadius: screenWidth,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(100, 65, 165, 0.2)',
        }}>
        <View
          style={{
            width: screenWidth - 80,
            height: screenWidth - 80,
            borderRadius: screenWidth,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(100, 65, 165, 0.3)',
          }}>
          <View
            style={{
              width: screenWidth - 160,
              height: screenWidth - 160,
              borderRadius: screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(100, 65, 165, 0.4)',
            }}>
            <Lottie
              source={require('./../../assets/LottieAnimations/splashLoader.json')}
              autoPlay
              loop={true}
              style={{height: 350, width: 350}}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <FilledButton
          fillcolor="white"
          textColor="#6441a5"
          text={signInProgress ? 'Signing In...' : 'Sign in with Google'}
          disabled={signInProgress}
          onPress={handleSignIn}
        />
        <SizedBox height={16} />
        <TouchableOpacity
          onPress={() => {
            setShowTermsModal(true);
          }}>
          <Regular1214 color="white">
            By signing in , you agree to the our
            <SemiBold1416
              textStyle={{textDecorationLine: 'underline'}}
              color="yellow">
              {' '}
              Terms and conditions.
            </SemiBold1416>
          </Regular1214>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginNew;
