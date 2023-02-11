import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import styles from './style';
import SizedBox from '../../components/Atoms/sizedBox';
import ThemeContext from '../../../config/themeContext';
import dayjs from 'dayjs';
import HomeScreenSkeletonLoader from '../../components/Atoms/SkeletonLoaders/homescreenLoader';
import {
  Bold1618,
  Regular1012,
  Regular1214,
  SemiBold1012,
  SemiBold1214,
  SemiBold1416,
} from '../../components/Atoms/Text';
import Entypo from 'react-native-vector-icons/Entypo';
import COLOR_PALETTE from '../../../config/themes';
import {CRYPTOCOMPARE_KEY} from '@env';
import ErrorMessage from '../../components/Atoms/ErrorComponents/errorMessage';
import {screenHeight} from '../../utils/constants';

const NewsList = () => {
  const colorMode = useContext(ThemeContext);
  const [pageLoading, setPageLoading] = useState(true);
  const [news, setNews] = useState([]);
  const theme = COLOR_PALETTE[colorMode];

  useEffect(() => {
    getCryptoNewsData();
  }, []);
  const getCryptoNewsData = () => {
    fetch(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key={${CRYPTOCOMPARE_KEY}}`,
    )
      .then(res => res.json())
      .then(res => {
        setNews(res.Data);
        // setIsRefreshing(false);
        setPageLoading(false);
      })
      .catch(err => {
        console.log('fetch error', err);
        // setIsRefreshing(false);
        setPageLoading(false);
      });
  };

  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        elevation: 2,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 14,
        }}>
        <Entypo
          name="news"
          size={22}
          color={theme.textColor1}
          style={{marginRight: 8}}
        />
        {/* <SimpleLineIcons name="fire" size={20} color={theme.primaryPurple} /> */}
        <Bold1618>Crypto in News</Bold1618>
      </View>
      <View
        style={{
          width: '100%',
          height: 4,
          marginVertical: 8,
          backgroundColor: theme.backgroundColor,
        }}
      />

      {pageLoading ? (
        <View style={{height: '100%'}}>
          <HomeScreenSkeletonLoader />
        </View>
      ) : (
        <FlatList
          data={news}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          //   onRefresh={onRefresh}
          //   refreshing={isRefreshing}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => {
                Linking.openURL(item.url).catch(err => {
                  console.err('Could not open Url because', err);
                });
              }}>
              <View
                style={[
                  {
                    backgroundColor: theme.readableBackgroundColor,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    borderRadius: 14,
                    elevation: 2,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  },
                ]}>
                <Image
                  style={styles.newsImage}
                  source={{
                    uri: item.imageurl,
                  }}
                  resizeMode="contain"
                />
                <View style={styles.newsTitleView}>
                  <Regular1012>
                    {dayjs
                      .unix(item.published_on)
                      .format('hh:mm A. DD/MM/YYYY')}
                  </Regular1012>

                  <SizedBox height={8} />
                  <SemiBold1416 numberOfLines={3}>{item.title}</SemiBold1416>
                  <SizedBox height={10} />
                  {/* <FlatList
                  data={item.categories.split('|')}
                  horizontal={true}
                  renderItem={({item, index}) => (
                    <View key={index} style={styles.tagsContainer}>
                      <Text style={styles.tagsText}>{item}</Text>
                    </View>
                  )}
                /> */}
                  <View style={styles.tagsListBox}>
                    {item.categories.split('|')?.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.tagsContainer,
                          {
                            backgroundColor: theme.primaryPurpleMaxBlur,
                            borderColor: theme.primaryPurple,
                          },
                        ]}>
                        <SemiBold1012 color={theme.primaryPurple}>
                          {item}
                        </SemiBold1012>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          ListEmptyComponent={
            <View
              style={{
                height: screenHeight / 3,
              }}>
              <ErrorMessage />
            </View>
          }
        />
      )}
    </View>
  );
};

export default NewsList;
