import { useState, useEffect } from 'react';
import ChatListItem from './chatListItem';
import AddUserSearch from './addUserSearch';
import useUserStore from '../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useChatStore from '../lib/chatStore';

function ChatList() {
  const [chats, setChats] = useState([]);
  const [addChat, setAddChat] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const [input, setInput] = useState('');

  const handleClick = async (chat) => {
    console.log(chat);
    changeChat(chat.chatId, chat.user);

    if (chat.messages.length) {
      const lastMessageIndex = chat.messages.length - 1;
      const lastMessage = chat.messages[lastMessageIndex];
      if (!lastMessage.seen) {
        console.log('updating');
        const chatRef = doc(db, 'chats', chat.chatId);

        // Create a new array with the updated last message
        const updatedMessages = chat.messages.map((msg, index) =>
          index === lastMessageIndex ? { ...msg, seen: true } : msg
        );

        await updateDoc(chatRef, {
          messages: updatedMessages,
        });
      }
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const chatData = await Promise.all(
          items.map(async (item) => {
            const chatDocRef = doc(db, 'chats', item.chatId);
            const chatDocSnap = await getDoc(chatDocRef);
            const chatC = chatDocSnap.data();
            const userDocRef = doc(db, 'users', item.recieverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();

            return { ...chatC, ...item, user };
          })
        );
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));

        // Set up listeners for each chat to ensure real-time updates
        chatData.forEach((chat) => {
          const chatDocRef = doc(db, 'chats', chat.chatId);
          onSnapshot(chatDocRef, (docSnap) => {
            const updatedChat = docSnap.data();
            setChats((prevChats) =>
              prevChats.map((c) =>
                c.chatId === chat.chatId ? { ...c, ...updatedChat } : c
              )
            );
          });
        });
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser]);

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="list">
      <div className="search">
        <img src="/src/assets/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <img
          src={!addChat ? '/src/assets/plus.svg' : '/src/assets/minus.svg'}
          alt="plus"
          onClick={() => setAddChat(!addChat)}
        />
      </div>
      {chats.length > 0 && (
        <div className="contlist">
          {filteredChats.map((chat) => (
            <ChatListItem
              whenClicked={() => handleClick(chat)}
              key={chat.chatId}
              Name={chat.user.username}
              Message={
                chat.messages.length
                  ? chat.messages[chat.messages.length - 1].message
                  : ''
              }
              Avatar={chat.user.avatar || '/src/assets/avatar.png'}
              seen={
                chat.messages.length
                  ? chat.messages[chat.messages.length - 1].seen
                  : false
              }
            />
          ))}
        </div>
      )}
      {addChat && <AddUserSearch />}
    </div>
  );
}

export default ChatList;
