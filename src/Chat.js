import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase';

function Chat({ user }) {
  const [message, setMessage] = useState('');
  const messagesRef = ref(db, 'messages');
  const [messages] = useObjectVal(messagesRef); // Real-time hook

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
    <div>
      <h2>Chat Room</h2>
      <button onClick={() => signOut(auth)}>Logout</button>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages &&
          Object.values(messages).sort((a, b) => a.timestamp - b.timestamp).map((msg, idx) => (
            <p key={idx}><strong>{msg.username}:</strong> {msg.text}</p>
          ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;