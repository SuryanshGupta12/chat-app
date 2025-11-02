const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendChatNotification = functions.database.ref('/messages/{messageId}')
  .onCreate(async (snap) => {
    const message = snap.val();
    const payload = {
      notification: {
        title: 'ChatMe',
        body: `${message.username}: ${message.text}`,
        icon: 'https://chatsurya.netlify.app/logo192.png'
      }
    };

    // Send to all devices (you can filter later)
    return admin.messaging().sendToTopic('chatme', payload);
  });