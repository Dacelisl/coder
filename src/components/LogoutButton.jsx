/* 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const LogoutButton = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.log('Error al cerrar sesión', err);
      });
  }, []);

  return null;
};

export default LogoutButton;
 */
