import { AddStockPricesModal } from "../addStockPricesModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("AddStockPricesModal", () => {
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

  it("should display the correct fields when loaded", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AddStockPricesModal />
      </Provider>
    );
    expect(screen.getByText(/Stock Price:/i)).toBeInTheDocument();
  });

  it("should fire addStockPrice when clicked register stock price button", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AddStockPricesModal />
      </Provider>
    );

    const stockPriceInput = screen.getByTestId("stockPriceInput");
    const stockPriceText = "9.31";
    fireEvent.change(stockPriceInput, { target: { value: stockPriceText } });
    expect(stockPriceInput.value).toEqual(stockPriceText);

    fireEvent.click(screen.getByText(/Register Stock Price/));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("stock/addStockPrice/pending");
  });
});
