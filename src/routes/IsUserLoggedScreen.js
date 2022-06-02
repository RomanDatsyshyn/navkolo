import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {colors} from '../assets/colors';
import {getToken} from '../asyncStorage/token';

export const IsUserLoggedScreen = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();

      token
        ? navigation.navigate('TabNavigation')
        : navigation.navigate('WelcomeScreen');
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color={colors.black} />
    </View>
  );
};

export default IsUserLoggedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pink,
  },
});
