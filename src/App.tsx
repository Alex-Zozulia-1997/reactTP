import './App.css';
import Chat from './components/conversation';
import Conversations from './components/messageList';
import Details from './components/details';
import Login from './components/login';
import Notification from './components/notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import useUserStore from './lib/userStore';
import useChatStore from './lib/chatStore';

function App() {
  const { currentUser, isLoading, fetchUserInformation } = useUserStore();
  const { chatId } = useChatStore();
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      fetchUserInformation(user?.uid);
    });
    return () => {
      onSub();
    };
  }, [fetchUserInformation]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      <div className="mainscreen">
        {currentUser ? (
          <>
            <Conversations />
            {chatId && <Chat />}
            {chatId && <Details />}
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
