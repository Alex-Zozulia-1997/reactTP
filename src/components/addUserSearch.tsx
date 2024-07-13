import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState } from 'react';
import useUserStore from '../lib/userStore';

export default function AddUserSearch() {
  const { currentUser } = useUserStore();
  const [neededUser, setNeededUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault(); // Corrected the typo here
    const formData = new FormData(e.target);
    const username = formData.get('username');
    console.log('add user');
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setNeededUser(querySnapShot.docs[0].data());
      }
      console.log('you searched for: ' + neededUser);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdd = async () => {
    const chatRef = collection(db, 'chats');
    const userChatRef = collection(db, 'userchats');

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userChatRef, neededUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          recieverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          recieverId: neededUser.id,
          updatedAt: Date.now(),
        }),
      });

      console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-user-search">
      <div className="input">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="search" name="username" />
          <button type="submit" id="submit">
            Search
          </button>
        </form>
        <div className="search-user-info">
          <div className="search-info">
            <img src={neededUser?.avatar || 'src/assets/avatar.png'} alt="" />
            <span>{neededUser?.username}</span>
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
