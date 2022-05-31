import React from 'react';
import {Dimensions, Text} from 'react-native';

const w = Dimensions.get('window').width;

import {colors} from '../../assets/colors';

export const TextBlock = ({
  text = '',
  size = 3,
  lighter,
  bold,
  bolder,
  boldest,
  italic,
  underline,
  pink,
  red,
  orange,
  deepBlue,
  lightBlue,
  white,
  grey,
  lightGrey,
}) => {
  const getTextSize = () => {
    if (size === 1) {
      return 0.09;
    }
    if (size === 2) {
      return 0.07;
    }
    if (size === 3) {
      return 0.05;
    }
    if (size === 4) {
      return 0.045;
    }
    if (size === 5) {
      return 0.04;
    }
    if (size === 6) {
      return 0.037;
    }
  };

  const getFontWeightStyle = () => {
    if (lighter) {
      return '300';
    } else if (bold) {
      return '500';
    } else if (bolder) {
      return '600';
    } else if (boldest) {
      return '700';
    } else {
      return '400';
    }
  };

  const getFontStyle = () => {
    return italic ? 'italic' : 'normal';
  };

  const getTextDecorationLineStyle = () => {
    return underline ? 'underline' : 'none';
  };

  const getTextColor = () => {
    if (pink) {
      return colors.pink;
    } else if (orange) {
      return colors.orange;
    } else if (deepBlue) {
      return colors.deepBlue;
    } else if (lightBlue) {
      return colors.lightBlue;
    } else if (white) {
      return colors.white;
    } else if (grey) {
      return colors.grey;
    } else if (lightGrey) {
      return colors.lightGrey;
    } else if (red) {
      return colors.red;
    } else {
      return colors.black;
    }
  };

  const getTextStyle = () => {
    return {
      fontSize: w * getTextSize(),
      fontWeight: getFontWeightStyle(),
      fontStyle: getFontStyle(),
      textDecorationLine: getTextDecorationLineStyle(),
      color: getTextColor(),
    };
  };

  return <Text style={getTextStyle()}>{text}</Text>;
};

export default TextBlock;
