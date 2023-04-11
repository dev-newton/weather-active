import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addFavorite,
  removeCity,
  removeFavorite,
  setSelectedCity,
} from "reducers/citiesSlice";
import { useAppDispatch, useAppSelector } from "reducers/hooks";
import { isFavorite, getFavorites } from "utils";

const useCities = () => {
  const { savedCities, favoriteCityIds, selectedCity, error } = useAppSelector(
    (state) => state.cities
  );

  const [showDrawer, setShowDrawer] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleCityClicked = (name: string) => {
    dispatch(setSelectedCity(name));
    navigate("/city");
  };

  return {
    error,
    showDrawer,
    setShowDrawer,
    isFavorite,
    favorites,
    favoriteCityIds,
    savedCities,
    selectedCity,
    removeOneCity,
    addOneFavorite,
    removeOneFavorite,
    handleFavorite,
    handleCityClicked,
  };
};

export default useCities;
