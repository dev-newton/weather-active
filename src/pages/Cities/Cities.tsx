import { createPortal } from "react-dom";

import CardCity from "pages/Cities/components/CityCard/CityCard";
import FavoritesDrawer from "./components/FavoritesDrawer/FavoritesDrawer";
import useCities from "./useCities.hook";
import "./Cities.styles.scss";

const Cities = () => {
  const { showDrawer, setShowDrawer, savedCities, favorites } = useCities();

  return (
    <>
      <div className="cities">
        <button onClick={() => setShowDrawer(true)}>
          View Favorites: {favorites.length}
        </button>

        <div className="grid">
          {[...savedCities]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((city) => (
              <CardCity key={city.id} id={city.id} name={city.name} />
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
