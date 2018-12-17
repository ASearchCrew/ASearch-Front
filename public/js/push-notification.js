import firebase from 'firebase';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  apiKey: process.env.FCM_APIKEY,
  authDomain: process.env.FCM_AUTHDOMAIN,
  databaseURL: process.env.FCM_DATABASEURL,
  projectId: process.env.FCM_PROJECTID,
  storageBucket: process.env.FCM_STORAGEBUCKET,
  messagingSenderId: process.env.FCM_MESSAGINGSENDERID 
 }

firebase.initializeApp(config);
navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
});

console.log("★★Firebase★★");

const messaging = firebase.messaging();
messaging.usePublicVapidKey(process.env.FCM_PUBLICVAPIDKEY);

messaging.requestPermission().then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
})

export const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token :', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
  }