import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
    </Stack.Navigator>
  );
}
