import { Search } from "react-feather";
import "./SearchInput.styles.scss";

const SearchInput = () => {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder="Search for a city..." />
      <Search className="search-icon" />
    </div>
  );
};

export default SearchInput;
