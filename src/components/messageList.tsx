import UserInfo from './userInfo';
import ChatList from './chatList';
function Conversations() {
  return (
    <div className="dialogues">
      <h1>Conversations</h1>
      <UserInfo />
      <ChatList />
    </div>
  );
}

export default Conversations;
