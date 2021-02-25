// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBYkfbAQ5TEY6gjBOUyfe57ksGMI4B_xmM',
  authDomain: 'wheatcalculator.firebaseapp.com',
  projectId: 'wheatcalculator',
  storageBucket: 'wheatcalculator.appspot.com',
  messagingSenderId: '765814961823',
  appId: '1:765814961823:web:80c8d3ce1a7f053d2314aa',
  measurementId: 'G-7F015V7BPF',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
