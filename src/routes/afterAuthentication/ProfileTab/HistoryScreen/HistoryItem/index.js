import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import Button from '../../../../../components/Button';
import TextBlock from '../../../../../components/TextBlock';

import {colors} from '../../../../../assets/colors';
import {icons} from '../../../../../assets/icons';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const w = Dimensions.get('window').width;

export const HistoryItem = ({navigation, item, deleteUserHistoryItem}) => {
  const {id, serviceSellerId, name, photo, rating} = item;
  return (
    <>
      <View style={styles.dateBlock}>
        <TextBlock text={'17/05/2022 - 14 : 12'} size={4} grey />
      </View>
      <View style={styles.item}>
        <View style={styles.row}>
          <Image
            source={{
              uri: `http://localhost:3001/${photo}`,
            }}
            style={styles.itemImage}
          />
          <View style={styles.itemInfo}>
            <View>
              <View style={styles.itemRow}>
                <TextBlock text={name} size={3} deepBlue />
                <FontAwesomeIcon
                  icon={Icons.faCircleCheck}
                  size={w * 0.045}
                  style={[
                    {color: colors.black, marginLeft: w * 0.015},
                    styles.itemLocationIcon,
                  ]}
                />
              </View>
              <TextBlock text={'Електрик'} size={4} grey />
            </View>
            <View>
              <View style={[styles.row, styles.alignCenter]}>
                <FontAwesomeIcon
                  icon={Icons.faBolt}
                  size={w * 0.055}
                  style={[{color: colors.black}, styles.itemLocationIcon]}
                />

                <View style={styles.itemDistance}>
                  <TextBlock
                    text={`${rating.sum / rating.amount} із 10`}
                    size={3}
                    deepBlue
                  />
                </View>
              </View>

              <View style={[styles.row, styles.alignCenter]}>
                <FontAwesomeIcon
                  icon={Icons.faComment}
                  size={w * 0.055}
                  style={[{color: colors.black}, styles.itemLocationIcon]}
                />
                <TouchableOpacity
                  style={styles.itemMap}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('FeedBacksScreen', {
                      id: serviceSellerId,
                    })
                  }>
                  <TextBlock text={'Відгуки'} size={3} grey />
                </TouchableOpacity>
              </View>

              <View style={[styles.row, styles.alignCenter]}>
                <FontAwesomeIcon
                  icon={Icons.faLocationDot}
                  size={w * 0.055}
                  style={[{color: colors.black}, styles.itemLocationIcon]}
                />

                <TouchableOpacity style={styles.itemMap} activeOpacity={0.7}>
                  <TextBlock text={'Локація'} size={3} grey />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={icons.instagram} style={styles.instagram} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={icons.telegram} style={styles.telegram} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={icons.viber} style={styles.viber} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <FontAwesomeIcon
              icon={Icons.faMobileButton}
              size={w * 0.09}
              style={[{color: colors.black}]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.close}
          activeOpacity={0.7}
          onPress={() => deleteUserHistoryItem(id)}>
          <FontAwesomeIcon
            icon={Icons.faXmark}
            size={w * 0.07}
            style={[{color: colors.deepBlue}, styles.closeIcon]}
          />
        </TouchableOpacity>
      </View>
      <Button
        width={'100%'}
        label={'Залишити відгук'}
        // onPress={() => navigation.navigate('RegistrationScreen')}
        pink
      />
    </>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    marginBottom: w * 0.1,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: w * 0.35,
    height: w * 0.35,
    borderRadius: w * 0.02,
  },
  instagram: {
    width: w * 0.11,
    height: w * 0.11,
  },
  telegram: {
    width: w * 0.1,
    height: w * 0.1,
  },
  viber: {
    width: w * 0.1,
    height: w * 0.1,
  },
  itemInfo: {
    marginLeft: w * 0.05,
    justifyContent: 'space-between',
    paddingBottom: w * 0.01,
  },
  itemDistance: {
    marginBottom: w * 0.01,
  },
  itemLocationIcon: {
    width: w * 0.05,
    height: w * 0.05,
    marginRight: w * 0.02,
  },
  itemUahIcon: {
    width: w * 0.045,
    height: w * 0.045,
    marginRight: w * 0.02,
  },
  itemMap: {
    marginLeft: w * 0.01,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: w * 0.04,
    paddingRight: w * 0.04,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: w * 0.1,
  },
  close: {
    position: 'absolute',
    top: w * 0.005,
    right: w * 0.025,
  },
  closeIcon: {
    width: w * 0.05,
    height: w * 0.05,
  },
  dateBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: w * 0.05,
    paddingBottom: w * 0.05,
  },
});
