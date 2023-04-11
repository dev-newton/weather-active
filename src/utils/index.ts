import { ICity } from "reducers/citiesSlice";

export const isFavorite = (favoriteCityIds: number[], id: number) =>
  favoriteCityIds.includes(id);

export const getFavorites = (savedCities: ICity[], favoriteCityIds: number[]) =>
  savedCities.filter((city, i) => favoriteCityIds.includes(city.id));
