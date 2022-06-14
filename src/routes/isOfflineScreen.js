import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

import TextBlock from '../components/TextBlock';

import {colors} from '../assets/colors';
import {images} from '../assets/images';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const FeedTab = () => {
  return (
    <View style={styles.background}>
      <TextBlock text={'Схоже, що ваш'} size={2} deepBlue />
      <TextBlock text={'інтернет виключений.'} size={2} deepBlue />
      <Image source={images.offline} style={styles.image} />
      <TextBlock text={'Увімкніть його ;)'} size={2} deepBlue />
    </View>
  );
};

export default FeedTab;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: w * 0.85,
    height: h * 0.4,
    alignSelf: 'center',
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: h * 0.04,
    marginBottom: h * 0.05,
  },
});
