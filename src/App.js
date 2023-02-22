import { Navbar } from "./Components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "./reducers/companyReducer";
import { CompanyDetail } from "./Components/CompanyDetail";
import {
  closeModal,
  removeContent,
  selectDisplayModal,
  selectWhichContent,
} from "./reducers/modalReducer";
import Modal from "react-modal";
import {
  AddStockPricesModal,
  AddCompanyModal,
  DeleteCompanyModal,
} from "./Components/Modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

Modal.setAppElement("#root");

const App = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectDisplayModal);
  const displayContent = useSelector(selectWhichContent);

  const closeModalFn = () => {
    dispatch(closeModal());
    dispatch(removeContent());
  };

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  const whichContentToDisplay = () => {
    switch (displayContent) {
      case "addCompanyModal":
        return <AddCompanyModal closeModal={closeModalFn} />;
      case "deleteCompanyModal":
        return <DeleteCompanyModal />;
      case "addStockPricesModal":
        return <AddStockPricesModal />;
      default:
        return false;
    }
  };

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModalFn}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className="flex justify-end">
          <button
            className="border rounded px-2 shadow bg-slate-50"
            onClick={() => closeModalFn()}
          >
            X
          </button>
        </div>
        {whichContentToDisplay()}
      </Modal>
      <div className="container">
        <Navbar />
        <CompanyDetail />
      </div>
    </div>
  );
};

export default App;
