// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to view all the user*/

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet, KeyboardAvoidingView,
} from "react-native";
// Connction to access the pre-populated user_db.db
import firestore from '@react-native-firebase/firestore';
import Mybutton from "./components/Mybutton";

const ViewAllUser = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then((snapshot) => {
        setFlatListItems(
          snapshot.docs.map((doc) => {
            return {id: doc.id, ...doc.data()};
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
  const goCalculate = (id) => {
    navigation.navigate('Calculator', {id});
  };
  const goViewRecord = (id) => {
    navigation.navigate('View', {id});
  };
  let listItemView = (item, separators) => {
    return (
      <View key={item.id} style={{ backgroundColor: "white", padding: 20 }}>
        <Text>
          <Text style={styles.fonts}>Id:</Text> {item.id}
        </Text>
        <Text><Text style={styles.fonts}>Name:</Text> {item.name}</Text>
        <Text><Text style={styles.fonts}>Contact:</Text> {item.contact}</Text>
        <Text><Text style={styles.fonts}>Address:</Text> {item.address}</Text>
        <Text><Text style={styles.fonts}>Date:</Text> {item.createdAt.toDate().toLocaleString()}</Text>
        <View style={{flexDirection: 'row'}}>
        <Mybutton title="Calculator" customClick={() => goCalculate(item.id)} />
        <Mybutton title="View Record" customClick={() => goViewRecord(item.id)} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, separators}) => listItemView(item, separators)}
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
  fonts:{ fontWeight: 'bold', color: '#f4511e'}
});
