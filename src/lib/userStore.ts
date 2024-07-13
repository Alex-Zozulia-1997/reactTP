import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInformation: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = docSnap.data();
        return set({ currentUser: user, isLoading: false });
      } else {
        return set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));

export default useUserStore;
