import React, { useState, useEffect } from 'react';
import StockList from './StockList';
import Header from './Header';
import AddStockButton from './AddStockButton';
import PieChart from './PieChart';
import fetchStockPrices from '../api/stock_api';
import Spinner from './Spinner/Spinner';

function Overview() {
  const [isLoading, setIsLoading] = useState(true); // set initial state to loading

  // TODO: this will eventually become empty, however, because we need this
  // to know what stocks to query for, we keep the default list in
  // however, we can only move off this until we get a concept of users / authentication
  // within the app
  const [stocks, setStocks] = useState([
    { ticker: 'VOO', quantity: 5, value: 500 },
    { ticker: 'V', quantity: 10, value: 23 },
    { ticker: 'MA', quantity: 5, value: 400 },
    { ticker: 'GOOGL', quantity: 5, value: 500 },
    { ticker: 'EBAY', quantity: 10, value: 23 },
    { ticker: 'MCO', quantity: 5, value: 400 },
  ]);

  useEffect(() => {
    // Function to fetch stock prices from API
    // Call fetchStockPrices function when component mounts
    const fetchData = async () => {
      try {
        // fetchStockPrices returns an array of [{ ticker, quantity, value, date }]
        const latestStockData = await fetchStockPrices(stocks);
        setStocks(latestStockData);
        setIsLoading(false); // set loading false once stock update is complete
      } catch (error) {
        console.error('Error fetching stock prices:', error);
      }
    };

    // Call fetchData function when component mounts
    // TODO?: Do this on a timeout function or a refresh button?
    fetchData();
  }, []); // Empty dependency array to run effect only once on component mountnt

  if (isLoading) {
    return <Spinner />;
  }

  // TODO: Make this a global list, potentially from a file too
  const allStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.' },
    { ticker: 'TSLA', name: 'Tesla, Inc.' },
  ];

  let addableStocks = null;
  if (stocks) {
    addableStocks = allStocks.filter(
      (stock) => !stocks.some((item) => item.ticker === stock.ticker),
    );
  } else {
    addableStocks = allStocks;
  }

  const onAddStockHandler = (newStock) => {
    setStocks((prevStocks) => [...prevStocks, { ...newStock }]);
  };

  const totalValue = stocks.reduce((total, stock) => total + (stock.quantity * stock.value), 0);

  return (
    <>
      <Header />
      <AddStockButton addableStocks={addableStocks} onAddStockHandler={onAddStockHandler} />
      <StockList stocks={stocks} setStocks={setStocks} />
      <p>
        Total:
        {totalValue.toFixed(2)}
      </p>
      <PieChart stocks={stocks} />
    </>
  );
}

export default Overview;
