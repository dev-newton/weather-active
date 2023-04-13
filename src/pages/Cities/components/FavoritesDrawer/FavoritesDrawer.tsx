import { useEffect } from "react";
import { X } from "react-feather";

import { CityCard } from "../../components";
import { ICity } from "types";
import "./FavoritesDrawer.styles.scss";

interface IFavoritesDrawer {
  onClose: () => void;
  favorites: ICity[];
}

const FavoritesDrawer = ({ onClose, favorites }: IFavoritesDrawer) => {
  // LOCK SCROLL WHEN COMPONENT IS MOUNTED
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // CLEAN UP FUNCTION TO UNDO SCROLL LOCK EFFECT
    // WHEN COMPONENT UNMOUNTS
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div onClick={onClose} className="opacity-cover enabled"></div>
      <div className="favorites-drawer">
        <div className="header">
          <h2>Favorites: {favorites.length}</h2>
          <X className="close-icon" onClick={onClose} color="black" />
        </div>
        {!favorites.length && <p>No Favorites have been added!</p>}
        <div className="body">
          {[...favorites]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((city) => (
              <CityCard
                key={city.id}
                id={city.id}
                name={city.name}
                showXIcon={false}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesDrawer;
