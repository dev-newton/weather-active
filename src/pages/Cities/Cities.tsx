import { useEffect } from "react";
import { createPortal } from "react-dom";

import { CityCard, FavoritesDrawer } from "./components";
import useCities from "./useCities.hook";
import Error from "components/Error/Error";
import Button from "components/Button/Button";
import { useGetWeatherInfoQuery } from "services/weather.service";
import "./Cities.styles.scss";

const Cities = () => {
  const {
    showDrawer,
    setShowDrawer,
    savedCities,
    favorites,
    error,
    coords,
    skip,
    handleGetUserCity,
    handleCityClicked,
    cityLoading,
  } = useCities();
  // Fetch data when lat and lng have been recieved
  const { data } = useGetWeatherInfoQuery(coords, {
    skip,
  });

  useEffect(() => {
    if (data) {
      handleCityClicked(data?.location.name);
    }
  }, [data]);

  return (
    <>
      {error && <Error />}

      <div className="cities" style={{ display: error ? "none" : "block" }}>
        <div className="btn-row">
          <Button
            onClick={() => setShowDrawer(true)}
            label={`View Favorites: ${favorites.length}`}
          />

          <Button
            onClick={handleGetUserCity}
            label={cityLoading ? "Loading..." : "Current City Weather"}
          />
        </div>

        <div className="grid">
          {[...savedCities]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((city) => (
              <CityCard key={city.id} id={city.id} name={city.name} />
            ))}
        </div>
        {!savedCities.length && (
          <h2>No Cities exist, kindly refresh the page!</h2>
        )}
      </div>

      {showDrawer &&
        createPortal(
          <FavoritesDrawer
            favorites={favorites}
            onClose={() => setShowDrawer(false)}
          />,
          document.body
        )}
    </>
  );
};

export default Cities;
