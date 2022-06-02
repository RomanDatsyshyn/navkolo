import * as React from 'react';
import {Dimensions} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import {colors} from '../../../assets/colors';

const w = Dimensions.get('window').width;

export const feedTabOptions = {
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      icon={Icons.faPeopleArrowsLeftRight}
      size={w * 0.1}
      style={{
        color: focused ? colors.deepBlue : colors.lightGrey,
      }}
    />
  ),
  headerTitle: 'Пропозиції',
  tabBarShowLabel: false,
  headerTitleAlign: 'center',
  tabBarIconStyle: {
    marginTop: w * 0.05,
  },
  tabBarBadge: '25',
  tabBarBadgeStyle: {
    backgroundColor: '#fae1dd',
    marginLeft: w * 0.05,
    marginTop: w * -0.015,
  },
};

export const categoriesTabOptions = {
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      icon={Icons.faPersonChalkboard}
      size={w * 0.12}
      style={{
        color: focused ? colors.deepBlue : colors.lightGrey,
      }}
    />
  ),
  headerTitle: 'Категорії',
  tabBarShowLabel: false,
  headerTitleAlign: 'center',
  tabBarIconStyle: {
    marginTop: w * 0.05,
  },
};

export const specialistsTabOptions = {
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      icon={Icons.faStreetView}
      size={w * 0.1}
      style={{
        color: focused ? colors.deepBlue : colors.lightGrey,
      }}
    />
  ),
  headerTitle: 'Спеціалісти',
  tabBarShowLabel: false,
  headerTitleAlign: 'center',
  tabBarIconStyle: {
    marginTop: w * 0.05,
  },
};

export const profileTabOptions = {
  tabBarIcon: ({focused}) => (
    <FontAwesomeIcon
      icon={Icons.faPerson}
      size={w * 0.1}
      style={{
        color: focused ? colors.deepBlue : colors.lightGrey,
      }}
    />
  ),
  headerTitle: 'Профіль',
  tabBarShowLabel: false,
  headerTitleAlign: 'center',
  tabBarIconStyle: {
    marginTop: w * 0.05,
  },
};
