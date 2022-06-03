import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NewPasswordScreen from '../../routes/afterAuthentication/ProfileTab/NewPasswordScreen';
import HistoryScreen from '../../routes/afterAuthentication/ProfileTab/HistoryScreen';
import ProfileTab from '../../routes/afterAuthentication/ProfileTab';

const Stack = createNativeStackNavigator();

export default function CategoriesTabNavigation() {
  return (
    <Stack.Navigator initialRouteName="ProfileTab">
      <Stack.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPasswordScreen_Profile"
        component={NewPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
