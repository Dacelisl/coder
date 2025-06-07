import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useUserCity = () => {
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });

        if (place?.city) {
          setCity(place.city);
        } else if (place?.region) {
          setCity(place.region);
        } else {
          setCity('Ciudad desconocida');
        }
      } catch (err) {
        console.error('Error obteniendo la ciudad:', err);
        setErrorMsg('Error al obtener la ubicación');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { city, errorMsg, loading };
};
