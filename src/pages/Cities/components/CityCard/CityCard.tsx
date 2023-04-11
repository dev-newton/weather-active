import { Heart, X, Loader } from "react-feather";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  const { temp_c, temp_f, condition } = data.current;

  return (
    <div className="card" onClick={() => navigate("/city")}>
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
