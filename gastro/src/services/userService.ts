export interface UserDTO {
    profilePhoto?: string;
    name: string;
    nickname: string;
    email: string;
    password: string;
    phone: string;
    gender: string | null;
    birthDate?: string;
}
  
const API_URL = 'http://localhost:3000/api/users'; // Substitua pelo URL correto do seu back-end
  
export const createUser = async (userData: UserDTO): Promise<void> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

    if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao criar usuário.');
    }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};