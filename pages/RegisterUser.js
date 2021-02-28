// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import firestore from '@react-native-firebase/firestore';

const RegisterUser = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    firestore()
      .collection('Users')
      .add({
        name: userName,
        contact: userContact,
        address: userAddress,
        createdAt: new Date(),
      })
      .then((results) => {
        if (results) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        }
        console.log('User added!');
      })
      .catch((a) => {
        alert('Registration Failed', a);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(name) => setUserName(name)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(contact) => setUserContact(contact)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={(address) => setUserAddress(address)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Pre-Populated SQLite Database in React Native
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
