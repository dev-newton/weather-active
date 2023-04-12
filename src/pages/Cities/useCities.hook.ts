import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import {
  addFavorite,
  removeCity,
  removeFavorite,
  setSelectedCity,
} from "reducers/citiesSlice";
import { useAppDispatch, useAppSelector } from "reducers/hooks";
import { isFavorite, getFavorites } from "utils";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);

const useCities = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [coords, setCoords] = useState("");
  const [skip, setSkip] = useState(true);
  const [cityLoading, setCityLoading] = useState(false);

  const { savedCities, favoriteCityIds, selectedCity, error } = useAppSelector(
    (state) => state.cities
  );

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

  const handleGetUserCity = () => {
    const savedCoords = localStorage.getItem("savedCoords");

    setCityLoading(true);
    if (savedCoords) {
      setCoords(savedCoords);
      setSkip(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCityLoading(false);
        const { latitude, longitude } = position.coords;
        localStorage.setItem("savedCoords", `${latitude},${longitude}`);
        setCoords(`${latitude},${longitude}`);
        setSkip(false);
      },
      (error) => {
        setCityLoading(false);
        console.log(error);
      }
    );
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
    coords,
    skip,
    cityLoading,
    handleGetUserCity,
  };
};

export default useCities;
