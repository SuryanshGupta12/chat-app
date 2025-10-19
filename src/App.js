import React, { useState } from 'react';
import { auth } from './firebase';
import Auth from './Auth';
import Chat from './Chat';

function App() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {user ? <Chat user={user} /> : <Auth />}
    </div>
  );
}

export default App;