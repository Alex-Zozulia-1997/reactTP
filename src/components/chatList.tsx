import { useState } from 'react';
import ChatListItem from './chatListItem';
import AddUserSearch from './addUserSearch';
function ChatList() {
  const [addChat, setAddChat] = useState(false);
  return (
    <div className="list">
      <div className="search">
        <img src="/src/assets/search.svg" alt="search" />

        <input type="text" placeholder="Search" />
        <img
          src={!addChat ? '/src/assets/plus.svg' : '/src/assets/minus.svg'}
          alt="plus"
          onClick={() => setAddChat(!addChat)}
        />
      </div>
      <div className="contlist">
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />{' '}
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
        <ChatListItem
          Name="Betty"
          Message="hello"
          Avatar="/src/assets/avatar.png"
        />
      </div>
      {addChat && <AddUserSearch />}
    </div>
  );
}
export default ChatList;
