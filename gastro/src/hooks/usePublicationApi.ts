import { useState } from 'react';
import { PublicationDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

export const usePublicationApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PublicationDTO | null>(null);
    const publicationApiService = new ApiService("/post");

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


    const createPublication = async (newPublicationData: PublicationDTO): Promise<PublicationDTO | null> => {
        const responseData = await callApi(
            publicationApiService.post<PublicationDTO, PublicationDTO>(newPublicationData)
        );
        
        if (responseData) {
            setData(responseData);
        }
        return responseData;
    };

    return {
        createPublication,
        loading,
        error,
        data,
    };
}