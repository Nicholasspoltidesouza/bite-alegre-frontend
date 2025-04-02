import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    

    useEffect(() => {
        const getUserLocation = async () => {
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
                        longitude: coords.longitude
                    });

                    console.log("Localização do usuário:", response);
                    console.log("LONGITUDE E LATITUDE ",longitude, latitude)
                }
            } catch (error) {
                setErrorMsg("Erro ao obter localização");
                console.error(error);
            }
        };

        getUserLocation();
    }, []);

    return { latitude, longitude, errorMsg };
};

export default useLocation;
