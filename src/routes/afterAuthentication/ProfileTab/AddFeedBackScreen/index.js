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

import {colors} from '../../../../assets/colors';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import AlertBox from '../../../../components/Alert';
import TextBlock from '../../../../components/TextBlock';

import DataService from '../../../../API/HTTP/services/data.service';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const AddFeedBackScreen = ({route, navigation: {goBack, navigate}}) => {
  const {id} = route.params;

  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);

  const [textErrorMessage, setTextErrorMessage] = useState('');

  const isTextCorrect = text.length < 10;

  const sendRequest = async data => {
    await DataService.addFeedBack(data)
      .then(res => {
        if (res.status === 200) {
          AlertBox('Успішно!', 'Ваш відгук отримано');
          goBack();
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
      serviceSellerId: id,
      date: '17/05/2022 - 14 : 12',
      text,
      rating,
    });
  };

  const basicValidation = () => {
    setTextErrorMessage('');

    isTextCorrect && setTextErrorMessage('Введіть мінімум 10 літер');

    !isTextCorrect && signUp();
  };

  useEffect(() => {
    textErrorMessage !== '' && !isTextCorrect && setTextErrorMessage('');
  }, [textErrorMessage, setTextErrorMessage, isTextCorrect]);

  const getSelectedStyles = number => {
    if (isSelected(number)) {
      return {
        backgroundColor: colors.deepBlue,
      };
    }
  };

  const isSelected = number => rating === number;

  return (
    <SafeAreaView style={styles.backgroundSafeArea}>
      <InputScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.background}>
            <View>
              <View style={styles.labels}>
                <TextBlock text={'Залиште відгук'} size={1} lightBlue boldest />

                <View style={styles.subTitle}>
                  <TextBlock
                    text={'Оцініть та заповніть поле'}
                    size={5}
                    grey
                    bold
                  />
                </View>
              </View>

              <View>
                <View style={styles.row}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(1)]}
                    onPress={() => setRating(1)}>
                    {isSelected(1) ? (
                      <TextBlock text={1} size={2} white />
                    ) : (
                      <TextBlock text={1} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(2)]}
                    onPress={() => setRating(2)}>
                    {isSelected(2) ? (
                      <TextBlock text={2} size={2} white />
                    ) : (
                      <TextBlock text={2} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(3)]}
                    onPress={() => setRating(3)}>
                    {isSelected(3) ? (
                      <TextBlock text={3} size={2} white />
                    ) : (
                      <TextBlock text={3} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(4)]}
                    onPress={() => setRating(4)}>
                    {isSelected(4) ? (
                      <TextBlock text={4} size={2} white />
                    ) : (
                      <TextBlock text={4} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(5)]}
                    onPress={() => setRating(5)}>
                    {isSelected(5) ? (
                      <TextBlock text={5} size={2} white />
                    ) : (
                      <TextBlock text={5} size={2} />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(6)]}
                    onPress={() => setRating(6)}>
                    {isSelected(6) ? (
                      <TextBlock text={6} size={2} white />
                    ) : (
                      <TextBlock text={6} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(7)]}
                    onPress={() => setRating(7)}>
                    {isSelected(7) ? (
                      <TextBlock text={7} size={2} white />
                    ) : (
                      <TextBlock text={7} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(8)]}
                    onPress={() => setRating(8)}>
                    {isSelected(8) ? (
                      <TextBlock text={8} size={2} white />
                    ) : (
                      <TextBlock text={8} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(9)]}
                    onPress={() => setRating(9)}>
                    {isSelected(9) ? (
                      <TextBlock text={9} size={2} white />
                    ) : (
                      <TextBlock text={9} size={2} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.ratingItem, getSelectedStyles(10)]}
                    onPress={() => setRating(10)}>
                    {isSelected(10) ? (
                      <TextBlock text={10} size={2} white />
                    ) : (
                      <TextBlock text={10} size={2} />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.someSpace} />

                <Input
                  label={'Відгук:'}
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

export default AddFeedBackScreen;

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
    marginBottom: w * 0.1,
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
  ratingItem: {
    width: w * 0.1,
    height: w * 0.1,
    borderRadius: w * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.deepBlue,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: w * 0.05,
    flexDirection: 'row',
  },
});
