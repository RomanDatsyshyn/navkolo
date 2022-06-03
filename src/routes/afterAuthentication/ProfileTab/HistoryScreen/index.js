import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';

import {colors} from '../../../../assets/colors';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

import DataService from '../../../../API/HTTP/services/data.service';

import HistoryItem from './HistoryItem';

export const HistoryScreen = ({navigation, navigation: {goBack}}) => {
  const [items, setItems] = useState([]);

  const getUserHistory = async () => {
    await DataService.getUserHistory()
      .then(res => {
        if (res.data.success) {
          setItems(res.data.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserHistory();
  }, []);

  const deleteUserHistoryItem = async id => {
    await DataService.deleteUserHistoryItem({id})
      .then(res => {
        if (res.status === 200) {
          getUserHistory();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.background}>
      {items?.length > 0 && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {items?.map((item, index) => (
            <HistoryItem
              item={item}
              deleteUserHistoryItem={deleteUserHistoryItem}
              navigation={navigation}
              key={index}
            />
          ))}
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
        </ScrollView>
      )}
      {items.length === 0 && <Text>Немає жодного запису</Text>}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: w * 0.95,
    height: h,
  },
  spacing: {
    height: w * 0.05,
  },
});
