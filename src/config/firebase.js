import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDoE4djLxsUItvW6W2-Qm47vVJD7DEifcA',
  authDomain: 'codercommerce-3b298.firebaseapp.com',
  databaseURL: 'https://codercommerce-3b298-default-rtdb.firebaseio.com',
  projectId: 'codercommerce-3b298',
  storageBucket: 'codercommerce-3b298.firebasestorage.app',
  messagingSenderId: '407852051326',
  appId: '1:407852051326:web:b8daf36763105e7135e12f',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
