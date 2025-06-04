import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'JosefinSans-Regular': require('../../assets/fonts/JosefinSans-Regular.ttf'),
    'Lobster-Regular': require('../../assets/fonts/Lobster-Regular.ttf'),
  });
};
