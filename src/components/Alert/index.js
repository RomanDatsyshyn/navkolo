import {Alert} from 'react-native';

export const AlertBox = (title, subtitle) => {
  Alert.alert(
    title,
    subtitle,
    [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
    {cancelable: false},
  );
};

export default AlertBox;
