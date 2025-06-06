import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { COLORS } from '../../theme/colors';
import { registerUser } from '../../services/authService';
import { persistUserSession } from '../../services/sessionService';
import AlertModal from '../../components/AlertModal';
import { useSQLiteContext } from 'expo-sqlite';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  const db = useSQLiteContext();
  const dispatch = useDispatch();

  const showAlert = ({ type = 'info', title = '', message = '' }) => {
    setAlertData({ visible: true, type, title, message });
  };

  const closeAlert = () => {
    setAlertData((prev) => ({ ...prev, visible: false }));
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      return showAlert({
        type: 'warning',
        title: 'Campos incompletos',
        message: 'Por favor completa todos los campos antes de continuar.',
      });
    }

    if (!isEmailValid(email)) {
      return showAlert({
        type: 'warning',
        title: 'Correo inválido',
        message: 'Por favor ingresa un correo electrónico válido.',
      });
    }

    if (password.length < 6) {
      return showAlert({
        type: 'warning',
        title: 'Contraseña débil',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      });
    }

    if (password !== confirmPassword) {
      return showAlert({
        type: 'error',
        title: 'Las contraseñas no coinciden',
        message: 'Por favor asegúrate de que ambas contraseñas sean iguales.',
      });
    }

    setLoading(true);
    try {
      const result = await registerUser(email, password);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
      };
      await persistUserSession(db, user);
      dispatch(setUser(user));
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.reset({ index: 0, routes: [{ name: 'Shop' }] });
    } catch (error) {
      console.error('Register error:', error.message);
      showAlert({
        type: 'error',
        title: 'Error al registrar',
        message:
          error.code === 'auth/email-already-in-use'
            ? 'Este correo ya está registrado. Intenta iniciar sesión.'
            : 'Ocurrió un error al registrar. Intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Pressable onPress={handleRegister} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Crear cuenta'}</Text>
      </Pressable>
      <Text onPress={() => navigation.navigate('LoginStack')} style={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>

      <AlertModal
        visible={alertData.visible}
        onClose={closeAlert}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
      />
    </View>
  );
};

export default RegisterScreen;

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
