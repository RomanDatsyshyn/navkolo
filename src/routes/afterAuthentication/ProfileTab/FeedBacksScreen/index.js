import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import {colors} from '../../../../assets/colors';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import DataService from '../../../../API/HTTP/services/data.service';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

import AlertBox from '../../../../components/Alert';
import TextBlock from '../../../../components/TextBlock';

export const FeedBacksScreen = ({route, navigation: {goBack}}) => {
  const {id} = route.params;

  const [feedBacks, setFeedBacks] = useState([]);

  const getFeedBacks = async data => {
    await DataService.getServiceSellerFeedBacks(data)
      .then(res => {
        if (res.data.success) {
          setFeedBacks(res.data.data);
        } else {
          AlertBox('Сталася помилка', res.data.errors);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFeedBacks(id);
  }, [id]);

  return (
    <SafeAreaView style={styles.background}>
      <InputScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.labels}>
              <TextBlock text={'Відгуки'} size={1} lightBlue boldest />

              <View style={styles.subTitle}>
                <TextBlock
                  text={'Нижче наведені всі відгуки'}
                  size={5}
                  grey
                  bold
                />
              </View>
            </View>

            {feedBacks?.map((item, index) => (
              <View key={index}>
                <View style={styles.dateBlock}>
                  <TextBlock text={item.date} size={4} grey />
                </View>
                <TextBlock text={item.text} size={4} bold />
              </View>
            ))}

            {feedBacks.length === 0 && (
              <Text style={styles.emptyList}>Немає жодного відгуку</Text>
            )}

            <View style={styles.spacing} />
            <TouchableOpacity
              onPress={() => goBack()}
              style={styles.backButton}>
              <FontAwesomeIcon
                icon={Icons.faChevronLeft}
                size={w * 0.08}
                style={[{color: colors.deepBlue}, styles.backIcon]}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </InputScrollView>
    </SafeAreaView>
  );
};

export default FeedBacksScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labels: {
    marginTop: h * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    marginTop: w * 0.02,
    marginBottom: w * 0.05,
  },
  someSpace: {
    marginBottom: w * 0.07,
  },
  backButton: {
    position: 'absolute',
    top: w * 0.1,
    left: w * 0.05,
  },
  backIcon: {
    width: w * 0.09,
    height: w * 0.09,
  },
  spacing: {
    marginTop: w * 0.1,
  },
  container: {
    width: w * 0.9,
  },
  dateBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: w * 0.05,
    paddingBottom: w * 0.05,
  },
  emptyList: {
    alignSelf: 'center',
    marginTop: h * 0.3,
  },
});
