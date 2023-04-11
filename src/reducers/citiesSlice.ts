import { createSlice } from "@reduxjs/toolkit";

import citiesData from "data/cities.json";

export interface ICity {
  id: number;
  name: string;
}

// Define a type for the slice state
interface CitiesState {
  savedCities: ICity[];
  favoriteCityIds: number[];
  selectedCity: ICity | null;
}

const initCities = () => {
  localStorage.setItem("savedCities", JSON.stringify(citiesData));
  const storageCities = localStorage.getItem("savedCities");
  const parsedCities = storageCities ? JSON.parse(storageCities) : [];

  return parsedCities;
};

const initialState: CitiesState = {
  savedCities: initCities(),
  favoriteCityIds: [],
  selectedCity: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    removeCity(state, action) {
      state.savedCities = state.savedCities.filter(
        (city) => city.id !== action.payload
      );
      state.favoriteCityIds = state.favoriteCityIds.filter(
        (id) => id !== action.payload
      );
    },
    addFavorite(state, action) {
      state.favoriteCityIds = [...state.favoriteCityIds, action.payload];
    },
    removeFavorite(state, action) {
      state.favoriteCityIds = state.favoriteCityIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { removeCity, addFavorite, removeFavorite } = citiesSlice.actions;

export default citiesSlice.reducer;
