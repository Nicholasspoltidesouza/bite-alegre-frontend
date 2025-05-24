import { useState } from 'react';
import { UserDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

const userApiService = new ApiService('/users');

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<UserDTO | null>(null);

  const callApi = async <T>(callApiPromise: Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await callApiPromise;
      return result;
    } catch (err: any) {
      setError(
        err.message || 'Erro desconhecido ao executar a chamada da API.',
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: UserDTO): Promise<UserDTO | null> => {
    const responseData = await callApi(
      userApiService.post<UserDTO, UserDTO>(userData),
    );

    if (responseData) {
      console.log('Usuário criado:', responseData);
      setData(responseData);
    }
    return responseData;
  };

  const getUserById = async (userId: string): Promise<void> => {
    const responseData = await callApi(
      userApiService.get<UserDTO>(`/${userId}`),
    );

    if (responseData) {
      setData(responseData);
    }
  };

  const logout = () => {
    setData(null);
    setError(null);
    setLoading(false);
    console.log('Usuário deslogado com sucesso!');
  };

  return { createUser, getUserById, logout, loading, error, data };
};
