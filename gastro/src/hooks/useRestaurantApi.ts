import { useState } from 'react';
import { CheckinDTO, RestaurantDTO, RestaurantPatchDTO, ReviewDTO, MenuItemsDTO } from '../@types/DTO';
import ApiService from '../services/apiService';

export const useRestaurantApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<
        RestaurantDTO | CheckinDTO | ReviewDTO | null
    >(null);
    const restaurantApiService = new ApiService('/restaurants');

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

    const getRestaurantById = async (restaurantId: string): Promise<RestaurantDTO> => {
        const responseData = await callApi(
            restaurantApiService.get<RestaurantDTO>(`/${restaurantId}`),
        );
        if (responseData) {
            setData(responseData);
        }
        return responseData!;
    };

    const getRandomRestaurant = async (
        tag: string,
        price_range: number
    ): Promise<RestaurantDTO | null> => {
        const query = `/random-draw?tags=${tag}&price_range=${price_range}`;

        const responseData = await callApi(
            restaurantApiService.get<RestaurantDTO>(query)
        );

        if (responseData) {
            setData(responseData);
        }

        return responseData;
    };

    const createRestaurant = async (
        newRestaurantData: RestaurantDTO,
    ): Promise<RestaurantDTO | null> => {
        const responseData = await callApi(
            restaurantApiService.post<RestaurantDTO, RestaurantDTO>(
                newRestaurantData,
            ),
        );

        if (responseData) {
            setData(responseData);
        }
        return responseData;
    };

    const createCheckin = async (checkinData: CheckinDTO): Promise<void> => {
        const responseData = await callApi(
            restaurantApiService.post<CheckinDTO, CheckinDTO>(
                checkinData,
                `/${checkinData.restaurant_id}/checkin`,
            ),
        );

        if (responseData) {
            console.log('Checkin criado:', responseData);
            setData(responseData);
        }
    };

    const createReview = async (reviewData: ReviewDTO): Promise<void> => {
        const responseData = await callApi(
            restaurantApiService.post<ReviewDTO, ReviewDTO>(
                reviewData,
                `/${reviewData.restaurant_id}/review`,
            ),
        );

        if (responseData) {
            console.log('Review criada:', responseData);
            setData(responseData);
        }
    };

    const patchRestaurant = async (patchData: RestaurantPatchDTO): Promise<RestaurantDTO | null> => {
        const responseData = await callApi(
            restaurantApiService.patch<RestaurantPatchDTO, RestaurantDTO>(
                patchData,
                `/${patchData.id}`
            )
        );

        if (responseData) {
            setData(responseData);
        }
        return responseData;
    };

    const deleteDish = async (itemId: string): Promise<void> => {
        await callApi(
            restaurantApiService.delete(`/menu-items/${itemId}`)
        );
    };


    return {
        patchRestaurant,
        createRestaurant,
        getRestaurantById,
        getRandomRestaurant,
        createCheckin,
        createReview,
        deleteDish,
        loading,
        error,
        data,
    };
};
