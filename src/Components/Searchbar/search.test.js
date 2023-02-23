import { SearchBar } from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("SearchBar", () => {
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

  it("should render the search bar component correctly", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    expect(screen.getByTestId("searchBarInput")).toBeInTheDocument();
  });

  it("should fire update search action onChange", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchBarInput = screen.getByTestId("searchBarInput");
    fireEvent.change(searchBarInput, { target: { value: "6" } });
    const actions = store.getActions();
    expect(actions[0].type).toEqual("company/updateSearch");
    expect(actions[0].payload).toEqual("6");
  });
});
