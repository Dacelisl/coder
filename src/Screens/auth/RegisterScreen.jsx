import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { COLORS } from '../../theme/colors';
import { registerUser } from '../../services/authService';
import AlertModal from '../../components/AlertModal';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!email || !password) {
      setModalVisible(true);
      return;
    }
    setLoading(true);
    try {
      const result = await registerUser(email, password);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };
      dispatch(setUser(user));
      navigation.navigate('Shop');
    } catch (error) {
      console.error('Register error:', error.message);
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
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleRegister} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Crear cuenta'}</Text>
      </Pressable>
      <Text onPress={() => navigation.navigate('LoginStack')} style={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
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
