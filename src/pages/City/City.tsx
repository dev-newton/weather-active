import { Search } from "react-feather";
import useCities from "pages/Cities/useCities.hook";
import { useGetWeatherInfoQuery } from "services/weather.service";
import "./City.styles.scss";
import { useEffect } from "react";

interface ICity {
  name: string;
}

const City = () => {
  const { selectedCity } = useCities();
  useEffect(() => {
    if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);
  // const { data, isLoading } = useGetWeatherInfoQuery(selectedCity);

  return (
    <div className="city">
      <div className="city-header">
        <h1>{selectedCity}</h1>
      </div>
      <div className="city-body">
        <div className="input-wrapper">
          <input type="text" placeholder="Search for a city..." />
          <Search className="search-icon" />
        </div>
        <h2>City</h2>
        <div className="weather-card">
          <div className="left-side">
            <div className="temp">
              <h3>Temperature</h3>
              <div className="temp-content">
                <img src="" alt="weather-icon" />
                <div className="temp-info">
                  <p>
                    20°C|<span>50°F</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="right-side"></div>
        </div>
      </div>
    </div>
  );
};

export default City;
