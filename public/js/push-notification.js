import firebase from 'firebase';
import configInfo from './configInfo';

const config = {
  apiKey: configInfo.env.apiKey,
  authDomain: configInfo.env.authDomain,
  databaseURL: configInfo.env.databaseURL,
  projectId: configInfo.env.projectId,
  storageBucket: configInfo.env.storageBucket,
  messagingSenderId: configInfo.env.messagingSenderId 
 }

firebase.initializeApp(config);
navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
});

console.log("★★Firebase★★");

const messaging = firebase.messaging();
messaging.usePublicVapidKey(configInfo.env.publicVapidKey);

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
      console.log('★★token :', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
  }