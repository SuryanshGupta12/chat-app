importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDAxCNO1wKfelyn4QuGh52pEHAmGYVGLjQ",
  authDomain: "chat-app-3000f.firebaseapp.com",
  databaseURL: "https://chat-app-3000f-default-rtdb.firebaseio.com",
  projectId: "chat-app-3000f",
  storageBucket: "chat-app-3000f.firebasestorage.app",
  messagingSenderId: "549361722055",
  appId: "1:549361722055:web:0f7e42a60b40724b9e54e2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = 'ChatMe';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    tag: 'chatme-notification'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});