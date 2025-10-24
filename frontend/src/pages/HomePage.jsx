import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../apiCalls/itemApi';
import ItemCard from '../components/ItemCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.item);

  useEffect(() => {
    // Fetch items when the component loads
    getAllItems(dispatch);
  }, [dispatch]);

  return (
    <div>
      <h1>Open Reports</h1>
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
          {items.length === 0 ? (
            <p>No items found. Be the first to post!</p>
          ) : (
            items.map((item) => <ItemCard key={item._id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;