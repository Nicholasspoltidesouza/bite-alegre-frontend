import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL_ANDROID } from '../constants/apiUrl';

// Tipos para mídia
export interface MediaResponse {
  id: string;
  url: string;
  type: string;
  createdAt: string;
  userId?: string;
  restaurantId?: string;
  postId?: string;
}

// Função para selecionar imagem da galeria
export const pickImageFromGallery = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (!permissionResult.granted) {
    console.log('Permissão para acessar a biblioteca de mídia não concedida!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
    base64: true, // Garantir que retorne o base64
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0];
  }

  return null;
};

// Função para tirar uma foto com a câmera
export const takePhoto = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
  if (!permissionResult.granted) {
    console.log('Permissão para acessar a câmera não concedida!');
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
    base64: true, // Garantir que retorne o base64
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0];
  }

  return null;
};

// Função para obter base64 de um arquivo se ainda não estiver disponível
export const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
    throw new Error('Falha ao processar a imagem');
  }
};

// Função para enviar mídia para o backend (apenas base64)
export const uploadMedia = async (
  file: ImagePicker.ImagePickerAsset,
  type: 'post' | 'profile' | 'restaurant' | 'review',
  relatedId?: string
): Promise<MediaResponse | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Obter o base64 da imagem se não estiver disponível
    let base64Data = file.base64;
    if (!base64Data) {
      base64Data = await getBase64FromUri(file.uri);
    }

    // Preparando os metadados do arquivo
    const fileExtension = file.uri.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}.${fileExtension}`;
    const mimeType = file.type === 'video' 
      ? `video/${fileExtension}` 
      : `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

    // Enviando base64 para o backend
    const response = await fetch(`${API_URL_ANDROID}/media/upload-base64`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        base64: base64Data,
        fileName,
        fileType: mimeType,
        type,
        relatedId,
        width: file.width,
        height: file.height
      })
    });

    if (!response.ok) {
      throw new Error('Falha ao fazer upload da mídia');
    }

    const mediaResponse: MediaResponse = await response.json();
    return mediaResponse;
  } catch (error) {
    console.error('Erro ao fazer upload da mídia:', error);
    return null;
  }
};

// Função para obter as mídias de um usuário
export const getUserMedia = async (userId: string): Promise<MediaResponse[]> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL_ANDROID}/media/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao obter mídias do usuário');
    }

    const data: MediaResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar mídias do usuário:', error);
    return [];
  }
};

// Função para obter as mídias de um restaurante
export const getRestaurantMedia = async (restaurantId: string): Promise<MediaResponse[]> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL_ANDROID}/media/restaurant/${restaurantId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao obter mídias do restaurante');
    }

    const data: MediaResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar mídias do restaurante:', error);
    return [];
  }
};

// Função para obter as mídias de um post
export const getPostMedia = async (postId: string): Promise<MediaResponse[]> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL_ANDROID}/media/post/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao obter mídias do post');
    }

    const data: MediaResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar mídias do post:', error);
    return [];
  }
};

// Função para excluir uma mídia
export const deleteMedia = async (mediaId: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_URL_ANDROID}/media/${mediaId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao excluir mídia:', error);
    return false;
  }
};