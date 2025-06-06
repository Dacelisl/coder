import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.js';

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
          }),
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
