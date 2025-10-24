import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../apiCalls/itemApi';
import ItemCard from '../components/ItemCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.item);

  // 1. Add state for the filter
  const [filter, setFilter] = useState('all'); // 'all', 'lost', 'found'

  useEffect(() => {
    // Fetch items when the component loads
    getAllItems(dispatch);
  }, [dispatch]);

  // 2. Create a filtered list based on the state
  // useMemo ensures this only re-calculates when 'items' or 'filter' changes
  const filteredItems = useMemo(() => {
    if (filter === 'all') {
      return items;
    }
    return items.filter((item) => item.postType === filter);
  }, [items, filter]);

  // 3. Styles for the tabs
  const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
  };

  const tabStyle = (type) => ({
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderBottom: filter === type ? '2px solid blue' : '2px solid transparent',
    fontWeight: filter === type ? 'bold' : 'normal',
  });

  return (
    <div>
      <h1>Open Reports</h1>

      {/* --- 4. Add the tab UI --- */}
      <div style={tabContainerStyle}>
        <div style={tabStyle('all')} onClick={() => setFilter('all')}>
          All
        </div>
        <div style={tabStyle('lost')} onClick={() => setFilter('lost')}>
          Lost
        </div>
        <div style={tabStyle('found')} onClick={() => setFilter('found')}>
          Found
        </div>
      </div>
      {/* --- End of tabs --- */}

      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* 5. Map over the filtered list */}
          {filteredItems.length === 0 ? (
            <p>No {filter !== 'all' ? filter : ''} items found.</p>
          ) : (
            filteredItems.map((item) => <ItemCard key={item._id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;