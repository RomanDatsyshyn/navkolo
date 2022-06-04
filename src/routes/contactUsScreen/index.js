import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import {colors} from '../../assets/colors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import AlertBox from '../../components/Alert';
import TextBlock from '../../components/TextBlock';

import DataService from '../../API/HTTP/services/data.service';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const ContactUsScreen = ({navigation: {goBack, navigate}}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [textErrorMessage, setTextErrorMessage] = useState('');

  const isNameCorrect = name.length < 2;
  const isTitleCorrect = title.length < 2;
  const isTextCorrect = text.length < 2;

  const sendRequest = async data => {
    await DataService.contactUs(data)
      .then(res => {
        if (res.status === 201) {
          AlertBox('Успішно!', 'Ваше повідомлення отримане.');

          setName('');
          setTitle('');
          setText('');
        } else {
          AlertBox('Помилка...', 'Спробуйте ще раз.');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const signUp = () => {
    sendRequest({
      name,
      title,
      text,
    });
  };

  const basicValidation = () => {
    setNameErrorMessage('');
    setTitleErrorMessage('');
    setTextErrorMessage('');

    isNameCorrect && setNameErrorMessage('Введіть мінімум 2 літери');
    isTitleCorrect && setTitleErrorMessage('Введіть мінімум 2 літери');
    isTextCorrect && setTextErrorMessage('Введіть мінімум 2 літери');

    !isNameCorrect && !isTitleCorrect && !isTextCorrect && signUp();
  };

  useEffect(() => {
    nameErrorMessage !== '' && !isNameCorrect && setNameErrorMessage('');
  }, [nameErrorMessage, setNameErrorMessage, isNameCorrect]);

  useEffect(() => {
    titleErrorMessage !== '' && !isTitleCorrect && setTitleErrorMessage('');
  }, [titleErrorMessage, setTitleErrorMessage, isTitleCorrect]);

  useEffect(() => {
    textErrorMessage !== '' && !isTextCorrect && setTextErrorMessage('');
  }, [textErrorMessage, setTextErrorMessage, isTextCorrect]);

  return (
    <SafeAreaView style={styles.backgroundSafeArea}>
      <InputScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.background}>
            <View>
              <View style={styles.labels}>
                <TextBlock text={'Напишіть нам'} size={1} lightBlue boldest />

                <View style={styles.subTitle}>
                  <TextBlock
                    text={'Заповніть всі поля нижче'}
                    size={5}
                    grey
                    bold
                  />
                </View>
              </View>

              <View>
                <Input
                  label={'Як вас звати?'}
                  isShowLabel={true}
                  placeholder="Введіть своє ім'я"
                  error={nameErrorMessage}
                  value={name}
                  onChange={e => setName(e)}
                />

                <View style={styles.someSpace} />

                <Input
                  label={'Тема повідомлення:'}
                  isShowLabel={true}
                  placeholder="Пропозиція"
                  error={titleErrorMessage}
                  value={title}
                  onChange={e => setTitle(e)}
                />

                <View style={styles.someSpace} />

                <Input
                  label={'Повідомленя:'}
                  isShowLabel={true}
                  placeholder="Введіть Ваше повідомлення..."
                  error={textErrorMessage}
                  value={text}
                  onChange={e => setText(e)}
                  multiline={true}
                  height={h * 0.25}
                />

                <View style={styles.someSpace} />

                <Button
                  label={'Надіслати'}
                  onPress={() => basicValidation()}
                  pink
                  bold
                />
                <View style={styles.someSpace} />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
            <FontAwesomeIcon
              icon={Icons.faChevronLeft}
              size={w * 0.08}
              style={[{color: colors.deepBlue}, styles.backIcon]}
            />
          </TouchableOpacity>
        </ScrollView>
      </InputScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  backgroundSafeArea: {
    backgroundColor: colors.white,
  },
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labels: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: w * 0.13,
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
    top: h * 0.01,
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
