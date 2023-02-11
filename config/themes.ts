const commonColors: Object = {
  lightGreen: '#2AAA8A',
  primaryPurple: '#7f11e0',
  //  '#6441a5',
  //previously: '#7f11e0',
  // #6441a5
  //#9146FF
  yellow: 'yellow',
  complementaryYellow: '#FFD700',
  complementaryYellowBlur: 'rgba(255, 215, 0, 0.3)',
  complementaryYellowDark: '#DAA520',
  primaryPurpleWithOpacity: 'rgba(127, 17, 224, 0.5)',
  secondaryPurpleBlur: '#CF9FFF',
  primaryPurpleMaxBlur: 'rgba(127, 17, 224, 0.1)',
  gray: 'gray',
  greyBlur: '#ededed',
  profitGreen: 'rgba(34, 139, 34, 1)',
  profitGreenMinBlur: 'rgba(34, 139, 34, 0.5)',
  profitGreenBlur: 'rgba(34, 139, 34, 0.2)',
  lossRed: '#e75757',
  lossRedMinBlur: 'rgba(231, 87, 87, 0.5)',
  lossRedBlur: 'rgba(231, 87, 87, 0.2)',
};
const COLOR_PALETTE = {
  light: {
    ...commonColors,
    textColor1: 'black',
    backgroundColor: 'white',
    readableBackgroundColor: '#F8F8FF',
    shimmerColors: ['#ededed', '#C0C0C0', '#A0A0A0'],
  },
  dark: {
    ...commonColors,
    textColor1: 'white',
    backgroundColor: 'black',
    readableBackgroundColor: '#232336',
    shimmerColors: ['#909090', '#686868', '#383838'],
  },
};

export default COLOR_PALETTE;
