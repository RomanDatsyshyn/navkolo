import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('window').width;

import {colors} from '../../../../assets/colors';

export const ServiceItem = ({name, id, services, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={() =>
        navigation.navigate('IWantToScreen', {
          id,
          name,
          services,
        })
      }>
      <Text style={[styles.text, styles.boldText]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  button: {
    width: w * 0.9,
    flexDirection: 'row',
    minHeight: w * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: w * 0.03,
    marginBottom: w * 0.03,
    paddingLeft: w * 0.04,
    paddingRight: w * 0.04,
    paddingTop: w * 0.02,
    paddingBottom: w * 0.02,
    backgroundColor: colors.pink,
  },
  text: {
    fontSize: w * 0.045,
    color: colors.deepBlue,
  },
  boldText: {
    fontWeight: '500',
  },
});
