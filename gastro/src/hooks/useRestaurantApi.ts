import { useState } from "react";

import { API_URL_BACKEND } from "../constants/apiUrl"; //cria apiUrl
import { RestaurantDTO } from "../@types/DTO";

export const useRestaurantApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RestaurantDTO | null>(null);

  const getRestaurant = async (restaurantId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL_BACKEND}restaurants/${restaurantId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao buscar restaurante. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

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

  return { createRestaurant, getRestaurant, loading, error, data };
};
