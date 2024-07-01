function ChatListItem({
  Name = 'Betty Hopkins',
  Message = 'sup?',
  Avatar = '/src/assets/avatar.png',
}) {
  return (
    <div className="listitem">
      <img src={Avatar} alt="avatar" />
      <div className="message-sender">
        <span>{Name} </span>

        <span>{Message} </span>
      </div>
    </div>
  );
}

export default ChatListItem;
