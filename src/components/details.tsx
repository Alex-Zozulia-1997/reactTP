import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import useUserStore from '../lib/userStore';
import useChatStore from '../lib/chatStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
function Details() {
  const { currentUser } = useUserStore();
  const {
    chatId,
    user,
    isRecieverBlocked,
    isCurrentUserBlocked,
    changeBlockStatus,
  } = useChatStore();
  const [showPics, setShowPics] = useState(false);
  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      console.log('Blocked');

      changeBlockStatus();
      console.log(isRecieverBlocked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="details">
      <div className="user-container">
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <img src="/src/assets/avatar.png" alt="" />
        )}

        <div className="user-info">
          <h2>{user?.username}</h2>
        </div>
      </div>
      <div className="options">
        <div className="option">
          <span>Chat Settings</span>
        </div>

        <div className="option">
          <span>Phone</span>
          <img src="src/assets/plus.svg" alt="" />
        </div>

        <div className="option">
          <span>Shared Pics</span>
          <img
            src="src/assets/plus.svg"
            alt=""
            onClick={() => setShowPics(!showPics)}
          />
          {showPics && (
            <div className="sharepics">
              <div className="pic">
                <img src="/src/assets/pic.png" alt="" />
                <div className="picinfo">
                  <span>20-02-24</span>
                  <img src="src/assets/download.svg" alt="" />{' '}
                </div>
              </div>
              <div className="pic">
                <img src="/src/assets/pic.png" alt="" />
                <div className="picinfo">
                  <span>20-02-24</span>
                  <img src="src/assets/download.svg" alt="" />{' '}
                </div>
              </div>
              <div className="pic">
                <img src="/src/assets/pic.png" alt="" />
                <div className="picinfo">
                  <span>20-02-24</span>
                  <img src="src/assets/download.svg" alt="" />{' '}
                </div>
              </div>
              <div className="pic">
                <img src="/src/assets/pic.png" alt="" />
                <div className="picinfo">
                  <span>20-02-24</span>
                  <img src="src/assets/download.svg" alt="" />{' '}
                </div>
              </div>
              <div className="pic">
                <img src="/src/assets/pic.png" alt="" />
                <span>photo_2024-12-05</span>
              </div>
              <div className="pic">
                <img src="/src/assets/pic.png" alt="" />
                <span>photo_2024-12-05</span>
              </div>
            </div>
          )}
        </div>

        <div className="option">
          <span>Shared Files</span>
          <img src="src/assets/plus.svg" alt="" />
        </div>
        <div
          className="buttons"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: '20px',
          }}>
          <button onClick={handleBlock}>
            {isCurrentUserBlocked
              ? 'You are Blocked!'
              : isRecieverBlocked
              ? 'Unblock'
              : 'Block'}
          </button>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
