import { createPortal } from "react-dom";

import { CityCard, FavoritesDrawer } from "./components";
import useCities from "./useCities.hook";
import Error from "components/Error/Error";
import Button from "components/Button/Button";
import "./Cities.styles.scss";

const Cities = () => {
  const { showDrawer, setShowDrawer, savedCities, favorites, error } =
    useCities();

  const cities = [...savedCities]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((city) => <CityCard key={city.id} id={city.id} name={city.name} />);

  return (
    <>
      {error && <Error />}

      <div className="cities" style={{ display: error ? "none" : "block" }}>
        <Button
          onClick={() => setShowDrawer(true)}
          label={`View Favorites: ${favorites.length}`}
        />

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
