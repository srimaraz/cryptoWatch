import {Image, Linking, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ThemeContext from '../../../../config/themeContext';
import SizedBox from '../../Atoms/sizedBox';
import {Bold1416, Bold1820} from '../../Atoms/Text';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import COLOR_PALETTE from '../../../../config/themes';
import styles from './styles';

interface DescriptionTokenLinksProps {
  links: any;
  logo: string;
}
const DescriptionTokenLinks = (props: DescriptionTokenLinksProps) => {
  const {links, logo} = props;
  const colorMode = useContext(ThemeContext);
  const theme = COLOR_PALETTE[colorMode];

  const linksMap = [
    {
      title: 'Website',
      url: links?.homepage[0],
      IconComponent: (
        <Image
          source={{uri: logo}}
          style={{height: 20, width: 20, borderRadius: 20}}
        />
      ),
      borderColor: 'rgb(255, 192, 0)',
      backgroundColor: 'rgba(255, 192, 0,0.1)',
    },
    {
      title: 'Forum',
      url: links?.official_forum_url?.[0],
      IconComponent: (
        <Image
          source={{uri: logo}}
          style={{height: 20, width: 20, borderRadius: 20}}
        />
      ),
      borderColor: 'rgb(255, 192, 0)',
      backgroundColor: 'rgba(255, 192, 0,0.1)',
    },
    {
      title: 'Twitter',
      url: `https://twitter.com/${links?.twitter_screen_name}`,
      IconComponent: <Fontisto name="twitter" size={20} color="#1DA1F2" />,
      borderColor: '#1DA1F2',
      backgroundColor: 'rgba(29, 161, 242, 0.2)',
    },
    {
      title: 'Facebook',
      url: `https://fb.com/profile/${links?.facebook_username}`,
      IconComponent: <Fontisto name="facebook" size={20} color="#4267B2" />,
      borderColor: 'rgb(66, 103, 178)',
      backgroundColor: 'rgba(66, 103, 178, 0.2)',
    },
    {
      title: 'Reddit',
      url: links.subreddit_url,
      IconComponent: <Fontisto name="reddit" size={20} color="#ff4500" />,
      borderColor: '#ff4500',
      backgroundColor: 'rgba(255, 69, 0, 0.2)',
    },
    {
      title: 'Github',
      url: links?.repos_url?.github?.[0],
      IconComponent: <Fontisto name="github" size={20} />,
      borderColor: 'rgb(128,128,128)',
      backgroundColor: 'rgba(128,128,128,0.4)',
    },
  ];
  const handleOpenLink = (url: string) => {
    Linking.openURL(url)
      .then(() => {})
      .catch(() => {
        console.log('failed to redirect');
      });
  };

  return (
    <View
      style={[
        {
          backgroundColor: theme.backgroundColor,
        },
        styles.linksMainContainer,
      ]}>
      <SizedBox height={6} />
      <Bold1820 textStyle={styles.linkHeadingText}>{'Explore'}</Bold1820>
      <View
        style={[
          {
            backgroundColor: theme.readableBackgroundColor,
          },
          styles.linksDivider,
        ]}
      />
      <View style={styles.linksMapWrapper}>
        {linksMap.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleOpenLink(item.url);
            }}
            disabled={!item.url}
            style={[
              {
                borderColor: item.borderColor,
                backgroundColor: item.backgroundColor,
                opacity: item.url ? 1 : 0.2,
              },
              styles.linkContainer,
            ]}>
            <View style={styles.linksIconContainer}>{item.IconComponent}</View>
            <View style={styles.linkTitleContainer}>
              <Bold1416 color={item.borderColor}>{item.title}</Bold1416>
              <EvilIcons
                name="external-link"
                size={24}
                color={item.borderColor}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DescriptionTokenLinks;
