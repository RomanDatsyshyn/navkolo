import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import {colors} from '../../../../assets/colors';

import ServiceItem from '../ServiceItem';
import Input from '../../../../components/Input';
import TextBlock from '../../../../components/TextBlock';

import * as Icons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const ListOfServicesScreen = ({
  route,
  navigation,
  navigation: {goBack},
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {services} = route.params;

  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <FontAwesomeIcon
            icon={Icons.faChevronLeft}
            size={w * 0.07}
            style={[{color: colors.deepBlue}, styles.backIcon]}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <TextBlock text={'Оберіть послугу'} size={2} lightBlue boldest />
        </View>
        <View style={styles.subTitle}>
          <TextBlock text={'або скористайтеся пошуком'} size={5} grey bolde />
        </View>

        <Input
          placeholder="Введіть назву послуги"
          isShowIcon={true}
          value={searchQuery}
          onChangeText={e => setSearchQuery(e)}
          width={w * 0.9}
        />

        <View style={styles.categoriesContainer}>
          {services.map(({name, id}, index) => (
            <>
              <ServiceItem
                id={id}
                name={name}
                navigation={navigation}
                services={services}
                key={index}
              />
            </>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListOfServicesScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  title: {
    marginTop: w * 0.07,
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: w * 0.01,
    marginBottom: w * 0.05,
    alignSelf: 'center',
  },
  positionRelative: {
    position: 'relative',
    justifyContent: 'center',
  },
  toRightIcon: {
    position: 'absolute',
    width: w * 0.06,
    height: w * 0.06,
    marginLeft: w * 0.03,
  },
  categoriesContainer: {
    width: w * 0.9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: w * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: h * 0.05,
  },
  backIcon: {
    width: w * 0.09,
    height: w * 0.09,
  },
});
