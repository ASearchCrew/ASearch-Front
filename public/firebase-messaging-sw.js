// import configInfo from './js/configInfo';

importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase-messaging.js'); 
importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase.js');

// firebase.initializeApp({ 'messagingSenderId': configInfo.env.messagingSenderId //발신자ID
// }); 

var config = {
    messagingSenderId: "788130620748"
};
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.',
      icon: '/web-fcm-test/firebase-logo.png'
    };
  
  //   return self.registration.showNotification(notificationTitle,
  //     notificationOptions);
  });

//   self.addEventListener('push', function(event) { 
//     console.log("push event 발생");
//     const payload = event.data.json(); 
//     const title = payload.notification.title; 
//     const options = { body: payload.notification.body, 
//         icon: payload.notification.icon, 
//         data: payload.notification.click_action 
//     }; 
//     event.waitUntil(self.registration.showNotification(title, options)); 
// }); 
  
  self.addEventListener('notificationclick', function(event) {
    //푸시 노티피케이션 에서 클릭 리스너
      var data = event.notification.data;
      event.notification.close();
      event.waitUntil( clients.openWindow( data.url ) );
  });