import './App.css';
import Chat from './components/conversation';
import Conversations from './components/messageList';
import Details from './components/details';

function App() {
  return (
    <>
      <div className="mainscreen">
        <Conversations />
        <Chat />
        <Details />
      </div>
    </>
  );
}

export default App;
