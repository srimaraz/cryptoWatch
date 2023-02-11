// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const HomeCarousel = () => {
//   return (
//     <View
//       style={{
//         height: 160,
//         backgroundColor: '#F59300',
//         marginHorizontal: 12,
//         borderRadius: 10,
//         marginVertical: 6,
//         flex: 1,
//       }}></View>
//   );
// };

// export default HomeCarousel;

// const styles = StyleSheet.create({});

import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import SizedBox from '../../components/Atoms/sizedBox';
import {
  Bold2024,
  Bold2428,
  Regular1214,
  SemiBold1214,
  SemiBold1416,
  SemiBold1618,
  SemiBold2428,
} from '../../components/Atoms/Text';
import {screenHeight, screenWidth} from '../../utils/constants';
import Caraousel2 from '../../assets/Images/carousel2.svg';
import Caraousel3 from '../../assets/Images/carousel3.svg';
import Caraousel4 from '../../assets/Images/carousel4.svg';
import {useNavigation} from '@react-navigation/core';

const HomeCarousel = () => {
  const navigation = useNavigation();
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef();
  let intervalId = null;

  //   const onChange = () => {
  //     setDimension(Dimensions.get('window'));
  //   };

  //   useEffect(() => {
  //     Dimensions.addEventListener('change', onChange);
  //     return () => {
  //       Dimensions.removeEventListener('change', onChange);
  //     };
  //   });

  const onSlideChange = useCallback(() => {
    // Calculate newIndex here and use it to update your state and to scroll to the new slide
    const newIndex =
      selectedIndex === carouselData.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      // Clear the interval when component unmounts, otherwise you could have memory leaks
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    // As soon as the user touches the slide, stop the automatic sliding
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    //As soon as the user stops touching the slide, releases it, start the automatic sliding again
    startInterval();
  };

  const carouselData = [
    {
      subHeading: 'PortFolio',
      heading: `1000+ Tokens,`,
      headingSmall: 'supported for your protfolio.',
      buttonText: 'Add Asset',
      onButtonClick: () => {
        navigation.navigate('Portfolio');
      },
      svgComponent: <Caraousel3 height={'100%'} width={'50%'} />,
      color: '#9300F5',
    },
    {
      subHeading: 'Market',
      heading: `Market Today,`,
      headingSmall: `See live prices, charts.`,
      buttonText: 'Check',
      onButtonClick: () => {
        navigation.navigate('Market');
      },
      svgComponent: <Caraousel4 height={'100%'} width={'50%'} />,
      color: '#203ED6',
    },
    {
      subHeading: 'Profile',
      heading: `Personalize,`,
      headingSmall: `Set the default Currency & Theme.`,
      buttonText: 'update',
      onButtonClick: () => {
        navigation.navigate('Profile');
      },
      svgComponent: <Caraousel2 height={'100%'} width={'50%'} />,
      color: '#F50062',
    },
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  return (
    <View
      style={{
        height: screenHeight / 5,
        marginBottom: 10,
        overflow: 'hidden',
        marginTop: 6,
      }}>
      <ScrollView
        horizontal
        ref={scrollRef}
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        pagingEnabled>
        {carouselData.map((carouselItem, key) => (
          <View
            key={key}
            style={{
              height: screenHeight / 5,
              backgroundColor: carouselItem.color,
              flex: 1,
              width: screenWidth - 24,
              borderRadius: 10,
              marginHorizontal: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 10,
              overflow: 'hidden',
            }}>
            <View
              style={{
                width: '50%',
                height: '100%',
                justifyContent: 'space-evenly',
              }}>
              <SemiBold1416>{carouselItem.subHeading}</SemiBold1416>
              {/* <SizedBox height={10} /> */}
              <View>
                <Bold2024>{carouselItem.heading}</Bold2024>
                {/* <Bold2428>1000+ Tokens</Bold2428> */}
                <SemiBold1416>{carouselItem.headingSmall}</SemiBold1416>
              </View>
              {/* <SizedBox height={22} /> */}
              <TouchableOpacity
                onPress={carouselItem.onButtonClick}
                style={{
                  height: 35,
                  borderRadius: 6,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 100,
                }}>
                <SemiBold1214 color={carouselItem.color}>
                  {carouselItem.buttonText}
                </SemiBold1214>
              </TouchableOpacity>
            </View>
            {/* <Image
              source={require('../../assets/Images/carousel1.png')}
              style={{height: '160%', width: 250, alignSelf: 'center'}}
            /> */}
            {carouselItem.svgComponent}
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}>
        {carouselData.map((val, key) => (
          <Text
            key={key}
            style={
              key === selectedIndex
                ? {color: 'white', fontSize: 8}
                : {color: '#888', fontSize: 8}
            }>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeCarousel;
