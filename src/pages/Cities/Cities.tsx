import { createPortal } from "react-dom";

import CardCity from "pages/Cities/components/CityCard/CityCard";
import FavoritesDrawer from "./components/FavoritesDrawer/FavoritesDrawer";
import useCities from "./useCities.hook";
import Error from "components/Error/Error";
import "./Cities.styles.scss";
import { useEffect } from "react";

const Cities = () => {
  const {
    showDrawer,
    setShowDrawer,
    savedCities,
    favorites,
    error,
    selectedCity,
  } = useCities();

  const cities = [...savedCities]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((city) => <CardCity key={city.id} id={city.id} name={city.name} />);

  return (
    <>
      {error && <Error />}

      <div className="cities" style={{ display: error ? "none" : "block" }}>
        <button onClick={() => setShowDrawer(true)}>
          View Favorites: {favorites.length}
        </button>

        <div className="grid">{cities}</div>
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
