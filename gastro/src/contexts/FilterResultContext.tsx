import React, { createContext, useContext, useState } from 'react';
import { RestaurantDTO } from '../@types/DTO';

interface FilterResultContextProps {
  restaurants: RestaurantDTO[];
  setRestaurants: (restaurants: RestaurantDTO[]) => void;
}

const FilterResultContext = createContext<FilterResultContextProps>({
  restaurants: [],
  setRestaurants: () => {},
});

export const FilterResultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [restaurants, setRestaurants] = useState<RestaurantDTO[]>([]);
  return (
    <FilterResultContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </FilterResultContext.Provider>
  );
};

export const useFilterResult = () => useContext(FilterResultContext);
