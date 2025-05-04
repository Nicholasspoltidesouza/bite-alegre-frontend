import { useState } from 'react';
import { UserDTO } from '../@types/DTO';
import { API_URL_BACKEND, API_URL_ANDROID} from '../constants/apiUrl';

export const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<UserDTO | null>(null);

    const createUser = async (userData: UserDTO): Promise<boolean> => {
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
                return true;
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
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getUserById = async (userId: string): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_URL_ANDROID}/users/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                setData(responseData);
            } else {
                throw new Error(
                    responseData.error ||
                    responseData.message ||
                    `Falha ao buscar usuário. Status: ${response.status}`
                );
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return { createUser, getUserById, loading, error, data };
};
