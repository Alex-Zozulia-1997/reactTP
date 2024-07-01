import './App.css';
import Chat from './components/conversation';
import Conversations from './components/messageList';
import Details from './components/details';
import Login from './components/login';
import Notification from './components/notification';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(true);

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
