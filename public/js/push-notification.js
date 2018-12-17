import firebase from 'firebase';

const config = {
  apiKey: process.env.VUE_APP_FCM_APIKEY,
  authDomain: process.env.VUE_APP_FCM_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FCM_DATABASEURL,
  projectId: process.env.VUE_APP_FCM_PROJECTID,
  storageBucket: process.env.VUE_APP_FCM_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FCM_MESSAGINGSENDERID 
 }

firebase.initializeApp(config);
navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
});

console.log("★★Firebase★★");

const messaging = firebase.messaging();
messaging.usePublicVapidKey(process.env.VUE_APP_FCM_PUBLICVAPIDKEY);

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