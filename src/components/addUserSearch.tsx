export default function AddUserSearch() {
  return (
    <div className="add-user-search">
      <div className="input">
        <form action="">
          <input type="text" placeholder="search" />
          <button id="submit">Search</button>
        </form>
        <div className="serarch-user-info">
          <div className="search-info">
            <img src="src/assets/avatar.png" alt="" />
            <span>Username</span>
            <button>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
