import logo from "../../logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../../reducers/companyReducer";
import { openModal, showContent } from "../../reducers/modalReducer";

export const Navbar = () => {
  const dispatch = useDispatch();
  const openAddCompanyModal = () => {
    dispatch(openModal());
    dispatch(showContent("addCompanyModal"));
  };

  return (
    <div className="navbar bg-base-100 flex">
      <div className="flex-none">
        <img src={logo} className="w-20 h-20" alt="logo" />
      </div>
      <div className="flex-1">
        <div className="flex justify-around w-full items-center">
          <button
            className="btn btn-primary"
            onClick={() => openAddCompanyModal()}
          >
            add company
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(getAllCompanies())}
          >
            list all company
          </button>
          <div>search</div>
        </div>
      </div>
    </div>
  );
};
