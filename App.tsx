import React, {useEffect, useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import ThemeContext from './config/themeContext';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AuthContext from './config/authContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WithSplashScreen} from './src/publicPages/splashScreen';
import {getDataLS, storeDataLS} from './src/utils/customHooks';
import MyStackNavigator from './src/navigation/myStackNavigator';
import LoginNew from './src/screens/LoginNew';
import {FIREBASE_WEB_CLIENT_ID, FIREBASE_IOS_CLIENT_ID} from '@env';
import UserSettingsContext from './config/userSettingsContext';
import {currencies} from './src/utils/constants';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  GoogleSignin.configure({
    webClientId: FIREBASE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    iosClientId: FIREBASE_IOS_CLIENT_ID,
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [appTheme, setAppTheme] = useState('');
  const [currencyInfo, setCurrencyInfo] = useState<any>();

  // Handle user state changes

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    handleInitialize();
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleInitialize = async () => {
    try {
      const promise1 = getDataLS('appTheme');
      const promise2 = getDataLS('currencyInfoLS');

      const appThemeLS = await promise1;
      const currencyInfoFromLS = await promise2;
      setCurrencyInfo(currencyInfoFromLS ?? currencies.usd);
      setAppTheme(appThemeLS ?? 'dark');
    } catch (e) {
      setCurrencyInfo(currencies.usd);
      setAppTheme('dark');
      console.log('error in handleInitialize:', e);
    } finally {
      setIsAppReady(true);
    }
  };

  function onAuthStateChanged(userTemp: any) {
    setUser(userTemp);
    if (initializing) setInitializing(false);
  }

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Authentication Cancelled', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Authentication In Progress', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Authentication play services not available', error);
        // play services not available or outdated
      } else {
        console.log('Sign In Failed', error);
        Alert.alert('Authentication Failed !');
        // some other error happened
      }
    }
  };

  useEffect(() => {
    let eventListenerThemeChange: any = EventRegister.addEventListener(
      'onChangeTheme',
      updateTheme,
    );
    return () => {
      EventRegister.removeEventListener(eventListenerThemeChange);
    };
  });
  useEffect(() => {
    let eventListenerCurrencyChange = EventRegister.addEventListener(
      'onChangeCurrency',
      updateCurrency,
    );
    return () => {
      EventRegister.removeEventListener(eventListenerCurrencyChange);
    };
  });
  const updateTheme = async (data: string) => {
    try {
      setAppTheme(data);
      await storeDataLS('appTheme', data ?? 'dark');
    } catch (err) {
      setAppTheme('dark');
    }
  };
  const updateCurrency = async (data: any) => {
    try {
      setCurrencyInfo(data);
      await storeDataLS('currencyInfoLS', data ?? currencies.usd);
    } catch (err) {
      setCurrencyInfo(currencies.usd);
    }
  };
  return (
    <WithSplashScreen isAppReady={isAppReady && !initializing}>
      <StatusBar
        backgroundColor={appTheme === 'dark' ? 'black' : 'white'}
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeContext.Provider value={appTheme}>
          <>
            {user ? (
              <AuthContext.Provider value={user}>
                <UserSettingsContext.Provider value={{currencyInfo}}>
                  <MyStackNavigator />
                </UserSettingsContext.Provider>
              </AuthContext.Provider>
            ) : (
              <LoginNew onGoogleButtonPress={onGoogleButtonPress} />
            )}
          </>
        </ThemeContext.Provider>
      </GestureHandlerRootView>
    </WithSplashScreen>
  );
};

export default App;
