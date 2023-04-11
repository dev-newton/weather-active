import { Heart, X, Loader } from "react-feather";

import { useGetWeatherInfoQuery } from "services/weather.service";
import useCities from "pages/Cities/useCities.hook";
import "./CityCard.styles.scss";

interface ICityCard {
  id: number;
  name: string;
  showXIcon?: boolean;
}

const CityCard = ({ id, name, showXIcon = true }: ICityCard) => {
  const { data, isLoading } = useGetWeatherInfoQuery(name);
  const { isFavorite, favoriteCityIds, removeOneCity, handleFavorite } =
    useCities();

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  const { temp_c, temp_f, condition } = data.current;

  return (
    <div className="card">
      <div className="card-header">
        {showXIcon && (
          <X
            className="card-icon"
            color="white"
            onClick={() => removeOneCity(id)}
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
            onClick={() => handleFavorite(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CityCard;
