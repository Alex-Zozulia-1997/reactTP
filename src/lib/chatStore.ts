import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import useUserStore from './userStore';

const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    if (!currentUser || !user) {
      return set({
        chatId: null,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }

    // Check if current user is blocked by the chat user
    if (user.blocked?.includes(currentUser.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }
    // Check if the chat user is blocked by the current user
    else if (currentUser.blocked?.includes(user.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    return set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlockStatus: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },

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

export default useChatStore;
