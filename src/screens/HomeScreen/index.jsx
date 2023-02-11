import React, {useState, useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from './style';
import ThemeContext from '../../../config/themeContext';
import NewsList from './newsList';
import TrendingTokens from './trendingTokensList';
import TopTenCoins from './topTenCoinsList';
import COLOR_PALETTE from '../../../config/themes';
import Header from '../../components/Atoms/header';
import {ScrollView} from 'react-native-gesture-handler';
import HomeCarousel from './homeCarousel';

const HomePage = () => {
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];

  return (
    <SafeAreaView
      style={[styles.mainContainer, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}>
        <View style={{marginRight: 10}}>
          <Header title={'Home'} showIcon />
        </View>
        <HomeCarousel />
        <TrendingTokens />
        <TopTenCoins />

        <NewsList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
