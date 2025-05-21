import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  MediaResponse,
  pickImageFromGallery,
  takePhoto,
  uploadMedia,
  getUserMedia,
  getRestaurantMedia,
  getPostMedia,
  deleteMedia
} from '../utils/s3';

export interface UseMediaApiResult {
  // Estado
  isLoading: boolean;
  error: string | null;
  medias: MediaResponse[];

  // Funções para selecionar mídia
  selectImageFromGallery: () => Promise<ImagePicker.ImagePickerAsset | null>;
  captureImageWithCamera: () => Promise<ImagePicker.ImagePickerAsset | null>;
  
  // Funções de upload
  uploadUserMedia: (file: ImagePicker.ImagePickerAsset, userId: string) => Promise<MediaResponse | null>;
  uploadRestaurantMedia: (file: ImagePicker.ImagePickerAsset, restaurantId: string) => Promise<MediaResponse | null>;
  uploadPostMedia: (file: ImagePicker.ImagePickerAsset, postId: string) => Promise<MediaResponse | null>;
  uploadReviewMedia: (file: ImagePicker.ImagePickerAsset, reviewId: string) => Promise<MediaResponse | null>;
  
  // Funções para buscar mídia
  fetchUserMedias: (userId: string) => Promise<MediaResponse[]>;
  fetchRestaurantMedias: (restaurantId: string) => Promise<MediaResponse[]>;
  fetchPostMedias: (postId: string) => Promise<MediaResponse[]>;
  
  // Função para excluir mídia
  removeMedia: (mediaId: string) => Promise<boolean>;
  
  // Limpar estados
  clearError: () => void;
  clearMedias: () => void;
}

export const useMediaApi = (): UseMediaApiResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [medias, setMedias] = useState<MediaResponse[]>([]);

  // Selecionar imagem da galeria
  const selectImageFromGallery = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    try {
      return await pickImageFromGallery();
    } catch (err) {
      setError('Erro ao selecionar imagem da galeria');
      return null;
    }
  };

  // Capturar imagem com a câmera
  const captureImageWithCamera = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    try {
      return await takePhoto();
    } catch (err) {
      setError('Erro ao capturar imagem com a câmera');
      return null;
    }
  };

  // Upload de mídia de usuário
  const uploadUserMedia = async (
    file: ImagePicker.ImagePickerAsset,
    userId: string
  ): Promise<MediaResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await uploadMedia(file, 'profile', userId);
      if (response) {
        setMedias((prevMedias) => [...prevMedias, response]);
      }
      return response;
    } catch (err) {
      setError('Erro ao fazer upload de mídia do usuário');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload de mídia de restaurante
  const uploadRestaurantMedia = async (
    file: ImagePicker.ImagePickerAsset,
    restaurantId: string
  ): Promise<MediaResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await uploadMedia(file, 'restaurant', restaurantId);
      if (response) {
        setMedias((prevMedias) => [...prevMedias, response]);
      }
      return response;
    } catch (err) {
      setError('Erro ao fazer upload de mídia do restaurante');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload de mídia de post
  const uploadPostMedia = async (
    file: ImagePicker.ImagePickerAsset,
    postId: string
  ): Promise<MediaResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await uploadMedia(file, 'post', postId);
      if (response) {
        setMedias((prevMedias) => [...prevMedias, response]);
      }
      return response;
    } catch (err) {
      setError('Erro ao fazer upload de mídia do post');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload de mídia de review
  const uploadReviewMedia = async (
    file: ImagePicker.ImagePickerAsset,
    reviewId: string
  ): Promise<MediaResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await uploadMedia(file, 'review', reviewId);
      if (response) {
        setMedias((prevMedias) => [...prevMedias, response]);
      }
      return response;
    } catch (err) {
      setError('Erro ao fazer upload de mídia da review');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar mídias de um usuário
  const fetchUserMedias = async (userId: string): Promise<MediaResponse[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getUserMedia(userId);
      setMedias(response);
      return response;
    } catch (err) {
      setError('Erro ao buscar mídias do usuário');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar mídias de um restaurante
  const fetchRestaurantMedias = async (restaurantId: string): Promise<MediaResponse[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getRestaurantMedia(restaurantId);
      setMedias(response);
      return response;
    } catch (err) {
      setError('Erro ao buscar mídias do restaurante');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar mídias de um post
  const fetchPostMedias = async (postId: string): Promise<MediaResponse[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getPostMedia(postId);
      setMedias(response);
      return response;
    } catch (err) {
      setError('Erro ao buscar mídias do post');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Excluir mídia
  const removeMedia = async (mediaId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await deleteMedia(mediaId);
      if (success) {
        setMedias((prevMedias) => prevMedias.filter((media) => media.id !== mediaId));
      }
      return success;
    } catch (err) {
      setError('Erro ao excluir mídia');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Limpar erro
  const clearError = () => setError(null);

  // Limpar mídias
  const clearMedias = () => setMedias([]);

  return {
    isLoading,
    error,
    medias,
    selectImageFromGallery,
    captureImageWithCamera,
    uploadUserMedia,
    uploadRestaurantMedia,
    uploadPostMedia,
    uploadReviewMedia,
    fetchUserMedias,
    fetchRestaurantMedias,
    fetchPostMedias,
    removeMedia,
    clearError,
    clearMedias
  };
};