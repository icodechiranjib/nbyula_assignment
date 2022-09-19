import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPG3mw5Vt2eAn6fjytdagq_1elM3YarfQ",
  authDomain: "nbyula-assignment-7c167.firebaseapp.com",
  projectId: "nbyula-assignment-7c167",
  storageBucket: "nbyula-assignment-7c167.appspot.com",
  messagingSenderId: "916243683069",
  appId: "1:916243683069:web:7ade245855f05be9cbd094",
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

export { firebase, firestore, app, auth };
