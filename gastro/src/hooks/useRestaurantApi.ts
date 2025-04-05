import { useState } from "react";
import { RestaurantDTO} from "../@types/DTO";
import { API_URL_BACKEND } from "../constants/apiUrl"; //cria apiUrl

export const useCreateRestaurant = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const createRestaurant = async (restaurantData: RestaurantDTO): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch (`${API_URL_BACKEND}/restaurants`, {
                method: "POST",
                headers: {
                    "Contend-Type": "application/json",
                },
                body: JSON.stringify(restaurantData),
            });
            const responseData = await response.json();

            if(response.ok) {
                console.log("Usuário criado:", responseData);
                setData(responseData);
            } else {
                throw new Error(
                    responseData.error ||
                    responseData.message ||
                    `Falha ao criar restaurante. Status: ${response.status}`,
                );
            }
        } catch (err: any) {
            console.error("Erro ao criar restaurante:", err);
            setError(err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return { createRestaurant, loading, error, data };
};