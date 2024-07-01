function UserInfo({
  chatter = false,
  name = 'big boy',
  avatar = 'src/assets/avatar.png',
}) {
  return (
    <div id="user-block">
      <div id="user-info">
        <img src={avatar} alt="avatar" />

        {!chatter ? (
          <h3>{name}</h3>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <h3 style={{ margin: 0 }}>{name}</h3>{' '}
            <p style={{ margin: 0, fontSize: '14px' }}>last seen 2 hours ago</p>{' '}
          </div>
        )}
      </div>
      <div id="icons">
        {chatter ? (
          <>
            <img src="/src/assets/info.svg" alt="info" />
            <img src="/src/assets/call.svg" alt="call" />
            <img src="/src/assets/video.svg" alt="video" />
          </>
        ) : (
          <>
            <img src="/src/assets/more.svg" alt="more" />
            <img src="/src/assets/edit.png" alt="edit" />
            <img src="/src/assets/video.svg" alt="video" />
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
