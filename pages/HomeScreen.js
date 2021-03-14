// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native

import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
const HomeScreen = ({navigation}) => {
  useEffect(() => {
    // db.transaction(function (txn) {
    //   txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_user'",
    //     [],
    //     function (tx, res) {
    //       console.log('item:', res.rows.length);
    //       if (res.rows.length == 0) {
    //         txn.executeSql('DROP TABLE IF EXISTS tbl_user', []);
    //         txn.executeSql(
    //           'CREATE TABLE IF NOT EXISTS tbl_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
    //           [],
    //         );
    //       }
    //     },
    //   );
    // });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {/*<Mytext text="Pre-Populated SQLite Database in React Native" />*/}
          <Mybutton
            title="Calculator"
            customClick={() => navigation.navigate('Calculator')}
          />
          <Mybutton
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update"
            // customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            // customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            // customClick={() => navigation.navigate('Delete')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
