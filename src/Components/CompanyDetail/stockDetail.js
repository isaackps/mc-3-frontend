import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal, showContent } from "../../reducers/modalReducer";
import { updateCompanyCode } from "../../reducers/stockReducer";

export const StockDetails = ({ stocks }) => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredStockPrice, setFilteredStockPrices] = useState([]);

  useEffect(() => {
    if (stocks.stockPrices.length > 0) {
      const sortedDates = stocks.stockPrices
        .map((obj) => new Date(obj.createdAt))
        .sort((a, b) => a - b);
      setStartDate(sortedDates[0].toISOString().split("T")[0]);
      setEndDate(
        sortedDates[sortedDates.length - 1].toISOString().split("T")[0]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks.stockPrices]);

  useEffect(() => {
    if (stocks.stockPrices.length > 0) {
      const filterSP = stocks.stockPrices.filter((price) => {
        const date = new Date(price.createdAt.slice(0, 10));
        return (
          date >= new Date(startDate.slice(0, 10)) &&
          date <= new Date(endDate.slice(0, 10))
        );
      });
      setFilteredStockPrices(filterSP);
      if (filterSP.length > 0) {
        setMin(
          filterSP.reduce(
            (min, obj) => (obj.price < min ? obj.price : min),
            filterSP[0].price
          )
        );
        setMax(
          filterSP.reduce((max, obj) => (obj.price > max ? obj.price : max), 0)
        );
        setAvg(
          filterSP.reduce((acc, obj) => acc + obj.price, 0) / filterSP.length
        );
      }
    }
  }, [stocks.stockPrices, startDate, endDate]);

  const openAddStocks = () => {
    dispatch(updateCompanyCode(stocks.companyCode));
    dispatch(openModal());
    dispatch(showContent("addStockPricesModal"));
  };

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-around">
        <div className="flex">
          <div>Stock prices start date:</div>
          <input
            type="date"
            className="ml-2 border rounded mb-2"
            value={startDate}
            onChange={(e) => handleStartChange(e)}
          />
        </div>
        <div className="flex">
          <div>Stock prices end date:</div>
          <input
            type="date"
            className="ml-2 border rounded mb-2"
            value={endDate}
            onChange={(e) => handleEndChange(e)}
          />
        </div>
      </div>
      {filteredStockPrice.length > 0 ? (
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
                {filteredStockPrice.map((stock, index) => {
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
