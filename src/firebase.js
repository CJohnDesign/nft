import * as firebase from "firebase/app"

var firebaseApp = firebase.initializeApp({
    // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyAW59-zNxIvefp99ptPiiSHtJkZqnV3X6s",
    authDomain: "freshman-year.firebaseapp.com",
    projectId: "freshman-year",
    storageBucket: "freshman-year.appspot.com",
    messagingSenderId: "277534010170",
    appId: "1:277534010170:web:a662bfef4eff05c576fe03",
    measurementId: "G-HCHWC65K40",
})
const db = firebase.firestore();

export {db};