import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAeeNCclihxW1W91pT3neMtk2PL9pVLwew",
  authDomain: "react-apod.firebaseapp.com",
  databaseURL: "https://react-apod.firebaseio.com",
  projectId: "react-apod",
  storageBucket: "react-apod.appspot.com",
  messagingSenderId: "257075830296",
  appId: "1:257075830296:web:74307a1b923b7e4c4f6d6d"
};

firebase.initializeApp(firebaseConfig);

export default firebase;