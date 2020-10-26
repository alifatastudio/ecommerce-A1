import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEWegUHW9hHZnEml32tzNEaDwyGfUU29g",
  authDomain: "elogie.firebaseapp.com",
  databaseURL: "https://elogie.firebaseio.com",
  projectId: "elogie",
  storageBucket: "elogie.appspot.com",
  messagingSenderId: "823567665557",
  appId: "1:823567665557:web:f0081bf1aabf06438e4e9c",
  measurementId: "G-QC93LVFVRC"
};

firebase.initializeApp(firebaseConfig);

export default firebase;