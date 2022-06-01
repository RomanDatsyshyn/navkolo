import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {colors} from '../../../../assets/colors';

import AlertBox from '../../../../components/Alert';
import Button from '../../../../components/Button';
import TextBlock from '../../../../components/TextBlock';
import BottomLinks from '../../../../components/BottomLinks';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const CELL_COUNT = 4;
const CELL_SIZE = 70;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#27272f';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const {Value, Text: AnimatedText} = Animated;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export const CodeRecoveryScreen = ({
  route,
  navigation,
  navigation: {goBack},
}) => {
  const {code, email} = route.params;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[stylesForCodeInput.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const basicValidation = () => {
    if (value.toString().length < 4) {
      AlertBox('Помилка', 'Введіть код відновлення коректно!');
    } else {
      if (code.toString() === value.toString()) {
        navigation.navigate('NewPasswordScreen', {
          email,
        });
      } else {
        AlertBox('Помилка', 'Не вірний код відновлення');
        setValue('');
      }
    }
  };

  return (
    <>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <FontAwesomeIcon
            icon={Icons.faChevronLeft}
            size={w * 0.08}
            style={[{color: colors.deepBlue}, styles.backIcon]}
          />
        </TouchableOpacity>

        <View>
          <View style={styles.labels}>
            <TextBlock text={'Введіть код'} size={1} lightBlue boldest />
            <TextBlock text={'Відновлення'} size={1} lightBlue boldest />

            <View style={styles.subTitle}>
              <TextBlock text={'На ваш Email було'} size={5} grey bold />
              <View style={styles.someSpacing} />
              <TextBlock text={'надіслано код'} size={5} grey bold />
            </View>
          </View>

          <View style={styles.mb15} />

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={stylesForCodeInput.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />

          <View style={stylesForCodeInput.nextButton}>
            <Button
              label={'Підтвердити'}
              onPress={() => basicValidation()}
              pink
              bold
            />
          </View>

          <BottomLinks
            firstText={'Маєте запитання?'}
            secondText={'Напишіть нам!'}
            route={'ContactUsScreen'}
            navigation={navigation}
          />
        </View>
      </View>
    </>
  );
};

export default CodeRecoveryScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: w * 0.15,
  },
  labels: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    marginTop: w * 0.02,
    alignItems: 'center',
  },
  mb15: {
    marginBottom: w * 0.15,
  },
  backButton: {
    position: 'absolute',
    top: h * 0.07,
    left: w * 0.07,
  },
  backIcon: {
    width: w * 0.09,
    height: w * 0.09,
  },
  someSpacing: {
    height: w * 0.01,
  },
});

const stylesForCodeInput = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: colors.deepBlue,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  root: {
    minHeight: 800,
    padding: 20,
  },
  nextButton: {
    marginTop: w * 0.25,
    alignSelf: 'center',
    marginBottom: 100,
  },
});
