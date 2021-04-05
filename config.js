

import firebase from 'firebase'
require ('@firebase/firestore')


const firebaseConfig = {
  apiKey: "AIzaSyAyBzHBkvCVZZ126KCen_nS1VGE_SHvAQk",
  authDomain: "lagging-2c5a2.firebaseapp.com",
  projectId: "lagging-2c5a2",
  storageBucket: "lagging-2c5a2.appspot.com",
  messagingSenderId: "1044698543891",
  appId: "1:1044698543891:web:fb7fb8da387521234e0ce6"
};


firebase.initializeApp(firebaseConfig);
export default firebase.firestore();

