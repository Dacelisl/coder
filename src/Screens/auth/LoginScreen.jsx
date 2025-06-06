import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { loginUser } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { COLORS } from '../../theme/colors';
import AlertModal from '../../components/AlertModal';
import { useSQLiteContext } from 'expo-sqlite';
import { persistUserSession, loadPersistedSession } from '../../services/sessionService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({ visible: false, title: '', message: '', type: 'info' });

  const db = useSQLiteContext();
  const dispatch = useDispatch();

  const showAlert = (title, message, type = 'warning') => {
    setModal({ visible: true, title, message, type });
  };
  const closeAlert = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await loadPersistedSession(db);
        if (result?.email) {
          dispatch(setUser({ uid: result.uid, email: result.email }));
        }
      } catch (err) {
        console.log('Error al recuperar sesión:', err);
      }
    })();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      return showAlert('Datos faltantes', 'Por favor, completa todos los campos.');
    }
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      const user = { uid: result.user.uid, email: result.user.email };
      await persistUserSession(db, user);
      dispatch(setUser(user));
      navigation.reset({ index: 0, routes: [{ name: 'Shop' }] });
    } catch (error) {
      console.error('Login error:', error.message);
      showAlert('Error de autenticación', 'Correo o contraseña incorrectos.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleLogin} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Ingresando...' : 'Ingresar'}</Text>
      </Pressable>
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Text>

      <AlertModal
        visible={modal.visible}
        onClose={closeAlert}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: COLORS.surface },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 6 },
  buttonText: { color: COLORS.textOnPrimary, textAlign: 'center', fontWeight: 'bold' },
  link: { color: COLORS.primary, textAlign: 'center', marginTop: 16 },
});
