import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal, showContent } from "../../reducers/modalReducer";
import { updateCompanyCode } from "../../reducers/stockReducer";

export const StockDetails = ({ stocks }) => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    if (stocks.stockPrices.length > 0) {
      setMin(
        stocks.stockPrices.reduce(
          (min, obj) => (obj.price < min ? obj.price : min),
          stocks.stockPrices[0].price
        )
      );
      setMax(
        stocks.stockPrices.reduce(
          (max, obj) => (obj.price > max ? obj.price : max),
          0
        )
      );
      setAvg(
        stocks.stockPrices.reduce((acc, obj) => acc + obj.price, 0) /
          stocks.stockPrices.length
      );
    }
  }, [min, stocks.stockPrices]);

  const openAddStocks = () => {
    dispatch(updateCompanyCode(stocks.companyCode));
    dispatch(openModal());
    dispatch(showContent("addStockPricesModal"));
  };

  return (
    <div className="">
      {stocks.stockPrices.length > 0 ? (
        <div>
          <div className="border w-full">
            <table>
              <thead>
                <tr>
                  <th>Stock Prices</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {stocks.stockPrices.map((stock, index) => {
                  const date = new Date(stock.createdAt);
                  const readableDateTime = date.toLocaleString("en-US", {
                    timeZone: "Asia/Singapore",
                  });
                  const stockDate = readableDateTime.split(",")[0];
                  const stockTime = readableDateTime
                    .split(",")[1]
                    .replace(/^\s+/, "");

                  return (
                    <tr key={`stock-${index}`}>
                      <td>{stock.price}</td>
                      <td>{stockDate}</td>
                      <td>{stockTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <div className="mt-4">
              <div className="flex">
                <div className="p-1">Minimum Stock Price:</div>
                <div className="p-1 pl-2">{min}</div>
              </div>
              <div className="flex">
                <div className="p-1">Maximum Stock Price:</div>
                <div className="p-1 pl-2">{max}</div>
              </div>
              <div className="flex">
                <div className="p-1">Average Stock Price:</div>
                <div className="p-1 pl-2">{avg.toFixed(2)}</div>
              </div>
            </div>
            <div className="self-end">
              <button
                className="border shadow rounded px-2 my-2 cursor-pointer"
                onClick={() => openAddStocks()}
              >
                Add stock prices
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="text-center font-bold text-lg">
            There are no stock prices
          </h3>
          <button
            className="border shadow rounded px-2 my-2 cursor-pointer"
            onClick={() => openAddStocks()}
          >
            Add stock prices
          </button>
        </div>
      )}
    </div>
  );
};
