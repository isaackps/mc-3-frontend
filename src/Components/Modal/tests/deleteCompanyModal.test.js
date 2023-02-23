import { DeleteCompanyModal } from "../deleteCompanyModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("DeleteCompanyModal", () => {
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
            stockPrices: [],
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

  it("should display correctly when loaded", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <DeleteCompanyModal />
      </Provider>
    );

    expect(
      screen.getByText(/Are you sure you want to delete this company?/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it("should fire delete company action when clicked on 'yes' button", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <DeleteCompanyModal />
      </Provider>
    );
    fireEvent.click(screen.getByText(/Yes/));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("company/deleteCompany/pending");
  });
});
