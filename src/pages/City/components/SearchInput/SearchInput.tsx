import { ChangeEvent, KeyboardEvent } from "react";
import { Search } from "react-feather";

import "./SearchInput.styles.scss";

interface ISearchInput {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchBtnClicked: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  value,
  onChange,
  onSearchBtnClicked,
  onKeyPress,
}: ISearchInput) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Search for a city..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
      />
      <Search className="search-icon" onClick={onSearchBtnClicked} />
    </div>
  );
};

export default SearchInput;
