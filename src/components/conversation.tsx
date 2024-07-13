import UserInfo from './userInfo';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState, useRef } from 'react';
import Message from './message';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useChatStore from '../lib/chatStore';
import useUserStore from '../lib/userStore';
import { set } from 'firebase/database';
import upload from '../lib/upload';

function Chat() {
  const { chatId, user, isRecieverBlocked, isCurrentUserBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [openChat, setOpenChat] = useState(null);
  const [image, setImage] = useState({ file: null, url: '' });
  const [chat, setChat] = useState({ messages: [] });
  const [openEmoji, setOpenEmoji] = useState(false);
  const [messageInWriting, setMessageInWriting] = useState('');
  const endRef = useRef(null);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      console.log(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEmoji = (e) => {
    setMessageInWriting(messageInWriting + e.emoji);
  };

  const handleSend = async () => {
    if (!messageInWriting) return;
    let imageUrl = null;

    if (image.file) {
      imageUrl = await upload(image?.file);
    }

    try {
      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        messages: [
          ...chat?.messages,
          {
            message: messageInWriting,
            timestamp: Date.now(),
            sender: currentUser.id,
            seen: false,
            ...(imageUrl && { imageUrl: imageUrl }),
          },
        ],
      });
      setMessageInWriting(''); // Clear the input field after sending
    } catch (err) {
      console.error(err);
    }
    setImage({ file: null, url: '' });
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  useEffect(() => {
    const onSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data() || { messages: [] });
    });

    return () => {
      onSub();
    };
  }, [chatId]);

  return (
    <div className="chatscreen">
      <div className="top">
        <img src={user?.avatar || '/src/assets/avatar.png'} alt="avatar" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <h3 style={{ margin: 0 }}>{user?.username}</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>last seen 2 hours ago</p>
        </div>
        <div className="icons" id="icons">
          <img src="/src/assets/info.svg" alt="info" />
          <img src="/src/assets/call.svg" alt="call" />
          <img src="/src/assets/video.svg" alt="video" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.length > 0 ? (
          chat.messages.map((message, index) => (
            <Message
              key={index}
              own={message.sender === currentUser.id}
              message={message.message}
              name={message.sender === currentUser.id ? 'You' : 'Chatter'}
              img={message.imageUrl}
              time={message.timestamp}
            />
          ))
        ) : (
          <p>No messages yet.</p>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div id="icons">
          <img src="/src/assets/mic.svg" alt="mic" />
          <img src="/src/assets/attach.svg" alt="attach" />
          <label htmlFor="file">
            <img src="/src/assets/camera.svg" alt="camera" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={handleImage}
          />
          <div className="emoji">
            <img
              src="/src/assets/emoji.svg"
              alt="emoji"
              onClick={() => setOpenEmoji(!openEmoji)}
            />
            {openEmoji && (
              <div className="picker">
                <EmojiPicker onEmojiClick={handleEmoji} />
              </div>
            )}
          </div>
        </div>
        <input
          disabled={isRecieverBlocked || isCurrentUserBlocked}
          value={messageInWriting}
          type="text"
          placeholder={
            isRecieverBlocked || isCurrentUserBlocked
              ? 'You cannot send a message, as blocked you are'
              : 'Type a message'
          }
          onChange={(e) => setMessageInWriting(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
              setMessageInWriting(''); // Clear the input field after pressing Enter
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
