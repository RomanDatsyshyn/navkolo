import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

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

export const NewPasswordScreen = ({navigation, navigation: {goBack}}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');

  const isPasswordCorrect = password.length < 5;
  const isConfirmPassword = confirmPassword.length < 5;

  const updatePassword = async data => {
    await DataService.updatePassword(data)
      .then(res => {
        if (res.status === 200) {
          AlertBox('Успішно!', 'Ваш пароль було змінено');
          goBack();
        } else {
          AlertBox('Сталася помилка', res.data.errors);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const sendRequest = () => {
    updatePassword({
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
        <ScrollView showsVerticalScrollIndicator={false}>
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

              <BottomLinks
                firstText={'Маєте запитання?'}
                secondText={'Напишіть нам!'}
                route={'ContactUsScreen'}
                navigation={navigation}
              />
            </View>
          </View>
          <View style={styles.someSpace} />
          <View style={styles.someSpace} />
          <View style={styles.someSpace} />
          <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
            <FontAwesomeIcon
              icon={Icons.faChevronLeft}
              size={w * 0.08}
              style={[{color: colors.deepBlue}, styles.backIcon]}
            />
          </TouchableOpacity>
        </ScrollView>
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
    marginTop: h * 0.1,
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
    top: w * 0.12,
  },
  backIcon: {
    width: w * 0.09,
    height: w * 0.09,
  },
  spacing: {
    marginTop: w * 0.1,
  },
});
