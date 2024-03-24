import PropTypes from 'prop-types';
import React from 'react';

function formatDateString(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `Last Updated at ${month}/${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes} PST`;
}

function Stock({
  ticker, quantity, value, date, idealStockPercentage, onAddQuantityHandler,
}) {
  return (
    quantity > 0 && (
      <li>
        {ticker}
        :
        {quantity}
        {' '}
        *
        {value}
        {' '}
        =
        {(quantity * value).toFixed(2)}
        ,
        {' '}
        {formatDateString(date)}
        , Desired Allocation=
        {idealStockPercentage}
        %
        <button type="button" onClick={() => onAddQuantityHandler(ticker)}>Increase Quantity</button>
      </li>
    )
  );
}

Stock.propTypes = {
  ticker: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  idealStockPercentage: PropTypes.number.isRequired,
  onAddQuantityHandler: PropTypes.func.isRequired,
};
export default Stock;
