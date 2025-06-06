import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { loadFonts } from './src/theme/fonts.js';
import DrawerNavigator from './src/navigation/DrawerNavigator.jsx';

import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';
import useAuthListener from './src/hooks/useAuthListener.js';

export default function App() {
  useEffect(() => {
    const loadAllFonts = async () => {
      useAuthListener();
      await loadFonts();
    };
    loadAllFonts();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecd6d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
