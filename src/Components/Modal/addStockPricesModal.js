import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStockPrice } from "../../reducers/stockReducer";
import { closeModal, removeContent } from "../../reducers/modalReducer";

export const AddStockPricesModal = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);

  const cancelModal = () => {
    dispatch(closeModal());
    dispatch(removeContent());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addStockPrice(price));
    cancelModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mt-2 flex justify-between">
          Stock Price:
          <div className="ml-2 w-[70%]">
            <input
              // className={`${
              //   errorState.companyCode.error
              //     ? "border-2 border-red-500"
              //     : "border"
              // } w-full rounded px-2`}
              className="border w-full rounded px-2"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="7.63, 3.74, 12.3, etc..."
              pattern="[0-9]+"
              required
            />
            {/* {errorState.companyCode.error && (
            <p className="text-xs text-red-500">
              {errorState.companyCode.message}
            </p>
          )} */}
          </div>
        </label>
        <div className="flex justify-center mt-4">
          <button
            className="border px-2 rounded bg-slate-100 shadow"
            type="submit"
          >
            Register Stock Price
          </button>
        </div>
      </form>
    </div>
  );
};
