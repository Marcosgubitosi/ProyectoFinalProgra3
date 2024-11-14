import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAqZslQVB7kpYsD4VaXwcuwHN7BQEvNhPc",
    authDomain: "stefano-pietropaolo-prueba.firebaseapp.com",
    projectId: "stefano-pietropaolo-prueba",
    storageBucket: "stefano-pietropaolo-prueba.appspot.com",
    messagingSenderId: "722953412895",
    appId: "1:722953412895:web:98c095cf7a53ef222e902a"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()