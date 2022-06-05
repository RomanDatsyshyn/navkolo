import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Button from '../../../../components/Button';
import DatePicker from 'react-native-date-picker';

import DataService from '../../../../API/HTTP/services/data.service';

const {io} = require('socket.io-client');

const w = Dimensions.get('window').width;

import {colors} from '../../../../assets/colors';

export const IWantToScreen = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isSelected, seIsSelected] = useState(false);

  const [userId_, setUserId_] = useState('');
  const {name, id, services} = route.params;

  const socket = io('ws://localhost:3001');

  const sendMessage = () => {
    socket.emit('sendUserOrderToServiceSellers', {
      userId: userId_,
      serviceId: id,
      date,
    });
  };

  const getUserRequest = async () => {
    await DataService.getUserData()
      .then(res => {
        if (res.data.success) {
          setUserId_(res.data.data.id);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  const isTodayOrTomorrow = (mm, dd, yyyy) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let todayDate = String(today.getDate()).padStart(2, '0');
    let tomorrowDate = String(tomorrow.getDate()).padStart(2, '0');

    if (todayDate === dd) {
      return ' Cьогодні';
    }

    if (tomorrowDate === dd) {
      return 'Завтра';
    }

    if (todayDate !== dd && tomorrowDate !== dd) {
      return dd + '/' + mm + '/' + yyyy;
    }
  };

  const getFormatedDate = () => {
    if (!isSelected) {
      return 'Обрати дату й час';
    } else {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');
      let yyyy = date.getFullYear();

      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

      let minute =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

      return isTodayOrTomorrow(mm, dd, yyyy) + ' - ' + hour + ' : ' + minute;
    }
  };

  return (
    <View style={styles.background}>
      <Button label={getFormatedDate()} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={e => {
          setOpen(false);
          setDate(e);
          seIsSelected(true);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        locale="uk"
        title="Оберіть зручний для Вас час"
        confirmText="Обрати"
        cancelText="Скасувати"
        minimumDate={new Date()}
        minuteInterval={5}
      />

      <View style={styles.spacing} />

      <Button
        label={name}
        onPress={() => {
          sendMessage();
          navigation.navigate('Feed', {
            isStart: true,
          });
        }}
        pink
        bold
      />
      <View style={styles.spacing} />
      <Button
        label={'Повернутися назад'}
        onPress={() =>
          navigation.navigate('ListOfServicesScreen', {
            services,
          })
        }
        bold
        leftArrow
      />
    </View>
  );
};

export default IWantToScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    marginTop: w * 0.05,
  },
});
