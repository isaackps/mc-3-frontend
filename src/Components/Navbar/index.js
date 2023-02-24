import logo from "../../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  allCompanyDetails,
  selectCompany,
  getSelectedCompany,
  updateSearch,
} from "../../reducers/companyReducer";
import { openModal, showContent } from "../../reducers/modalReducer";
import { SearchBar } from "../Searchbar";
import { useEffect } from "react";

export const Navbar = () => {
  const dispatch = useDispatch();
  const companies = useSelector(allCompanyDetails);
  const selectedCompany = useSelector(getSelectedCompany);

  const openAddCompanyModal = () => {
    dispatch(openModal());
    dispatch(showContent("addCompanyModal"));
  };

  const handleChange = (e) => {
    dispatch(updateSearch(""));
    dispatch(selectCompany(e.target.value));
  };

  useEffect(() => {
    if (companies.length > 0) {
      const firstCompanyName = companies[0].company.name;
      dispatch(selectCompany(firstCompanyName));
    }
  });

  return (
    <div className="navbar bg-base-100 flex">
      <div className="flex-none">
        <img src={logo} className="w-20 h-20" alt="logo" />
      </div>
      <div className="flex-1">
        <div className="flex justify-around w-full items-center">
          <button
            className="btn btn-primary shadow"
            onClick={() => openAddCompanyModal()}
          >
            add company
          </button>
          <div className="flex">
            <div>Company: </div>
            <select
              name="selectCompany"
              onChange={(e) => handleChange(e)}
              className="border ml-2 rounded shadow"
              value={selectedCompany}
            >
              {companies.map((company, i) => {
                const companyName = company.company.name;
                return (
                  <option key={`company-${i}`} value={companyName}>
                    {companyName}
                  </option>
                );
              })}
            </select>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};
