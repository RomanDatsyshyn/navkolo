import React from 'react';
import {Dimensions} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FeedTabScreen from '../../routes/afterAuthentication/FeedTab';
import SpecialistsTabScreen from '../../routes/afterAuthentication/SpecialistsTab';
import ProfileTabNavigation from '../profileTabNavigation';
import CategoriesTabNavigation from '../categoriesTabNavigation';

import {
  feedTabOptions,
  categoriesTabOptions,
  profileTabOptions,
  specialistsTabOptions,
} from './tabsOptions';

const w = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Categories"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          height: w * 0.18,
          paddingBottom: w * 0.05,
        },
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedTabScreen}
        options={feedTabOptions}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesTabNavigation}
        options={categoriesTabOptions}
      />
      <Tab.Screen
        name="Specialists"
        component={SpecialistsTabScreen}
        options={specialistsTabOptions}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabNavigation}
        options={profileTabOptions}
      />
    </Tab.Navigator>
  );
}
