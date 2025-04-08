// useLocation.ts
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [subregion, setSubregion] = useState("");

  const getUserLocation = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão para acessar localização não foi concedida.");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      
      if (coords) {
        setLatitude(coords.latitude.toString());
        setLongitude(coords.longitude.toString());

        let response = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        if (response.length > 0) {
          const locationInfo = response[0];
          setSubregion(locationInfo.subregion || "");
        }

      }
    } catch (error) {
      setErrorMsg("Erro ao obter localização");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return { latitude, longitude, subregion, errorMsg, refreshLocation: getUserLocation };
};

export default useLocation;
