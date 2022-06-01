import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../../../assets/colors';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import DataService from '../../../../API/HTTP/services/data.service';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

import AlertBox from '../../../../components/Alert';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import TextBlock from '../../../../components/TextBlock';
import BottomLinks from '../../../../components/BottomLinks';

export const NewPasswordScreen = ({
  route,
  navigation,
  navigation: {goBack},
}) => {
  const {email} = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');

  const isPasswordCorrect = password.length < 5;
  const isConfirmPassword = confirmPassword.length < 5;

  const changePassword = async data => {
    await DataService.changePassword(data)
      .then(res => {
        if (res.status === 200) {
          navigation.navigate('LoginScreen');
        } else {
          AlertBox('Сталася помилка', res.data.errors);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const sendRequest = () => {
    changePassword({
      email,
      password,
    });
  };

  const basicValidation = () => {
    setPasswordErrorMessage('');
    setConfirmPasswordErrorMessage('');

    isPasswordCorrect && setPasswordErrorMessage('Введіть мінімум 5 символів');
    isConfirmPassword &&
      setConfirmPasswordErrorMessage('Введіть мінімум 5 символів');

    if (!isPasswordCorrect && !isConfirmPassword) {
      if (password === confirmPassword) {
        sendRequest();
      } else {
        AlertBox('Сталася помилка', 'Ваші паролі не співпадають.');
      }
    }
  };

  useEffect(() => {
    passwordErrorMessage !== '' &&
      !isPasswordCorrect &&
      setPasswordErrorMessage('');
  }, [passwordErrorMessage, setPasswordErrorMessage, isPasswordCorrect]);

  useEffect(() => {
    confirmPasswordErrorMessage !== '' &&
      !isConfirmPassword &&
      setConfirmPasswordErrorMessage('');
  }, [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
    isConfirmPassword,
  ]);

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
            <TextBlock text={'Введіть ваш'} size={1} lightBlue boldest />
            <TextBlock text={'Новий пароль'} size={1} lightBlue boldest />

            <View style={styles.subTitle}>
              <TextBlock text={'Заповніть поля нижче'} size={5} grey bold />
            </View>
          </View>

          <View>
            <Input
              label={'Пароль:'}
              isShowLabel={true}
              placeholder="Придумайте новий пароль"
              value={password}
              error={passwordErrorMessage}
              onChange={e => setPassword(e)}
            />

            <View style={styles.someSpace} />

            <Input
              label={'Повторіть пароль:'}
              isShowLabel={true}
              placeholder="Введіть його знову"
              value={confirmPassword}
              error={confirmPasswordErrorMessage}
              onChange={e => setConfirmPassword(e)}
            />

            <View style={styles.spacing} />

            <Button
              label={'Змінити пароль'}
              onPress={() => basicValidation()}
              pink
              bold
            />

            <View style={styles.spacing} />

            <BottomLinks
              firstText={'Маєте запитання?'}
              secondText={'Напишіть нам!'}
              route={'ContactUsScreen'}
              navigation={navigation}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default NewPasswordScreen;

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
    marginTop: w * 0.02,
    marginBottom: w * 0.15,
  },
  someSpace: {
    marginBottom: w * 0.07,
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
  spacing: {
    marginTop: w * 0.1,
  },
});
