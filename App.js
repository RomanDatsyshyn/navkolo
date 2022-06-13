import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/navigations';
import NetInfo from '@react-native-community/netinfo';

import IsOfflineScreen from './src/routes/isOfflineScreen';

export default function App() {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  if (isOffline) {
    return <IsOfflineScreen />;
  } else {
    return (
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    );
  }
}
