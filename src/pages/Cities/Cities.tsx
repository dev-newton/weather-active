import { createPortal } from "react-dom";
import { Loader } from "react-feather";

import { CityCard, FavoritesDrawer } from "./components";
import useCities from "./useCities.hook";
import Error from "components/Error/Error";
import Button from "components/Button/Button";
import { useGetWeatherInfoQuery } from "services/weather.service";
import "./Cities.styles.scss";
import { useEffect } from "react";

const Cities = () => {
  const {
    showDrawer,
    setShowDrawer,
    savedCities,
    favorites,
    error,
    currentCoords,
    getCurrentPosition,
    loadingCoords,
    navigate,
    handleCityClicked,
  } = useCities();

  const { data, isLoading, isError } = useGetWeatherInfoQuery(currentCoords, {
    skip: currentCoords ? false : true,
  });

  useEffect(() => {
    if (data && data.location) handleCityClicked(data.location.name);
  }, [data]);

  // if (isLoading) {
  //   return (
  //     <div className="loader mt-10">
  //       <Loader />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <Error />;
  // }

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
            onClick={getCurrentPosition}
            label={loadingCoords ? "Loading..." : "Current City Weather"}
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
