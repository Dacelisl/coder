import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { loadFonts } from './src/theme/fonts.js';
import DrawerNavigator from './src/navigation/DrawerNavigator.jsx';

import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';
import { SQLiteProvider } from 'expo-sqlite';
import AppInitializer from './src/components/AppInitializer';

export const initializedDB = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        uid TEXT NOT NULL
      )
    `);
    console.log('base de datos inicializada');
  } catch (error) {
    console.log('error en la base de datos ', error);
  }
};
export default function App() {
  useEffect(() => {
    const loadAllFonts = async () => {
      await loadFonts();
    };
    loadAllFonts();
  }, []);

  return (
    <SQLiteProvider databaseName="sessions-app" onInit={initializedDB}>
      <Provider store={store}>
        <AppInitializer />
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </SQLiteProvider>
  );
}
