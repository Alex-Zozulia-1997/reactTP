// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbK0gmcIdrn3MmVZ3cFaVUeEAyx3r_jP0',
  authDomain: 'chat-d4f5b.firebaseapp.com',
  projectId: 'chat-d4f5b',
  storageBucket: 'chat-d4f5b.appspot.com',
  messagingSenderId: '285127429152',
  appId: '1:285127429152:web:60de5c1fd7a0e95a1d4045',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
