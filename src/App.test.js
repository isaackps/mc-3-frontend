import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("renders App homepage", () => {
  const initialState = {
    companies: {
      allCompanies: [],
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

  it("should render homepage correctly", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const addCompanyElement = screen.getByText(/Add company/i);
    expect(addCompanyElement).toBeInTheDocument();
    const listAllCompanyElement = screen.getByText(/list all company/i);
    expect(listAllCompanyElement).toBeInTheDocument();
  });

  it("should render 'No Such Company Found' when there are no companies", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const noCompanyFoundElement = screen.getByText(/no such company found./i);
    expect(noCompanyFoundElement).toBeInTheDocument();
  });

  it("should render the company details correctly when there are company details in the store", () => {
    const stateWithCompany = { ...initialState };
    stateWithCompany.companies.allCompanies = [
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
    ];
    store = mockStore(stateWithCompany);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const companyElement = screen.getByText(/Code: 6543/i);
    expect(companyElement).toBeInTheDocument();
  });
});
