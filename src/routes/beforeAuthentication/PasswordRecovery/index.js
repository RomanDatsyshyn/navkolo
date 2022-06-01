import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../../assets/colors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AlertBox from '../../../components/Alert';
import TextBlock from '../../../components/TextBlock';
import BottomLinks from '../../../components/BottomLinks';

import DataService from '../../../API/HTTP/services/data.service';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ForgetPasswordScreen = ({navigation, navigation: {goBack}}) => {
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const isEmailCorrect = !email.includes('@');

  const sendRequest = async data => {
    await DataService.sendCode(data)
      .then(res => {
        if (res.data.success) {
          navigation.navigate('CodeRecoveryScreen', {
            code: res.data.data,
            email: email,
          });
        } else {
          AlertBox('Сталася помилка', res.data.errors);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const nextStep = () => {
    sendRequest({
      email,
    });
  };

  const basicValidation = () => {
    setEmailErrorMessage('');
    isEmailCorrect && setEmailErrorMessage('Введіть email коректно');
    !isEmailCorrect && nextStep();
  };

  useEffect(() => {
    emailErrorMessage !== '' && !isEmailCorrect && setEmailErrorMessage('');
  }, [emailErrorMessage, setEmailErrorMessage, isEmailCorrect]);

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
            <TextBlock text={'Email'} size={1} lightBlue boldest />

            <View style={styles.subTitle}>
              <TextBlock text={'Заповніть полe нижче'} size={5} grey bold />
            </View>
          </View>

          <View>
            <Input
              label="Email:"
              isShowLabel={true}
              placeholder="Example@example.com"
              error={emailErrorMessage}
              value={email}
              onChange={e => setEmail(e)}
            />
            <View style={styles.someSpace} />

            <Button
              label={'Далі'}
              onPress={() => basicValidation()}
              pink
              bold
              rightArrow
            />
            <View style={styles.moreSpace} />
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

export default ForgetPasswordScreen;

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
  moreSpace: {
    marginBottom: w * 0.2,
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
