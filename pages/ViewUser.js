// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to view single user

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DataTable from './components/Table';
import Mytext from './components/Mytext';
// Connction to access the pre-populated user_db.db
const ViewUser = ({route}) => {
  let [inputUserId, setInputUserId] = useState('');
  let [listItems, setListItems] = useState([]);

  // let searchUser = () => {
  //   console.log(inputUserId);
  //   setUserData({});
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM tbl_user where user_id = ?',
  //       [inputUserId],
  //       (tx, results) => {
  //         var len = results.rows.length;
  //         console.log('len', len);
  //         if (len > 0) {
  //           setUserData(results.rows.item(0));
  //         } else {
  //           alert('No user found');
  //         }
  //       },
  //     );
  //   });
  // };
  const getConvertedDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
    // return `${dateObject.toLocaleString('en-US', {weekday: 'long'})}-${dateObject.toLocaleString('en-US', {day: 'numeric'})}-${dateObject.toLocaleString('en-US', {month: 'long'})},${dateObject.toLocaleString('en-US', {year: 'numeric'})}
    //         ${dateObject.toLocaleString('en-US', {hour: 'numeric'})}:${dateObject.toLocaleString('en-US', {minute: 'numeric'})}:${dateObject.toLocaleString('en-US', {second: 'numeric'})}`;
    //dateObject.toLocaleString('en-US', {timeZoneName: 'short'}); // 12/9/2019, 10:30:15 AM CST
  };
  useEffect(() => {
    console.log(listItems);
  }, [listItems]);
  useEffect(() => {
    firestore()
      .collection('WheatRecords')
      .where('userId', '==', route?.params?.id)
      .get()
      .then((snapshot) => {
        setListItems(
          snapshot.docs.map((doc) => {
            let data = doc.data();
            let {singleRecords: singleArr} = doc.data();
            console.log(singleArr);
            if (!singleArr.totalBagCount) {
              data.singleRecordsArr = singleArr.map((single, index) => {
                return [
                  index + 1,
                  single.perBag,
                  single.perBagWeight,
                  single.remainingWeight,
                  `${single.totalMun}\n${single.totalKiloOfMn}`,
                  single.wheatRate,
                  single.totalAmount,
                ];
              });
            }

            let {grandTotalObj: total} = doc.data();
            if (!singleArr.totalBagCount) {
              data.singleRecordsArr.push([
                total.totalBags,
                total.totalKilo,
                total.perBagWeight,
                total.remainingWeight,
                `${total.totalMun}\n${total.totalKiloOfMn}`,
                total.wheatRate,
                total.totalAmount,
              ]);
            } else {
              let {grandTotalObj: obj} = doc.data();

              data.singleRecordsArr = [];
              data.singleRecordsArr.push([
                total.totalBags,
                obj.totalKilo,
                obj.perBagWeight,
                obj.remainingWeight,
                `${obj.totalMun}\n${obj.totalKiloOfMn}`,
                total.wheatRate,
                obj.totalAmount,
              ]);
            }
            return data;
          }),
        );
      });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView>
          {listItems?.map((item) => {
            return (
              <View key={item.createdAt._seconds}>
                <Mytext text={getConvertedDate(item.createdAt._seconds)} />
                <DataTable data={item.singleRecordsArr} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
