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
      setData(responseData);
    }
    return responseData;
  };

  const getUserById = async (userId: string): Promise<UserDTO | null> => {
    const responseData = await callApi(
      userApiService.get<UserDTO>(`/${userId}`),
    );

    if (responseData) {
      setData(responseData);
    }
    return responseData;
  };

  const getUserPreferences = async (userId: string): Promise<string[] | null> => {
    const responseData = await callApi(
      userApiService.get<any[]>(`/../user_preferences/${userId}`)
    );
    if (responseData && Array.isArray(responseData)) {
      return responseData.map(pref => pref.tag_id);
    }
    return null;
  };

  const updateUser = async (userData: Partial<UserDTO>): Promise<UserDTO | null> => {
    const responseData = await callApi(
      userApiService.patch<Partial<UserDTO>, UserDTO>(userData)
    );
    if (responseData && (responseData as any).data) {
      setData((responseData as any).data);
      return (responseData as any).data;
    }
    return null;
  };

  return { createUser, getUserById, getUserPreferences, updateUser, loading, error, data };
};
