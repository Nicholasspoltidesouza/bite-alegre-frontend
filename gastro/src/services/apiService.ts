import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL_ANDROID, API_URL_AWS, API_URL_BACKEND } from '../constants/apiUrl';
import { router } from 'expo-router';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export function redirectToHome() {
  router.replace('/Home');
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  private API_URL = API_URL_AWS;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error(
        'A URL base do endpoint deve ser fornecida ao ApiService.',
      );
    }
    this.baseUrl = baseUrl;
    
    // Configurar instância do axios
    this.axiosInstance = axios.create({
      baseURL: `${this.API_URL}${this.baseUrl}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token automaticamente
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        const method = config.method?.toUpperCase();
        const url = config.url || '';

        const noAuthEndpoints = [
          { method: 'POST', path: '/login' },
          { method: 'POST', path: '/users' },
          { method: 'POST', path: '/restaurants' },
        ];

        const shouldSkipAuth = noAuthEndpoints.some(
          (item) => item.method === method && url.startsWith(item.path),
        );

        if (!shouldSkipAuth && token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para tratar respostas e erros
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('role');
          await AsyncStorage.removeItem('user');
          redirectToHome();
          throw new Error('Sessão expirada. Faça login novamente.');
        }

        const errorMessage = 
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Erro desconhecido na requisição';

        throw new Error(errorMessage);
      }
    );
  }

  public async get<T>(endpoint?: string): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint || '');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async post<RequestBody, ResponseBody>(
    data: RequestBody,
    endpoint?: string,
  ): Promise<ResponseBody> {
    try {
      const response = await this.axiosInstance.post<ResponseBody>(endpoint || '', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  public async patch<RequestBody, ResponseBody>(
    data: RequestBody,
    endpoint?: string
  ): Promise<ResponseBody> {
    try {
      const response = await this.axiosInstance.patch<ResponseBody>(endpoint || '', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async put<RequestBody, ResponseBody>(
    data: RequestBody,
    endpoint?: string
  ): Promise<ResponseBody> {
    try {
      const response = await this.axiosInstance.put<ResponseBody>(endpoint || '', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async delete<T>(endpoint?: string): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint || '');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
