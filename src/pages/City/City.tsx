import { useEffect } from "react";
import { Loader } from "react-feather";

import useCities from "pages/Cities/useCities.hook";
import { useGetWeatherInfoQuery } from "services/weather.service";
import { CityHeader, CityInfo, Header, Notes, SearchInput } from "./components";
import Error from "components/Error/Error";
import useNotes from "./useNotes.hook";
import "./City.styles.scss";

const City = () => {
  const {
    selectedCity,
    dayjs,
    searchText,
    handleSearchChange,
    handleSearchBtnClicked,
    handleEnterKeypressOnSearch,
    errorMsg,
  } = useCities();

  const { savedNotes } = useNotes();

  useEffect(() => {
    // UPDATE selectedCity storage WHEN "selectedCity" changes
    if (selectedCity) {
      localStorage.setItem("selectedCity", selectedCity);
    }
    // UPDATE savedNotes storage WHEN "savedNotes" changes
    if (savedNotes) {
      localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    }
  }, [selectedCity, savedNotes]);

  const { data, isLoading, isError } = useGetWeatherInfoQuery(selectedCity);

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <Error />;
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
          <p className="error-msg">{errorMsg}</p>
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
          <div id="notes" className="weather-card">
            <div className="fix-po">
              <h2>Notes</h2>
              <Notes city={selectedCity} savedNotes={savedNotes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
