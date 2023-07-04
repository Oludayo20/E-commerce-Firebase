import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBXb0oOgcACKcofMOn-CMZpURUIA_5N7m0',
  authDomain: 'ecommerce-da59d.firebaseapp.com',
  projectId: 'ecommerce-da59d',
  storageBucket: 'ecommerce-da59d.appspot.com',
  messagingSenderId: '100034567669',
  appId: '1:100034567669:web:45393828bdc07ca8a614bc'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
