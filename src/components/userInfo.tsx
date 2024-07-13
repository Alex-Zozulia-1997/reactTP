import useUserStore from '../lib/userStore';

function UserInfo({ name = 'big boy', avatar = 'src/assets/avatar.png' }) {
  const { currentUser } = useUserStore();

  return (
    <div id="user-block">
      <div id="user-info">
        <img src={currentUser.avatar || avatar} alt="avatar" />

        <h3>{currentUser.username}</h3>
      </div>
      <div id="icons">
        <>
          <img src="/src/assets/more.svg" alt="more" />
          <img src="/src/assets/edit.png" alt="edit" />
          <img src="/src/assets/video.svg" alt="video" />
        </>
      </div>
    </div>
  );
}

export default UserInfo;
