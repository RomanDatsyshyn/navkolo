import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../assets/colors';
import {getPhoneMask} from '../../components/common';

import Input from '../../components/Input';
import Button from '../../components/Button';
import AlertBox from '../../components/Alert';
import TextBlock from '../../components/TextBlock';
import BottomLinks from '../../components/BottomLinks';

import {setToken} from '../../asyncStorage/token';
import DataService from '../../API/HTTP/services/data.service';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const LoginScreen = ({navigation, navigation: {goBack}}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const isPhoneCorrect = phone.length < 10;
  const isPasswordCorrect = password.length < 5;

  const setTokenToStorage = async token => {
    await setToken(token);
  };

  const loginRequest = async data => {
    await DataService.login(data)
      .then(res => {
        if (res.data.success) {
          const {access_token} = res.data.data;
          setTokenToStorage(access_token);
          navigation.navigate('TabNavigation');
        } else {
          AlertBox('Сталася помилка', res.data.errors);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const signIn = () => {
    loginRequest({
      phone,
      password,
    });
  };

  const basicValidation = () => {
    setPhoneErrorMessage('');
    setPasswordErrorMessage('');

    isPhoneCorrect && setPhoneErrorMessage('Введіть мінімум 10 цифр');
    isPasswordCorrect && setPasswordErrorMessage('Введіть мінімум 5 символів');

    !isPhoneCorrect && !isPasswordCorrect && signIn();
  };

  useEffect(() => {
    phoneErrorMessage !== '' && !isPhoneCorrect && setPhoneErrorMessage('');
  }, [phoneErrorMessage, setPhoneErrorMessage, isPhoneCorrect]);

  useEffect(() => {
    passwordErrorMessage !== '' &&
      !isPasswordCorrect &&
      setPasswordErrorMessage('');
  }, [passwordErrorMessage, setPasswordErrorMessage, isPasswordCorrect]);

  return (
    <>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <FontAwesomeIcon
            icon={Icons.faChevronLeft}
            size={w * 0.08}
            style={[{color: colors.deepBlue}, styles.backIcon]}
          />
        </TouchableOpacity>

        <View>
          <View style={styles.labels}>
            <TextBlock text={'Вхід'} size={1} lightBlue boldest />

            <View style={styles.subTitle}>
              <TextBlock text={'Заповніть всі поля нижче'} size={5} grey bold />
            </View>
          </View>

          <View>
            <Input
              label="Логін:"
              isShowLabel={true}
              placeholder="Введіть номер телефону"
              error={phoneErrorMessage}
              value={getPhoneMask(phone)}
              keyboardType={'number-pad'}
              onChange={e => setPhone(e)}
            />

            <View style={styles.someSpace} />

            <Input
              label="Пароль:"
              isShowLabel={true}
              placeholder="Введіть ваш пароль"
              error={passwordErrorMessage}
              value={password}
              onChange={e => setPassword(e)}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPasswordScreen')}
              style={styles.forgetPassword}>
              <View style={styles.forgetPasswordText}>
                <TextBlock
                  text={'Забули пароль?'}
                  size={6}
                  deepBlue
                  underline
                />
              </View>
            </TouchableOpacity>

            <Button
              label={'Увійти'}
              onPress={() => basicValidation()}
              pink
              bold
            />

            <View style={styles.someSpace} />

            <BottomLinks
              firstText={'Не маєте профілю?'}
              secondText={'Створіть його!'}
              route={'RegistrationScreen'}
              navigation={navigation}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labels: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: colors.grey,
    fontWeight: '500',
    fontSize: w * 0.04,
    marginTop: w * 0.02,
    marginBottom: w * 0.15,
  },
  someSpace: {
    marginBottom: w * 0.07,
  },
  forgetPassword: {
    alignItems: 'flex-end',
    marginTop: w * 0.03,
    marginRight: w * 0.02,
  },
  forgetPasswordText: {
    marginBottom: w * 0.1,
  },
  backButton: {
    position: 'absolute',
    top: h * 0.07,
    left: w * 0.07,
  },
  backIcon: {
    width: w * 0.09,
    height: w * 0.09,
  },
});
