import PropTypes from 'prop-types';
import React from 'react';

import Stock from './Stock';

function StockList({ stocks, setStocks }) {
  const total = stocks.map(
    (stock) => stock.value * stock.quantity,
  ).reduce((acc, val) => acc + val, 0);

  const onAddQuantityHandler = (targetTicker) => {
    const newStocks = stocks.map((stock) => {
      if (stock.ticker === targetTicker) {
        return { ...stock, quantity: stock.quantity + 1 };
      }
      return stock;
    });
    setStocks(newStocks);
  };

  // TODO: potentially do some validation and
  // sum duplicate stock entries together in case stocks is malformed
  return (
    <ul>
      {stocks.map((stock) => (
        <Stock
          key={stock.ticker}
          ticker={stock.ticker}
          quantity={stock.quantity}
          value={stock.value}
          date={stock.date}
          idealStockPercentage={stock.idealStockPercentage}
          total={total}
          onAddQuantityHandler={onAddQuantityHandler}
        />
      ))}
    </ul>
  );
}

StockList.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      idealStockPercentage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setStocks: PropTypes.func.isRequired,
};

export default StockList;
