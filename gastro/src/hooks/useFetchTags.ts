import { useEffect, useState } from 'react';
import ApiService from '../services/apiService';

interface TagItem {
  id: string;
  name: string;
  type: 'LOCAL' | 'CATEGORIA' | 'OCASIAO';
}

export const useFetchTags = () => {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tagsApiService = new ApiService('/tags');

  const callApi = async <T>(callApiPromise: Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await callApiPromise;
      return result;
    } catch (err: any) {
      setError(err.message || 'Erro ao executar a chamada da API.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTags = async (): Promise<void> => {
    const responseData = await callApi(tagsApiService.get<TagItem[]>());

    if (responseData) {
      setTags(responseData);
    }
  };

  return { getTags, tags, loading, error };
};
