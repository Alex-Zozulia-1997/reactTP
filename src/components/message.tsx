function Message({
  own = false,
  message = '',
  name = 'current chatter',
  img = '',
  time = '12:00',
}) {
  if (own) {
    return (
      <div className="left">
        <div className="message" id="own">
          <div className="conversator">
            <p>{name}</p>
            <span>{time}</span>
          </div>

          <div className="text">
            <p>{message}</p>
          </div>
          {img && <img src={img} alt="sent" />}
        </div>
      </div>
    );
  } else {
    return (
      <div className="right">
        <div style={{ maxWidth: '70%' }} className="message">
          <div className="conversator">
            <p>{name}</p>
            <span>{time}</span>
          </div>
          <div className="text">
            <p>{message}</p>
          </div>
          {img && <img src={img} alt="sent" />}
        </div>
      </div>
    );
  }
}
export default Message;
