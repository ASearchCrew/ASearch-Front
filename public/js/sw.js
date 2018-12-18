import configInfo from './configInfo';

importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js'); 

firebase.initializeApp({ 'messagingSenderId': configInfo.env.messagingSenderId //발신자ID
}); 

self.addEventListener('push', function(event) { 
    const payload = event.data.json(); 
    const title = payload.notification.title; 
    const options = { body: payload.notification.body, 
        icon: payload.notification.icon, 
        data: payload.notification.click_action 
    }; 
    event.waitUntil(self.registration.showNotification(title, options)); 
}); 
  
  self.addEventListener('notificationclick', function(event) {
    //푸시 노티피케이션 에서 클릭 리스너
      var data = event.notification.data;
      event.notification.close();
      event.waitUntil( clients.openWindow( data.url ) );
  });