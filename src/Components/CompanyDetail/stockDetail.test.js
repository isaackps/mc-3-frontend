import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { StockDetails } from "./stockDetail";

describe("StockDetails Component", () => {
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

  it("should render component correctly when there are company and stock data", () => {
    store = mockStore(initialState);
    const stocksDetails = {
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
    };
    render(
      <Provider store={store}>
        <StockDetails stocks={stocksDetails.stocks} />
      </Provider>
    );

    const stockPrice = screen.getAllByText(/76/i);
    expect(stockPrice).toHaveLength(2);
    expect(stockPrice[0]).toHaveTextContent("76");
  });

  it("should render 'no stock prices title' when there are no stock prices", () => {
    store = mockStore(initialState);
    const stocksDetails = {
      stocks: {
        companyCode: 6543,
        stockPrices: [],
      },
    };
    render(
      <Provider store={store}>
        <StockDetails stocks={stocksDetails.stocks} />
      </Provider>
    );

    const stockPrice = screen.getAllByText(/There are no stock prices/i);
    expect(stockPrice).toHaveLength(1);
    expect(stockPrice[0]).toHaveTextContent("There are no stock prices");
  });
});
