// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Custom Button

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{
        alignItems: 'center',
        backgroundColor: props.disabled ? 'gray' : '#f4511e',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 50,
      }}
      onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f4511e',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;
