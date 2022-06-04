import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../../../../assets/colors';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import DataService from '../../../../API/HTTP/services/data.service';

import TextBlock from '../../../../components/TextBlock';

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
    <SafeAreaView style={styles.background}>
      {items?.length > 0 && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.labels}>
            <TextBlock text={'Історія'} size={1} lightBlue boldest />

            <TextBlock text={'Ваша історія запитів'} size={5} grey bold />
          </View>
          {items?.map((item, index) => (
            <HistoryItem
              item={item}
              deleteUserHistoryItem={deleteUserHistoryItem}
              navigation={navigation}
              key={index}
            />
          ))}
          <View style={styles.spacing} />
          <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
            <FontAwesomeIcon
              icon={Icons.faChevronLeft}
              size={w * 0.08}
              style={[{color: colors.deepBlue}, styles.backIcon]}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
      {items.length === 0 && <Text>Немає жодного запису</Text>}
    </SafeAreaView>
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
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: w * 0.07,
    alignSelf: 'flex-start',
    top: w * 0.05,
  },
  backIcon: {
    width: w * 0.09,
    height: w * 0.09,
  },
  labels: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
