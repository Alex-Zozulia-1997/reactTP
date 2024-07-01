import { useState } from 'react';
import { toast } from 'react-toastify';
export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });
  const handleAvatar = (e: any) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      console.log(avatar.url);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    toast.warn('hello');
    toast.success('hello');
    toast.error('hello');
  };
  return (
    <div className="login-page">
      <div className="login">
        <h1>Login</h1>
        <div className="input">
          <form onSubmit={handleLogin} action="">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button id="submit">Login</button>
          </form>
        </div>
      </div>
      <div className="create-user">
        <h1>Create User</h1>
        <div className="input">
          <form onSubmit={handleLogin} action="">
            <label htmlFor="file">
              <img
                src={avatar.url || '/src/assets/upload.svg'}
                alt="upload"
                style={{
                  filter: avatar.url ? 'none' : 'invert(1)',
                  cursor: 'pointer',
                }}
              />
              Upload an Image
            </label>
            <input type="text" placeholder="username" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />

            <input
              type="file"
              style={{ display: 'none' }}
              id="file"
              onChange={handleAvatar}
            />
            <button id="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
