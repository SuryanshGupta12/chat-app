const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendChatNotification = functions.database
  .ref("/messages/{pushId}")
  .onCreate((snapshot) => {
    const msg = snapshot.val();
    const payload = {
      notification: {
        title: "ChatMe",
        body: `${msg.username}: ${msg.text}`,
        icon: "/logo192.png",
      },
    };
    return admin.messaging().sendToTopic("chatme", payload);
  });