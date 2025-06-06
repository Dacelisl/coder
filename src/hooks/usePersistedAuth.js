import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { useSQLiteContext } from 'expo-sqlite';
import { loadPersistedSession } from '../services/sessionService';

const usePersistedAuth = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const session = await loadPersistedSession(db);
      if (session) {
        dispatch(setUser(session));
      }
    };
    restoreSession();
  }, []);
};

export default usePersistedAuth;
