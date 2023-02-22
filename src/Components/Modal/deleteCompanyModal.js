import { useDispatch, useSelector } from "react-redux";
import { closeModal, removeContent } from "../../reducers/modalReducer";
import {
  deleteCompany,
  getDeletingCompanyCode,
} from "../../reducers/companyReducer";

export const DeleteCompanyModal = () => {
  const dispatch = useDispatch();
  const deletingCompanyCode = useSelector(getDeletingCompanyCode);

  const cancelModal = () => {
    dispatch(closeModal());
    dispatch(removeContent());
  };

  const deleteCompanyFn = () => {
    dispatch(deleteCompany(deletingCompanyCode));
    cancelModal();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-xl">
        Are you sure you want to delete this company?
      </h2>
      <div className="flex justify-around mt-4 w-1/2">
        <button
          className="bg-green-300 px-2 rounded shadow text-lg cursor-pointer"
          onClick={() => deleteCompanyFn()}
        >
          Yes
        </button>
        <button
          className="bg-gray-400 px-2 rounded shadow text-lg cursor-pointer"
          onClick={() => cancelModal()}
        >
          cancel
        </button>
      </div>
    </div>
  );
};
