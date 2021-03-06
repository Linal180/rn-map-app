import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImgPicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [ selectedImage, setSelectedImage ] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'New Place',
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
