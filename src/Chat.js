import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import { signOut } from 'firebase/auth';
import { getToken, onMessage } from 'firebase/messaging';
import { auth, db, messaging } from './firebase';

function Chat({ user }) {
  const [message, setMessage] = useState('');
  const messagesRef = ref(db, 'messages');
  const [messages] = useObjectVal(messagesRef);

  // Request permission and get token
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'BKyeqYXoevxeZi-C4XpfL-O94gkarOxJEUfb4IzfC4BITu4cdV2MIs7O_bMdR28ToNwg3uu6tsPu7AZDeYJCCjU' // ← Get this from Firebase Console
          });
          console.log('FCM Token:', token);
          // Optionally save token to DB under user
        }
      } catch (err) {
        console.error('Permission denied', err);
      }
    };

    requestPermission();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      new Notification('ChatMe', {
        body: payload.notification?.body || 'New message!',
        icon: '/logo192.png'
      });
    });

    return () => unsubscribe();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      push(messagesRef, {
        text: message,
        username: user.displayName,
        timestamp: Date.now(),
      });
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-teal-300">ChatMe Room</h2>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div className="h-80 overflow-y-auto bg-gray-900 p-4 rounded mb-4 space-y-2">
        {messages &&
          Object.values(messages)
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((msg, idx) => (
              <div
                key={idx}
                className="bg-gray-700 p-3 rounded-lg animate-slide-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <strong className="text-teal-300">{msg.username}:</strong> {msg.text}
              </div>
            ))}
      </div>
      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition animate-pulse"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;