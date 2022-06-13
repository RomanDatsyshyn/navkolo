import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {
  AppState,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  Linking,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
const {io} = require('socket.io-client');

import SpecialistItem from './SpecialistItem';
import TextBlock from '../../../components/TextBlock';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Geolocation from 'react-native-geolocation-service';

import {colors} from '../../../assets/colors';
import {images} from '../../../assets/images';
import DataService from '../../../API/HTTP/services/data.service';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const SpecialistsTab = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [feed, setFeed] = useState([]);
  const [connected, setConnected] = useState(false);
  const [appState, setAppState] = useState('');

  const socket = io('ws://localhost:3001');

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
  }, [handleChange]);

  const getSpecialistsAroundMe = async (latitude, longitude) => {
    console.log(latitude, 'latitude');
    console.log(longitude, 'longitude');

    await DataService.getSpecialistsAroundMe(latitude, longitude)
      .then(res => {
        if (res.data.success) {
          console.log('yes');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getUserRequest = async () => {
    await DataService.getUserData()
      .then(res => {
        if (res.data.success) {
          setUserId(res.data.data.id);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserRequest();
  }, []);

  const handleChange = useCallback(
    newState => {
      if (newState === 'active') {
        if (appState !== 'active' && userId !== '') {
          // Reconnect
          connect(userId);
        }
        setAppState(newState);
      }
      if (
        newState === 'background' ||
        (newState === 'inactive' && userId !== '')
      ) {
        // Unsubscribe
        setAppState(newState);
        unsubscribe(userId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appState, connect, unsubscribe],
  );

  const connect = useCallback(
    id => {
      socket.emit('join', {room: `userFeed-${id}`});
      socket.on('message', data => {
        setFeed(data);
      });
    },
    [socket],
  );

  const unsubscribe = useCallback(
    id => {
      socket.emit('unsubscribe', {room: `userFeed-${id}`});
    },
    [socket],
  );

  const getUserFeed = async () => {
    await DataService.getUserData()
      .then(res => {
        const {success, data} = res.data;
        if (success) {
          setFeed(data.feed);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  useEffect(() => {
    if (!connected && userId !== '') {
      connect(userId);
      setConnected(true);
    }
  }, [connected, connect, userId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity TouchableOpacity={0.7} onPress={() => {}}>
          <FontAwesomeIcon
            icon={Icons.faFilter}
            size={w * 0.07}
            style={{marginRight: w * 0.05}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // ----------------------------------------------- //
  const [location, setLocation] = useState(null);

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
        const {latitude, longitude} = position.coords;

        setLocation(position);
        getSpecialistsAroundMe(latitude, longitude);
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
      {location !== null ? (
        <>
          {feed?.length > 0 && (
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}>
              {feed?.map((item, index) => (
                <SpecialistItem item={item} key={index} />
              ))}
              <View style={styles.spacing} />
            </ScrollView>
          )}
          {feed.length === 0 && (
            <>
              <Image source={images.feedTabImage} style={styles.image} />
              <TextBlock text={'Схоже, що нікого немає'} size={2} deepBlue />
              <TextBlock text={'поруч'} size={2} deepBlue />
            </>
          )}
        </>
      ) : (
        <>
          <TextBlock text={'Схоже, що ви'} size={2} deepBlue />
          <TextBlock text={'вимкнули геолокацію.'} size={2} deepBlue />
          <Image source={images.offline} style={styles.geolocation} />
          <TextBlock text={'Увімкніть її  ;)'} size={2} deepBlue />
        </>
      )}
    </View>
  );
};

export default SpecialistsTab;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: w * 0.04,
    width: w * 0.95,
    height: h,
  },
  spacing: {
    height: w * 0.05,
  },
  image: {
    width: w * 0.85,
    height: h * 0.28,
    alignSelf: 'center',
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: -h * 0.1,
    marginBottom: h * 0.05,
  },
  geolocation: {
    width: w * 0.85,
    height: h * 0.4,
    alignSelf: 'center',
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: h * 0.04,
    marginBottom: h * 0.05,
  },
});
