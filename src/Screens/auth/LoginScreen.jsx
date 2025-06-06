import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { loginUser } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { COLORS } from '../../theme/colors';
import AlertModal from '../../components/AlertModal';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setModalVisible(true);
      return;
    }
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };
      dispatch(setUser(user));
      navigation.navigate('Shop');
    } catch (error) {
      console.error('Login error:', error.message);
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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        type="warning"
        title="Datos faltantes"
        message="Por favor, completa todos los campos requeridos antes de continuar."
        buttonLabel="Entendido"
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
