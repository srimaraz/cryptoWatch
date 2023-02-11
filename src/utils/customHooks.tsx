import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useState} from 'react';

export async function storeDataLS(key: string, value: string) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log('error in writing Localstorage', err);
  }
}
export async function getDataLS(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log('error in reading Localstorage', err);
  }
}

export default function usePersistState(key: string, initialValue?: string) {
  const [state, setState] = useState(
    () => AsyncStorage.getItem(key) || persistItem(key, initialValue),
  );
  const setStateAndPersist = useCallback(
    (newState: string) => {
      setState(newState);
      return persistItem(key, newState);
    },
    [key, setState],
  );
  return [state, setStateAndPersist];
}
