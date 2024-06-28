function UserInfo() {
  return (
    <div id="user-block">
      <div id="user-info">
        <img src="/src/assets/avatar.png" alt="avatar" />
        <h3>John Doe</h3>
      </div>

      <div id="icons">
        <img src="/src/assets/more.svg" alt="more" />
        <img src="/src/assets/edit.png" alt="edit" />
        {/* <img src="@assets/video.svg" alt="video" /> */}
        <img src="/src/assets/video.svg" alt="video" />
      </div>
    </div>
  );
}
export default UserInfo;
