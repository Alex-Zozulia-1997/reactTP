import { useEffect } from 'react';

function ChatListItem({
  Name = 'Betty Hopkins',
  Message = 'sup?',
  Avatar = '/src/assets/avatar.png',
  seen = true,
  whenClicked = () => {},
}) {
  const showMessage =
    Message.length > 20 ? Message.slice(0, 20) + '...' : Message;
  useEffect(() => {
    console.log('ChatListItem rendered');
  }, [seen, Name, Message, Avatar, whenClicked]);
  return (
    <div
      className="listitem"
      id={seen ? 'read' : 'unread'}
      onClick={whenClicked}>
      <img src={Avatar} alt="avatar" />
      <div className="message-sender">
        <span>{Name} </span>
        <span>{showMessage} </span>
      </div>
    </div>
  );
}

export default ChatListItem;
