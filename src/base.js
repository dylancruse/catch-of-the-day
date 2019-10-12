import firebase from 'firebase';
import Rebase from 're-base';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCSrijRwIWhGrHsy8V0T51CJ39YGkm5yT8',
  authDomain: 'catch-of-the-day-f4eb3.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-f4eb3.firebaseio.com',
  projectId: 'catch-of-the-day-f4eb3',
  storageBucket: 'catch-of-the-day-f4eb3.appspot.com',
  messagingSenderId: '639191621411',
  appId: '1:639191621411:web:b47e4bf4274ffc9f587696',
  measurementId: 'G-NXC72GNK80',
});

// Rebase bindings
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
