import React from 'react'

const fetchPortfolioHistory = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': apiKeys.alpaca_key,
        'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
      }
    };

    try {
      const response = await fetch(`https://paper-api.alpaca.markets/v2/account/portfolio/history?intraday_reporting=market_hours&pnl_reset=per_day`, options);
      const data = await response.json();
      setPortfolioData(data);
      filterData(data, timeFrame);
      console.log('Alpaca Portfolio Data:', data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      toast.error('Failed to fetch portfolio data. Please check your API keys and parameters.');
    }
  };

const page = () => {
  return (
    <div>page</div>
  )
}

export default page