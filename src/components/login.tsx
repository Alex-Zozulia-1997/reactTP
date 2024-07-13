import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../lib/upload';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';

export default function Login() {
  const [loading, setLoading] = useState(false);

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
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);

    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const imageUrl = await upload(avatar.file);

      await setDoc(doc(db, 'users', response.user.uid), {
        username,
        email,
        id: response.user.uid,
        blocked: [],
        avatar: imageUrl,
      });

      await setDoc(doc(db, 'userchats', response.user.uid), {
        chats: [],
      });
      toast.success('User Created');
    } catch (err) {
      setLoading(true);
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-page">
      <div className="login">
        <h1>Login</h1>
        <div className="input">
          <form onSubmit={handleLogin} action="">
            <input type="text" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button id="submit" disabled={loading}>
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="create-user">
        <h1>Create User</h1>
        <div className="input">
          <form onSubmit={handleRegister} action="">
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
            <input type="text" placeholder="username" name="username" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />

            <input
              type="file"
              style={{ display: 'none' }}
              id="file"
              onChange={handleAvatar}
            />
            <button disabled={loading} id="submit">
              {loading ? 'Loading' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
