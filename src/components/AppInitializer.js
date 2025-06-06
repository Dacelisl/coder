// src/components/AppInitializer.js
import React from 'react';
import useAuthListener from '../hooks/useAuthListener';
import usePersistedAuth from '../hooks/usePersistedAuth';

const AppInitializer = () => {
  useAuthListener();
  usePersistedAuth();
  return null;
};

export default AppInitializer;
