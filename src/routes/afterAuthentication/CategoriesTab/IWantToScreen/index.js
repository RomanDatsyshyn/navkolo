import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Button from '../../../../components/Button';
import DataService from '../../../../API/HTTP/services/data.service';

const {io} = require('socket.io-client');

const w = Dimensions.get('window').width;

import {colors} from '../../../../assets/colors';

export const IWantToScreen = ({route, navigation}) => {
  const [userId_, setUserId_] = useState('');
  const {name, id, services} = route.params;

  const socket = io('ws://localhost:3001');

  const sendMessage = () => {
    socket.emit('sendUserOrderToServiceSellers', {
      userId: userId_,
      serviceId: id,
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

  return (
    <View style={styles.background}>
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
