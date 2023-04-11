import { useState } from "react";

import { addFavorite, removeCity, removeFavorite } from "reducers/citiesSlice";
import { useAppDispatch, useAppSelector } from "reducers/hooks";
import { isFavorite, getFavorites } from "utils";

const useCities = () => {
  const { savedCities, favoriteCityIds } = useAppSelector(
    (state) => state.cities
  );

  const [showDrawer, setShowDrawer] = useState(false);

  const dispatch = useAppDispatch();

  const favorites = getFavorites(savedCities, favoriteCityIds);

  const removeOneCity = (id: number) => dispatch(removeCity(id));
  const addOneFavorite = (id: number) => dispatch(addFavorite(id));
  const removeOneFavorite = (id: number) => dispatch(removeFavorite(id));

  const handleFavorite = (id: number, e: any) => {
    e.stopPropagation();
    !isFavorite(favoriteCityIds, id)
      ? addOneFavorite(id)
      : removeOneFavorite(id);
  };

  return {
    showDrawer,
    setShowDrawer,
    isFavorite,
    favorites,
    favoriteCityIds,
    savedCities,
    removeOneCity,
    addOneFavorite,
    removeOneFavorite,
    handleFavorite,
  };
};

export default useCities;
