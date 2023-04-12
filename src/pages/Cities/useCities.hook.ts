import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import {
  addFavorite,
  removeCity,
  removeFavorite,
  setCurrentCoords,
  setSelectedCity,
} from "reducers/citiesSlice";
import { useAppDispatch, useAppSelector } from "reducers/hooks";
import { isFavorite, getFavorites } from "utils";
import { useGetWeatherInfoQuery } from "services/weather.service";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);

const useCities = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loadingCoords, setLoadingCoords] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { savedCities, favoriteCityIds, selectedCity, error, currentCoords } =
    useAppSelector((state) => state.cities);

  // useEffect(() => {
  //   // if (selectedCity?.length) {
  //   //   navigate("/city");
  //   // }
  //   dispatch(setSelectedCity(""));
  // }, [selectedCity]);

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
    if (currentCoords) {
      dispatch(setCurrentCoords(null));
    }
    dispatch(setSelectedCity(name));
    navigate("/city");
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const handleSearchBtnClicked = () => {
    setErrorMsg("");
    const cityExists = savedCities.filter(
      (city) => city.name.toLowerCase() === searchText.toLowerCase()
    );
    if (!cityExists.length) {
      return setErrorMsg("This city does not exist, try another one!");
    }
    dispatch(setSelectedCity(searchText));
    setSearchText("");
  };

  const handleEnterKeypressOnSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleSearchBtnClicked();
    }
  };

  // GET USER LOCATION COORDS
  const successCallback = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    dispatch(setCurrentCoords(`${latitude},${longitude}`));
    setLoadingCoords(false);
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.log(error);
  };

  const getCurrentPosition = () => {
    setLoadingCoords(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };
  return {
    dayjs,
    navigate,
    dispatch,
    error,
    errorMsg,
    searchText,
    setSearchText,
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
    handleSearchChange,
    handleSearchBtnClicked,
    handleEnterKeypressOnSearch,
    getCurrentPosition,
    currentCoords,
    setSelectedCity,
    loadingCoords,
  };
};

export default useCities;
