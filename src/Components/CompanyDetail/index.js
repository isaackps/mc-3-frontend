import { useSelector, useDispatch } from "react-redux";
import {
  allCompanyDetails,
  getSearchValue,
  status,
  updateDeletingCompanyCode,
} from "../../reducers/companyReducer";
import { StockDetails } from "./stockDetail";
import { openModal, showContent } from "../../reducers/modalReducer";

export const CompanyDetail = () => {
  const dispatch = useDispatch();
  const companies = useSelector(allCompanyDetails);
  const APIstatus = useSelector(status);
  const searchValue = useSelector(getSearchValue);

  const openDeleteCompanyModal = (companyDetail) => {
    dispatch(updateDeletingCompanyCode(companyDetail.companyCode));
    dispatch(openModal());
    dispatch(showContent("deleteCompanyModal"));
  };

  const filteredCompanies = companies.filter((company) => {
    if (searchValue.length < 3) return true;

    const matchCompanyName = company.company.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchCompanyCode = company.company.companyCode
      .toString()
      .includes(searchValue.toLowerCase());
    const matchCEO = company.company.CEO.toLowerCase().includes(
      searchValue.toLowerCase()
    );
    return matchCompanyCode || matchCEO || matchCompanyName;
  });

  return (
    <div className="flex justify-end">
      <div className="flex w-[90%] flex-col">
        {APIstatus === "loading" ? (
          <div>Loading Company Details</div>
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => {
            return (
              <div
                key={`company-${index}`}
                className="w-full border bg-white rounded-md drop-shadow-lg p-4 mb-4"
              >
                <div className="flex ">
                  <div className="flex justify-between mb-8 w-full">
                    <div className="w-1/2">
                      <div>Code: {company.company.companyCode}</div>
                      <div>{company.company.name}</div>
                      <div>Stock: {company.company.stockExchange}</div>
                    </div>
                    <div className="w-1/2">
                      <div>CEO: {company.company.CEO}</div>
                      <a
                        href={company.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400"
                      >
                        {company.company.website}
                      </a>
                    </div>
                  </div>
                  <div
                    className="border shadow rounded h-7 w-7 text-center cursor-pointer"
                    onClick={() =>
                      openDeleteCompanyModal({
                        companyCode: company.company.companyCode,
                      })
                    }
                  >
                    X
                  </div>
                </div>
                {company.stocks && <StockDetails stocks={company.stocks} />}
              </div>
            );
          })
        ) : (
          <div className="text-3xl text-center mt-8">
            No Such Company Found.
          </div>
        )}
      </div>
    </div>
  );
};
