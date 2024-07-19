import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('stock_market');
  const [searchTermPersisted, setSearchTermPersisted] = useState('');
  const [filterPersisted, setFilterPersisted] = useState('stock_market');

  const fetchNews = async (page, searchTerm, filter) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'NEWS_SENTIMENT',
          apikey: 'Y5NLD75EWKROIBCI',
          topics: filter,
          page: page,
          q: searchTerm,
        },
      });
      console.log('API response:', response.data);
      const articles = response.data.feed || [];
      setNews(articles);
      setTotalPages(Math.ceil((response.data.total_results || 0) / 10)); // Adjust this based on actual API response
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page, searchTermPersisted, filterPersisted);
  }, [page, searchTermPersisted, filterPersisted]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTermPersisted(searchTerm);
    setFilterPersisted(filter);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-4 py-2 border rounded w-full text-black"
          />
          <select value={filter} onChange={handleFilterChange} className="px-4 py-2 border rounded text-black">
            <option value="stock_market">Stock Market</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="economy">Economy</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-700 transition duration-200">
            Search
          </button>
        </div>
      </form>
      {news.length === 0 ? (
        <div>Nothing seems to match your search</div>
      ) : (
        <ul>
          {news.map((article, index) => (
            <li key={index} className="mb-4 p-4 bg-white rounded-lg shadow-lg border-4 border-blue-400">
              <div className="flex justify-between items-center">
                <div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600">
                    {article.title}
                  </a>
                  <p className="text-black mt-2">{article.summary}</p>
                </div>
                <div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400 flex items-center justify-center text-white font-bold text-lg"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockNews;
