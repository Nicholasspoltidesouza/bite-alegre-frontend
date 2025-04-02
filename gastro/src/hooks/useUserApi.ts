import { UserDTO } from "../@types/DTO"; 

export const createUser = async (userData: UserDTO): Promise<any> => {
  try {
    const response = await fetch(API_URL_BACKEND + '/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Usuario criado:", responseData);
      return responseData; 
    } else {
      throw new Error(
        responseData.error ||
          responseData.message ||
          `Falha ao criar usuário. Status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error("Erro ao criar usuario:", error);
    throw error;
  }
};