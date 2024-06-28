import ChatLisItem from './chatListItem';
function ChatList() {
  return (
    <div>
      <h2 className="chat">ChatLIst</h2>
      <div className="search">
        <img src="/src/assets/search.svg" alt="search" />

        <input type="text" placeholder="Search" />
        <img src="/src/assets/plus.svg" alt="plus" />
      </div>
      {/* <ChatLisItem /> */}
    </div>
  );
}
export default ChatList;
