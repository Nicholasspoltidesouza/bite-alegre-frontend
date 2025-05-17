// hooks/useAuthApi.ts
import { useState } from "react";
import ApiService from "../services/apiService";
import { AuthDTO, UserDTO } from "../@types/DTO";
import { useAuthContext } from "../contexts/authContext";

const authApiService = new ApiService("/auth");

export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthData } = useAuthContext();

  const login = async (credentials: UserDTO) => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await authApiService.post<UserDTO, AuthDTO>(credentials, `/login`);

      if (responseData) {
        const { token, role, user } = responseData;

        await setAuthData(token, role, { id: user.id, email: user.email });

        console.log("Login bem-sucedido:", responseData);
      }

    } catch (err: any) {
      const errorMessage = err.message || "Erro desconhecido ao tentar autenticar.";
      console.error("Erro na chamada de autenticação:", errorMessage, err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
