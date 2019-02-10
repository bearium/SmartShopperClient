importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCgSCcmYd6iIHyxF6YeQBAw-BNg5Pc7wc8',
  authDomain: 'greenhousedata-cef98.firebaseapp.com',
  databaseURL: 'https://greenhousedata-cef98.firebaseio.com',
  projectId: 'greenhousedata-cef98',
  storageBucket: 'greenhousedata-cef98.appspot.com',
  messagingSenderId: '526472420376',
});

const messaging = firebase.messaging();
