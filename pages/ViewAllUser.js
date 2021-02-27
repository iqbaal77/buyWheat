// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
// Connction to access the pre-populated user_db.db
import firestore from '@react-native-firebase/firestore';

const ViewAllUser = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then((snapshot) => {
        setFlatListItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          }),
        );
      });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    );
  };
  const onPress = (id) => {
    navigation.navigate('Calculator', {id})
  };
  let listItemView = (item, separators) => {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => onPress(item.id)}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        key={item.id}
      >
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Id: {item.id}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Contact: {item.contact}</Text>
          <Text>Address: {item.address}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, separators }) => listItemView(item, separators)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;
const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  image: {
    height: '100%',
    borderRadius: 4,
  },
});
