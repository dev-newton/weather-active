import { useEffect } from "react";
import { Heart, X, Loader } from "react-feather";

import { useGetWeatherInfoQuery } from "services/weather.service";
import useCities from "pages/Cities/useCities.hook";
import { useAppDispatch } from "reducers/hooks";
import { setError } from "reducers/citiesSlice";
import "./CityCard.styles.scss";

interface ICityCard {
  id: number;
  name: string;
  showXIcon?: boolean;
}

const CityCard = ({ id, name, showXIcon = true }: ICityCard) => {
  const { data, isLoading, isError } = useGetWeatherInfoQuery(name);
  const {
    isFavorite,
    favoriteCityIds,
    removeOneCity,
    handleFavorite,
    handleCityClicked,
  } = useCities();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setError(isError));
  }, [isError]);

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  const { temp_c, temp_f, condition } = data?.current;

  return (
    <div className="card" onClick={() => handleCityClicked(name)}>
      <div className="card-header">
        {showXIcon && (
          <X
            className="card-icon"
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              removeOneCity(id);
            }}
          />
        )}
        <h2>{name}</h2>
      </div>
      <div className="card-info">
        <div className="left">
          <img src={condition.icon} alt="weather-icon" />
          <p>
            {temp_c}°C|<span>{temp_f}°F</span>
          </p>
        </div>
        <div className="right">
          <Heart
            className={`card-icon card-icon--${
              isFavorite(favoriteCityIds, id) ? "fill" : "empty"
            }`}
            onClick={(e) => handleFavorite(id, e)}
          />
        </div>
      </div>
    </div>
  );
};

export default CityCard;
