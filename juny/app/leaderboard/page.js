"use client"
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://michaelape.site/portfolio_leaderboard');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status === 'success') {
          setLeaderboard(data.leaderboard);
        } else {
          throw new Error('Failed to fetch leaderboard data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center text-lg mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg mt-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Leaderboard</h2>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left text-gray-600">Rank</th>
            <th className="p-3 text-left text-gray-600">Username</th>
            <th className="p-3 text-left text-gray-600">Change</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-100 transition-colors">
              <td className="p-3 border-t">{index + 1}</td>
              <td className="p-3 border-t">{entry.username}</td>
              <td
                className={`p-3 border-t flex items-center ${
                  entry.daily_change_pct >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {entry.daily_change_pct >= 0 ? (
                  <span className="mr-2 text-green-500">&#9650;</span>
                ) : (
                  <span className="mr-2 text-red-500">&#9660;</span>
                )}
                {entry.daily_change_pct.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
