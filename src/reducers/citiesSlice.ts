import { createSlice } from "@reduxjs/toolkit";

import citiesData from "data/cities.json";

export interface ICity {
  id: number;
  name: string;
}

export interface ICoords {
  latitude: number;
  longitude: number;
}

export interface INote {
  id: number;
  city: string | null;
  text: string;
  date: string;
}

// Define a type for the slice state
interface CitiesState {
  savedCities: ICity[];
  favoriteCityIds: number[];
  selectedCity: string | null;
  error: boolean;
  savedNotes: INote[];
  selectedNote: INote | null;
}

const initCities = () => {
  localStorage.setItem("savedCities", JSON.stringify(citiesData));
  const storageCities = localStorage.getItem("savedCities");
  const parsedCities = storageCities ? JSON.parse(storageCities) : [];

  return parsedCities;
};

const initNotes = () => {
  const storageNotes = localStorage.getItem("savedNotes");
  const parsedNotes = storageNotes ? JSON.parse(storageNotes) : [];

  return parsedNotes;
};

const selectedCity = localStorage.getItem("selectedCity");

const initialState: CitiesState = {
  savedCities: initCities(),
  favoriteCityIds: [],
  selectedCity,
  error: false,
  savedNotes: initNotes(),
  selectedNote: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    // CITIES
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
    // FAVORITES
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
    // NOTES
    addNote(state, action) {
      state.savedNotes = [...state.savedNotes, action.payload];
    },
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },
    updateNote(state, action) {
      state.savedNotes = state.savedNotes.map((note: INote) => {
        return note.id === action.payload.id ? action.payload : note;
      });
    },
    deleteNote(state, action) {
      state.savedNotes = state.savedNotes.filter(
        (note: INote) => note.id !== action.payload?.id
      );
    },
  },
});

export const {
  removeCity,
  setSelectedCity,
  addFavorite,
  removeFavorite,
  setError,
  addNote,
  setSelectedNote,
  updateNote,
  deleteNote,
} = citiesSlice.actions;

export default citiesSlice.reducer;
