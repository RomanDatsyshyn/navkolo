import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';

const w = Dimensions.get('window').width;

import {colors} from '../../assets/colors';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const Button = ({
  label = '',
  pink,
  bold,
  leftArrow,
  rightArrow,
  onPress,
}) => {
  const getIdditionalStyles = () => {
    return pink
      ? {backgroundColor: colors.pink}
      : {borderWidth: 1, borderColor: colors.deepBlue};
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, getIdditionalStyles()]}
      onPress={onPress}>
      {leftArrow && (
        <FontAwesomeIcon
          icon={Icons.faChevronLeft}
          size={w * 0.06}
          style={[
            styles.icon,
            styles.iconMarginRight,
            {color: colors.deepBlue},
          ]}
        />
      )}
      <Text style={[styles.text, bold && styles.boldText]}>{label}</Text>
      {rightArrow && (
        <FontAwesomeIcon
          icon={Icons.faChevronRight}
          size={w * 0.06}
          style={[styles.icon, styles.iconMarginLeft, {color: colors.deepBlue}]}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: w * 0.8,
    height: w * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: w * 0.03,
  },
  text: {
    fontSize: w * 0.045,
    color: colors.deepBlue,
  },
  boldText: {
    fontWeight: '500',
  },
  icon: {
    width: w * 0.05,
    height: w * 0.05,
  },
  iconMarginLeft: {
    marginLeft: w * 0.01,
  },
  iconMarginRight: {
    marginRight: w * 0.01,
  },
});
