import { useEffect } from "react";
import { Loader } from "react-feather";

import useCities from "pages/Cities/useCities.hook";
import { useGetWeatherInfoQuery } from "services/weather.service";
import { CityHeader, CityInfo, Header, SearchInput } from "./components";
import "./City.styles.scss";

const City = () => {
  const {
    selectedCity,
    dayjs,
    searchText,
    handleSearchChange,
    handleSearchBtnClicked,
    handleEnterKeypressOnSearch,
  } = useCities();

  useEffect(() => {
    if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  const { data, isLoading, isError } = useGetWeatherInfoQuery(selectedCity);

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

  const { temp_c, temp_f, condition, last_updated } = data?.current;
  const { localtime } = data?.location;

  const localTime = dayjs(localtime).format("llll");
  const lastUpdated = dayjs(last_updated).format("llll");

  return (
    <div className="city">
      <Header title={selectedCity} />
      <div className="city-body">
        <div className="fixed-pos">
          <SearchInput
            value={searchText}
            onChange={handleSearchChange}
            onKeyPress={handleEnterKeypressOnSearch}
            onSearchBtnClicked={handleSearchBtnClicked}
          />
        </div>
        <div className="weather-wrapper">
          <div className="weather-card">
            <h2>Weather Details</h2>
            <CityHeader
              icon={condition.icon}
              temp_c={temp_c}
              temp_f={temp_f}
              lastUpdated={lastUpdated}
              localTime={localTime}
            />
            <hr className="divider" />
            <div className="body">
              <CityInfo name="Weather condition" value={condition.text} />
              <CityInfo
                name="Precipitation"
                value={data?.current.precip_mm}
                unit="mm"
              />
              <CityInfo
                name="Humidity"
                value={data?.current.humidity}
                unit="%"
              />
              <CityInfo
                name="Wind speed"
                value={data?.current.wind_kph}
                unit="kph"
              />
              <CityInfo
                name="Wind degree"
                value={data?.current.wind_degree}
                unit="deg"
              />
              <CityInfo
                name="Wind direction"
                value={data?.current.wind_dir}
                unit="deg"
              />
              <CityInfo
                name="Cloud cover"
                value={data?.current.cloud}
                unit="%"
              />
              <CityInfo name="UV Index" value={data?.current.uv} />
              <CityInfo
                name="Wind gust"
                value={data?.current.wind_mph}
                unit="mph"
              />
              <CityInfo
                name="Pressure"
                value={data?.current.pressure_in}
                unit="in"
              />
            </div>
          </div>
          <div className="weather-card">
            <h2>Notes</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
