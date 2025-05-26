import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL_ANDROID, API_URL_AWS, API_URL_BACKEND } from '../constants/apiUrl';
import { router } from 'expo-router';

export interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export function redirectToHome() {
  router.replace('/screens/Home');
}

class ApiService {
    private baseUrl: string;
    private API_URL = API_URL_AWS; 

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error(
        'A URL base do endpoint deve ser fornecida ao ApiService.',
      );
    }
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string | undefined,
    options: RequestInit,
  ): Promise<T> {
    if (endpoint == undefined) endpoint = '';
    const url = `${this.API_URL}${this.baseUrl}${endpoint}`;
    const token = await AsyncStorage.getItem('token');

    const method = options.method;

    const noAuthEndpoints = [
      { method: 'POST', path: '/login' },
      { method: 'POST', path: '/users' },
      { method: 'POST', path: '/restaurants' },
    ];

    const shouldSkipAuth = noAuthEndpoints.some(
      (item) => item.method === method && endpoint.startsWith(item.path),
    );

    const baseHeaders: HeadersInit = { 'Content-Type': 'application/json' };
    if (!shouldSkipAuth) {
      baseHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: baseHeaders,
    };

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();

      if (response.ok) {
        return responseData as T;
      } else {
        if (response.status === 401) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('role');
          await AsyncStorage.removeItem('user');
          redirectToHome();
          throw new Error('Sessão expirada. Faça login novamente.');
        }
        const errorPayload = responseData as ApiErrorResponse;
        throw new Error(
          errorPayload.error ||
            errorPayload.message ||
            `Falha na requisição para ${endpoint}. Status: ${response.status}`,
        );
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        `Erro de rede ou resposta inválida ao acessar ${endpoint}: ${error.toString()}`,
      );
    }
  }

  public get<T>(endpoint?: string): Promise<T> {
    const optionsForRequest: RequestInit = {
      method: 'GET',
    };
    return this.request<T>(endpoint, optionsForRequest);
  }

  public post<RequestBody, ResponseBody>(
    data: RequestBody,
    endpoint?: string,
  ): Promise<ResponseBody> {
    const optionsForRequest: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    return this.request<ResponseBody>(endpoint, optionsForRequest);
  }
  
    public patch<RequestBody, ResponseBody>(
    data: RequestBody,
    endpoint?: string
    ): Promise<ResponseBody> {
    const optionsForRequest: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify(data),
    };
    return this.request<ResponseBody>(endpoint, optionsForRequest);
    }
}

export default ApiService;
