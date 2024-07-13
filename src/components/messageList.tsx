import UserInfo from './userInfo';
import ChatList from './chatList';
function Conversations() {
  return (
    <div className="dialogues">
      <UserInfo />
      <ChatList />
    </div>
  );
}

export default Conversations;
