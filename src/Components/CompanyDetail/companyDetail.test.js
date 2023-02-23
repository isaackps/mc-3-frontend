import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { CompanyDetail } from ".";

describe("CompanyDetail Component", () => {
  const initialState = {
    companies: {
      allCompanies: [
        {
          company: {
            companyCode: 6543,
            name: "Company Pte Ltd",
            CEO: "June Tan",
            turnover: 200000000,
            website: "CCpl.com",
            stockExchange: "CCT",
          },
          stocks: {
            companyCode: 6543,
            stockPrices: [
              {
                price: 76,
                createdAt: "2023-02-21T07:45:28.307Z",
                updatedAt: "2023-02-21T07:45:28.307Z",
              },
              {
                price: 24,
                createdAt: "2023-02-21T07:45:22.355Z",
                updatedAt: "2023-02-21T07:45:22.355Z",
              },
            ],
          },
        },
      ],
      status: "idle",
      registerCompanyStatus: "idle",
      registerCompanyErrorMsg: "",
      deletingCompanyStatus: "idle",
      deletingCompanyErrorMsg: "",
      whichCompanyCodeToDelete: 0,
      search: "",
    },
    modal: {
      displayModal: false,
      whichContent: "undefined",
    },
    stocks: {
      companyCode: 0,
    },
  };
  const middleware = [thunk];
  const mockStore = configureStore(middleware);
  let store;

  it("should render component correctly when there are company and stock data", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <CompanyDetail />
      </Provider>
    );

    expect(screen.getByText(/June Tan/i)).toBeInTheDocument();
    expect(screen.getByText(/Company Pte Ltd/i)).toBeInTheDocument();
    expect(screen.getByText(/6543/i)).toBeInTheDocument();
    expect(screen.getByText(/CCpl.com/i)).toBeInTheDocument();
    expect(screen.getByText(/CCT/i)).toBeInTheDocument();
    expect(screen.getByText(/Add stock prices/i)).toBeInTheDocument();
  });
});
