"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Page = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [timeFrame, setTimeFrame] = useState('1D'); // Default time frame
  const [apiKeys, setApiKeys] = useState({ alpaca_key: '', alpaca_secret: '' });

  // Fetch API keys using username from cookies
  const fetchApiKeys = async () => {
    try {
      const username = Cookies.get('username'); // Get the username cookie
      const response = await axios.get('http://localhost:8134/get_api_keys/'+ username);
      if (response.data.status === 'success') {
        setApiKeys({
          alpaca_key: response.data.alpaca_key,
          alpaca_secret: response.data.alpaca_secret,
        });
      } else {
        console.error('Failed to fetch API keys:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchPortfolioHistory = async () => {
    const options = {
      method: 'GET',
      url: `https://paper-api.alpaca.markets/v2/account/portfolio/history`,
      params: { intraday_reporting: 'market_hours', pnl_reset: 'per_day' },
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': apiKeys.alpaca_key,
        'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      setPortfolioData(data);
      filterData(data, timeFrame);
      console.log('Alpaca Portfolio Data:', data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      alert('Failed to fetch portfolio data. Please check your API keys and parameters.');
    }
  };

  useEffect(() => {
    if (apiKeys.alpaca_key && apiKeys.alpaca_secret) {
      fetchPortfolioHistory();
    }
  }, [apiKeys]);

  useEffect(() => {
    if (portfolioData) {
      filterData(portfolioData, timeFrame);
    }
  }, [timeFrame]);

  const filterData = (data, timeFrame) => {
    let filteredData;
    const timestamps = data.timestamp;
    const equity = data.equity;
    const currentTime = timestamps[timestamps.length - 1];

    switch (timeFrame) {
      case '1D':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400), // Last 1 day
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400))
        };
        break;
      case '5D':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 5), // Last 5 days
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 5))
        };
        break;
      case '1M':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 30), // Last 1 month
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 30))
        };
        break;
      case '3M':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 90), // Last 3 months
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 90))
        };
        break;
      case '1Y':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 365), // Last 1 year
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 365))
        };
        break;
      default:
        filteredData = data;
    }

    setFilteredData(filteredData);
  };

  const chartData = {
    labels: filteredData ? filteredData.timestamp.map(ts => new Date(ts * 1000).toLocaleString()) : [],
    datasets: [
      {
        label: 'Portfolio Value',
        data: filteredData ? filteredData.equity : [],
        borderColor: 'rgba(96, 165, 250, 1)', // blue-400
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        fill: true,
        tension: 0.1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      }
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              {portfolioData ? portfolioData.equity[portfolioData.equity.length - 1].toFixed(2) : 'Loading...'}
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Portfolio Value</p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            {portfolioData ? `${(((portfolioData.equity[portfolioData.equity.length - 1] - portfolioData.equity[0]) / portfolioData.equity[0]) * 100).toFixed(2)}%` : 'Loading...'}
            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5"
          >
            <option value="1D">1 Day</option>
            <option value="5D">5 Days</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
        <div id="area-chart" className="mt-6">
          {filteredData ? <Line data={chartData} options={chartOptions} /> : <p>Loading chart...</p>}
        </div>
      </div>
    </div>
  );
};

export default Page;
