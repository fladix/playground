import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAC2jnCrpTaPvCfelUj6uQfMGNZzu0BfD8",
  authDomain: "chatbot-bck.firebaseapp.com",
  databaseURL: "https://chatbot-bck.firebaseio.com",
  projectId: "chatbot-bck",
  storageBucket: "chatbot-bck.appspot.com",
  messagingSenderId: "996463860449",
  appId: "1:996463860449:web:0b46bc316bf364576435a0"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();