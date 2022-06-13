import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {
  AppState,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
const {io} = require('socket.io-client');

import FeedItem from './FeedItem';
import TextBlock from '../../../components/TextBlock';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import {colors} from '../../../assets/colors';
import {images} from '../../../assets/images';
import DataService from '../../../API/HTTP/services/data.service';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const FeedTab = ({navigation, route}) => {
  const [userId, setUserId] = useState('');
  const [feed, setFeed] = useState([]);
  const [connected, setConnected] = useState(false);
  const [appState, setAppState] = useState('');

  const socket = io('ws://localhost:3001');

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
  }, [handleChange]);

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

  return (
    <View style={styles.background}>
      {feed?.length > 0 && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {feed?.map((item, index) => (
            <FeedItem item={item} key={index} />
          ))}
          <View style={styles.spacing} />
        </ScrollView>
      )}
      {feed.length === 0 && (
        <>
          <Image source={images.feedTabImage} style={styles.image} />
          <TextBlock text={'Поки що пропозицій'} size={2} deepBlue />
          <TextBlock text={'немає'} size={2} deepBlue />
        </>
      )}
    </View>
  );
};

export default FeedTab;

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
});
