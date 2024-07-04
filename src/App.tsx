import './App.css';
import Chat from './components/conversation';
import Conversations from './components/messageList';
import Details from './components/details';
import Login from './components/login';
import Notification from './components/notification';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
    return () => {
      onSub();
    };
  }, []);

  return (
    <>
      <div className="mainscreen">
        {user ? (
          <>
            <Conversations />
            <Chat />
            <Details />
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </>
  );
}

export default App;
