import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

import {images} from '../../assets/images';
import {colors} from '../../assets/colors';

import Button from '../../components/Button';
import TextBlock from '../../components/TextBlock';
import BottomLinks from '../../components/BottomLinks';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.background}>
      <Image source={images.logo} style={styles.logo} />

      <View>
        <Image source={images.welcomeBoy} style={styles.image} />

        <View style={styles.labels}>
          <TextBlock text={'Забудьте про пошук!'} size={2} deepBlue />
          <TextBlock text={'Тепер є Ми.'} size={2} deepBlue bolder />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.labelForSignIn}>
          <TextBlock text={'Вже є профіль'} size={5} lighter />
        </View>

        <Button
          label={'Увійти'}
          onPress={() => navigation.navigate('LoginScreen')}
        />

        <View style={styles.labelForSignUp}>
          <TextBlock text={'Ще немає профілю...'} size={5} lighter />
        </View>

        <Button
          label={'Зареєструватися'}
          onPress={() => navigation.navigate('RegistrationScreen')}
          pink
        />

        <BottomLinks
          firstText={'Маєте запитання?'}
          secondText={'Напишіть нам!'}
          route={'ContactUsScreen'}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.pink,
    justifyContent: 'flex-end',
  },
  labels: {
    position: 'absolute',
    bottom: h > 700 ? w * 0.2 : w * 0.15,
    left: w * 0.075,
  },
  image: {
    width: w * 0.32,
    height: h * 0.35,
    alignSelf: 'flex-end',
    marginRight: w * 0.05,
    marginBottom: w * 0.05,
    resizeMode: 'contain',
    zIndex: 1,
  },
  logo: {
    position: 'absolute',
    width: w * 0.6,
    height: h > 700 ? w * 0.27 : w * 0.15,
    top: h > 700 ? h * 0.07 : h * 0.04,
    alignSelf: 'center',
    resizeMode: 'contain',
    zIndex: 11,
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: w * 0.08,
    borderTopRightRadius: w * 0.08,
    alignItems: 'center',
    paddingBottom: w * 0.02,
  },
  labelForSignIn: {
    alignSelf: 'flex-end',
    marginRight: w * 0.13,
    marginTop: w * 0.12,
    marginBottom: w * 0.025,
    opacity: 0.9,
  },
  labelForSignUp: {
    marginTop: w * 0.08,
    alignSelf: 'flex-start',
    marginLeft: w * 0.13,
    marginBottom: w * 0.025,
    opacity: 0.9,
  },
});
