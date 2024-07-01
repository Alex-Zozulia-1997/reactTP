import UserInfo from './userInfo';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState, useRef } from 'react';
import Message from './message';
function Chat() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [messageInWriting, setMessageInWriting] = useState('');
  console.log(messageInWriting);
  const handleEmoji = (e) => {
    console.log(e.emoji);
    setMessageInWriting(messageInWriting + e.emoji);
  };
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className="chatscreen">
      <div className="top">
        <UserInfo chatter={true} name="current chatter" />
      </div>
      <div className="center">
        <Message own={true} message="Hello, World!" />
        <Message message="Hello, World!" name="current chatter" />
        <Message own={true} message="Hello, World!" />
        <Message message="Hello, World!" name="current chatter" />
        <Message own={true} message="Hello, World!" />
        <Message message="Hello, World!" name="current chatter" />
        <Message own={true} message="Hello, World!" />
        <Message message="Hello, World!" name="current chatter" />
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div id="icons">
          <img src="/src/assets/mic.svg" alt="emoji" />
          <img src="/src/assets/attach.svg" alt="attach" />
          <img src="/src/assets/camera.svg" alt="camera" />
          <div className="emoji">
            <img
              src="/src/assets/emoji.svg"
              alt="emoji"
              onClick={() => setOpenEmoji(!openEmoji)}
            />
            <div className="picker">
              <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
            </div>
          </div>
        </div>
        <input
          value={messageInWriting}
          type="text"
          placeholder="Type a message"
          onChange={(e) => setMessageInWriting(e.target.value)}
        />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Chat;
