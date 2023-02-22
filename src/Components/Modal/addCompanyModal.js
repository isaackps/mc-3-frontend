import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerCompany,
  getAllCompanies,
} from "../../reducers/companyReducer";
import { hasError } from "../../utils";

export const AddCompanyModal = ({ closeModal }) => {
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [ceo, setCeo] = useState("");
  const [turnover, setTurnover] = useState(100000001);
  const [website, setWebsite] = useState("");
  const [stockEx, setStockEx] = useState("");

  const errorInitValue = {
    error: false,
    message: "",
  };
  const [errorState, setErrorState] = useState({
    companyCode: errorInitValue,
    turnover: errorInitValue,
    stockExchange: errorInitValue,
  });

  const dispatch = useDispatch();

  const validateFormData = () => {
    let companyCodeError,
      turnoverError,
      stockExError = errorInitValue;
    if (companyCode.length !== 4) {
      companyCodeError = {
        error: true,
        message: "Length of Company Code must be 4 digits.",
      };
    } else {
      companyCodeError = {
        error: false,
        message: "",
      };
    }
    if (turnover < 100000001) {
      turnoverError = {
        error: true,
        message: "turnover must be larger then 100,000,000",
      };
    } else {
      turnoverError = {
        error: false,
        message: "",
      };
    }
    if (stockEx.length !== 3) {
      stockExError = {
        error: true,
        message: "Stock Exchange must contain 3 characters.",
      };
    } else {
      stockExError = {
        error: false,
        message: "",
      };
    }

    return {
      companyCode: companyCodeError,
      turnover: turnoverError,
      stockExchange: stockExError,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const anyError = validateFormData();

    setErrorState(anyError);

    if (!hasError(anyError)) {
      const companyDetail = {
        companyCode: companyCode,
        name: companyName,
        CEO: ceo,
        turnover: turnover,
        website: website,
        stockExchange: stockEx,
      };

      dispatch(registerCompany(companyDetail));
      dispatch(getAllCompanies());
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="mt-2 flex justify-between">
        Company Code:
        <div className="ml-2 w-[70%]">
          <input
            className={`${
              errorState.companyCode.error
                ? "border-2 border-red-500"
                : "border"
            } w-full rounded px-2`}
            type="text"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            placeholder="8763, 3748, 1233, etc..."
            pattern="[0-9]+"
            required
          />
          {errorState.companyCode.error && (
            <p className="text-xs text-red-500">
              {errorState.companyCode.message}
            </p>
          )}
        </div>
      </label>
      <label className="mt-2 flex justify-between">
        Company Name:
        <input
          className="border ml-2 w-[70%] rounded px-2"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Aval pte ltd, Wine Co. etc..."
          required
        />
      </label>
      <label className="mt-2 flex justify-between">
        CEO:
        <input
          className="border ml-2 w-[70%] rounded px-2"
          type="text"
          value={ceo}
          onChange={(e) => setCeo(e.target.value)}
          placeholder="John Wick, David Tan, etc..."
          required
        />
      </label>
      <label className="mt-2 flex justify-between">
        Turnover:
        <div className="ml-2 w-[70%]">
          <input
            className={`${
              errorState.turnover.error ? "border-2 border-red-500" : "border"
            } w-full rounded px-2`}
            type="text"
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            placeholder="Min value 100000001"
            required
          />
          {errorState.turnover.error && (
            <p className="text-xs text-red-500">
              {errorState.turnover.message}
            </p>
          )}
        </div>
      </label>
      <label className="mt-2 flex justify-between">
        Website:
        <input
          className="border ml-2 w-[70%] rounded px-2"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="www.myWebsite.com, tiedto.io, etc..."
          required
        />
      </label>
      <label className="mt-2 flex justify-between">
        Stock Exchange:
        <div className="ml-2 w-[70%]">
          <input
            className={`${
              errorState.stockExchange.error
                ? "border-2 border-red-500"
                : "border"
            } w-full rounded px-2`}
            type="text"
            value={stockEx}
            onChange={(e) => setStockEx(e.target.value)}
            placeholder="WER, TIE, etc..."
            pattern="[A-Za-z]+"
            required
          />
          {errorState.stockExchange.error && (
            <p className="text-xs text-red-500">
              {errorState.stockExchange.message}
            </p>
          )}
        </div>
      </label>
      <div className="flex justify-center mt-4">
        <button
          className="border px-2 rounded bg-slate-100 shadow"
          type="submit"
        >
          Register Company
        </button>
      </div>
    </form>
  );
};
