import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/analytics"

const firebaseConfig = {
  // your firebase config
};

firebase.initializeApp(firebaseConfig);
firebase.analytics()

export default firebase