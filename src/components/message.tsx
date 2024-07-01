function Message({
  own = false,
  message = 'Hello, World!',
  name = 'current chatter',
}) {
  if (own) {
    return (
      <div className="left">
        <div className="message" id="own">
          <div className="conversator">
            <span>12:34</span>
          </div>
          <div className="text">
            <p>
              {message}
              <img src="/src/assets/avatar.png" alt="sent" />
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="right">
        <div className="message">
          <div className="conversator">
            <img src="/src/assets/avatar.png" alt="user" />
            {/* <p>{name}</p> */}
            <span>12:23</span>
          </div>
          <div className="text">
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Message;
