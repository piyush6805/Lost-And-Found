import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../apiCalls/itemApi';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { historyItems, loading, error } = useSelector((state) => state.item);

  useEffect(() => {
    getHistory(dispatch);
  }, [dispatch]);

  // Simple table styling
  const tableStyle = {
    width: '100%',
    marginTop: '2rem',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    background: '#eee',
    padding: '0.75rem',
    border: '1px solid #ccc',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '0.75rem',
    border: '1px solid #ccc',
  };

  return (
    <div>
      <h2>Resolved Case History</h2>
      <p>This page shows all items that have been successfully resolved.</p>

      {loading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Posted By</th>
              <th style={thStyle}>Date Resolved</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {historyItems.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ ...tdStyle, textAlign: 'center' }}>
                  No resolved cases yet.
                </td>
              </tr>
            ) : (
              historyItems.map((item) => (
                <tr key={item._id}>
                  <td style={tdStyle}>{item.title}</td>
                  <td style={{ ...tdStyle, textTransform: 'capitalize' }}>
                    {item.postType}
                  </td>
                  <td style={tdStyle}>{item.user.name}</td>
                  <td style={tdStyle}>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={tdStyle}>
                    <Link to={`/item/${item._id}`}>View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;