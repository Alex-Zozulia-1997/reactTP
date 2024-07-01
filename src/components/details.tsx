import { useState } from 'react';
function Details({
  name = 'Current Chatter',
  status = 'While their companios slept, they toiled upward in the night',
}) {
  const [showPics, setShowPics] = useState(false);
  return (
    <div className="details">
      <div className="user-container">
        <img src="/src/assets/avatar.png" alt="avatar" />
        <div className="user-info">
          <h2>{name}</h2>
          <p>{status}</p>
        </div>
      </div>
      <div className="options">
        <div className="option">
          <span>Shat Settings</span>
          <img src="src/assets/plus.svg" alt="" />
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
          <button>Block</button>
          <button>Report</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
