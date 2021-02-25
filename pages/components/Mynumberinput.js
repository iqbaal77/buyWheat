// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Custom TextInput

import React from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
const Mynumberinput = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#f4511e',
        borderWidth: 1,
        borderRadius: 25
      }}>
      <InputSpinner
        value={props.value}
        style={styles.spinner}
        type={'float'}
        step={props.step}
        precision={props.precision}
        placeholder={props.placeholder}
        onChange={props.onChangeText}
        decimalSeparator={props.decimalSeparator}
        colorRight={'#f4511e'}
        colorLeft={'#f4511e'}
      />
      {/*<TextInput*/}
      {/*  underlineColorAndroid='transparent'*/}
      {/*  placeholder={props.placeholder}*/}
      {/*  placeholderTextColor='#007FFF'*/}
      {/*  keyboardType='numeric'*/}
      {/*  onChangeText={props.onChangeText}*/}
      {/*  returnKeyType={props.returnKeyType}*/}
      {/*  numberOfLines={props.numberOfLines}*/}
      {/*  multiline={props.multiline}*/}
      {/*  onSubmitEditing={props.onSubmitEditing}*/}
      {/*  style={props.style}*/}
      {/*  blurOnSubmit={false}*/}
      {/*  value={props.value}*/}
      {/*  editable={props.editable}*/}
      {/*/>*/}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  col: {
    flex: 1,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    flex: 3,
    marginRight: 20,
  },
  title: {
    marginBottom: 40,
    fontSize: 30,
  },
  spinner: {
    flex: 1,
    width: 'auto',
  },
  simbol: {
    marginLeft: 10,
    marginRight: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30,
  },
});
export default Mynumberinput;
