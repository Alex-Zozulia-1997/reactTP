import UserInfo from './userInfo';
import ChatList from './chatList';
function Conversations() {
  return (
    <div className="list">
      <h1>Conversations</h1>
      <UserInfo />
      <ChatList />
    </div>
  );
}

export default Conversations;
