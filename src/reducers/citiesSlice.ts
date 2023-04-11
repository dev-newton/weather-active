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
  selectedCity: string | null;
  error: boolean;
}

const initCities = () => {
  localStorage.setItem("savedCities", JSON.stringify(citiesData));
  const storageCities = localStorage.getItem("savedCities");
  const parsedCities = storageCities ? JSON.parse(storageCities) : [];

  return parsedCities;
};

const selectedCity = localStorage.getItem("selectedCity");

const initialState: CitiesState = {
  savedCities: initCities(),
  favoriteCityIds: [],
  selectedCity,
  error: false,
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
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    addFavorite(state, action) {
      state.favoriteCityIds = [...state.favoriteCityIds, action.payload];
    },
    removeFavorite(state, action) {
      state.favoriteCityIds = state.favoriteCityIds.filter(
        (id) => id !== action.payload
      );
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  removeCity,
  setSelectedCity,
  addFavorite,
  removeFavorite,
  setError,
} = citiesSlice.actions;

export default citiesSlice.reducer;
