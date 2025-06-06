import { logoutUser } from './authService';
import { logout } from '../redux/slices/authSlice';

export const persistUserSession = async (db, user) => {
  try {
    await db.runAsync('DELETE FROM sessions');
    await db.runAsync('INSERT INTO sessions(email, uid) VALUES (?, ?)', user.email, user.uid);
    console.log('Sesión persistida con éxito');
  } catch (error) {
    console.error('Error al guardar la sesión en SQLite:', error.message);
    throw error;
  }
};

export const loadPersistedSession = async (db) => {
  try {
    const result = await db.getFirstAsync('SELECT * FROM sessions');
    if (result && result.email && result.uid) {
      console.log('Sesión encontrada en SQLite:', result);
      return {
        email: result.email,
        uid: result.uid,
      };
    }
    return null;
  } catch (error) {
    console.error('Error al cargar la sesión desde SQLite:', error.message);
    return null;
  }
};

export const clearUserSession = async (db) => {
  try {
    await db.runAsync('DELETE FROM sessions');
    console.log('Sesión eliminada de SQLite');
  } catch (error) {
    console.error('Error al eliminar sesión de SQLite:', error.message);
  }
};

export const handleLogout = async (db, dispatch) => {
  try {
    await logoutUser();
    await clearUserSession(db);
    dispatch(logout());
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
