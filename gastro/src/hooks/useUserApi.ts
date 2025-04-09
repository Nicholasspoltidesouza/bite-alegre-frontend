import { useState } from "react";
import { UserDTO } from "../@types/DTO";
import { API_URL_ANDROID, API_URL_BACKEND } from "../constants/apiUrl";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createUser = async (userData: UserDTO): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL_ANDROID}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Usuário criado:", responseData);
        setData(responseData);
      } else {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Falha ao criar usuário. Status: ${response.status}`,
        );
      }
    } catch (err: any) {
      console.error("Erro ao criar usuário:", err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, data };
};
