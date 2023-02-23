import { AddCompanyModal } from "../addCompanyModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("AddCompanyModal", () => {
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

  it("should render form correctly", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AddCompanyModal />
      </Provider>
    );

    expect(screen.getByText(/Company Code:/i)).toBeInTheDocument();
    expect(screen.getByText(/Company Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/CEO:/i)).toBeInTheDocument();
    expect(screen.getByText(/Turnover:/i)).toBeInTheDocument();
    expect(screen.getByText(/Website:/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock Exchange:/i)).toBeInTheDocument();
    expect(screen.getByText(/Register Company/i)).toBeInTheDocument();
  });

  it("should fire registerCompany action", () => {
    store = mockStore(initialState);
    const closeModal = () => {};
    render(
      <Provider store={store}>
        <AddCompanyModal closeModal={closeModal} />
      </Provider>
    );

    const companyCodeInput = screen.getByTestId("companyCodeInput");
    const companyCodeText = "9631";
    fireEvent.change(companyCodeInput, { target: { value: companyCodeText } });
    expect(companyCodeInput.value).toEqual(companyCodeText);

    const companyNameInput = screen.getByTestId("companyNameInput");
    const companyNameText = "Zarun Pte Ltd";
    fireEvent.change(companyNameInput, { target: { value: companyNameText } });
    expect(companyNameInput.value).toEqual(companyNameText);

    const ceoInput = screen.getByTestId("ceoInput");
    const ceoText = "Zarun Tikitum";
    fireEvent.change(ceoInput, { target: { value: ceoText } });
    expect(ceoInput.value).toEqual(ceoText);

    const turnoverInput = screen.getByTestId("turnoverInput");
    const turnoverText = "3000000000";
    fireEvent.change(turnoverInput, { target: { value: turnoverText } });
    expect(turnoverInput.value).toEqual(turnoverText);

    const websiteInput = screen.getByTestId("websiteInput");
    const websiteText = "www.zarum.com";
    fireEvent.change(websiteInput, { target: { value: websiteText } });
    expect(websiteInput.value).toEqual(websiteText);

    const stockExchangeInput = screen.getByTestId("stockExchangeInput");
    const stockExchangeText = "ZAR";
    fireEvent.change(stockExchangeInput, {
      target: { value: stockExchangeText },
    });
    expect(stockExchangeInput.value).toEqual(stockExchangeText);

    fireEvent.click(screen.getByText(/Register Company/));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("company/registerCompany/pending");
  });
});
