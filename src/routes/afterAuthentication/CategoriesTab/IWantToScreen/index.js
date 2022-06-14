import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
  Linking,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Button from '../../../../components/Button';
import DatePicker from 'react-native-date-picker';

import DataService from '../../../../API/HTTP/services/data.service';
import Geolocation from 'react-native-geolocation-service';

const {io} = require('socket.io-client');

const w = Dimensions.get('window').width;

import {colors} from '../../../../assets/colors';

export const IWantToScreen = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isSelected, seIsSelected] = useState(false);
  const [location, setLocation] = useState(null);

  const [userId_, setUserId_] = useState('');
  const {name, id, services} = route.params;

  const socket = io('ws://localhost:3001');

  const sendMessage = () => {
    const {latitude, longitude} = location.coords;

    socket.emit('sendUserOrderToServiceSellers', {
      userId: userId_,
      serviceId: id,
      date,
      latitude,
      longitude,
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

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow "Navkolo" to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        console.log(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.background}>
      <Button
        label={getFormatedDate()}
        onPress={() => setOpen(true)}
        width={w * 0.9}
      />
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
        width={w * 0.9}
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
        width={w * 0.9}
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
