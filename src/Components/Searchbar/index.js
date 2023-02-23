import { useSelector, useDispatch } from "react-redux";
import { getSearchValue, updateSearch } from "../../reducers/companyReducer";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(getSearchValue);

  return (
    <input
      data-testid="searchBarInput"
      placeholder="Search"
      className="border px-2 rounded"
      type="text"
      value={searchValue}
      onChange={(e) => dispatch(updateSearch(e.target.value))}
    />
  );
};
