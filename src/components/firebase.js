// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyBhR06BUE_nhjFN_4-lvi7sRW9cT9aVTCs",
    authDomain: "task-cdecf.firebaseapp.com",
    projectId: "task-cdecf",
    storageBucket: "task-cdecf.appspot.com",
    messagingSenderId: "920760047079",
    appId: "1:920760047079:web:828a3029f23705f2bb1942",
    measurementId: "G-V5J53NT3CX"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase