// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Custom Text

import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Mytext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 25,
    marginTop: 0,
    marginLeft: 35,
    marginRight: 35,
  },
});

export default Mytext;
