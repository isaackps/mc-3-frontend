import { Navbar } from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("Navbar", () => {
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

  it("should display the navbar component correctly", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText(/add company/i)).toBeInTheDocument();
  });

  it("should fire the correct action when add company button is clicked", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    fireEvent.click(screen.getByText(/add company/));
    const actions = store.getActions();
    expect(actions[1].type).toEqual("modal/openModal");
    expect(actions[2].type).toEqual("modal/showContent");
  });
});
