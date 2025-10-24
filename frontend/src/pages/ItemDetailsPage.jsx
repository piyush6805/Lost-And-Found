import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById } from '../apiCalls/itemApi';
import { closeCase } from '../apiCalls/itemApi';

const ItemDetailsPage = () => {
  const { id } = useParams(); // Gets the ':id' from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentItem, loading, error } = useSelector((state) => state.item);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch the item details when the component loads
    getItemById(dispatch, id);
  }, [dispatch, id]);

  const handleCloseCase = () => {
    if (window.confirm('Are you sure you want to close this case?')) {
      closeCase(dispatch, id, token);
      // Optional: navigate away after closing
      // navigate('/'); 
    }
  };
  if (loading && !currentItem) {
    return <div>Loading item details...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!currentItem) {
    return <div>Item not found.</div>;
  }

  const isOwner = user && user._id === currentItem.user._id;

  // Styles
  const pageStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    
  };

  const imageStyle = {
    width: '10I0%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '8px',
  };

  const infoStyle = {
    background: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem',
  };

  const postTypeStyle = {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: currentItem.postType === 'lost' ? 'red' : 'green',
    textTransform: 'uppercase',
    color: currentItem.status === 'closed' ? '#555' : (currentItem.postType === 'lost' ? 'red' : 'green'),
  };

  const closeButtonStyle = {
    background: '#28a745',
    color: 'white',
    width: '100%',
    marginTop: '1rem',
    fontSize: '1.1rem'
  }

  return (
    <div style={pageStyle}>
      <h1 style={postTypeStyle}>
        {/* {currentItem.postType}: {currentItem.title} */}
        {`[${currentItem.status.toUpperCase()}]`} {currentItem.postType}: {currentItem.title}
      </h1>

      <img
        src={currentItem.itemImage}
        alt={currentItem.title}
        style={imageStyle}
      />

      <h2>Description</h2>
      <p>{currentItem.description}</p>

      <div style={infoStyle}>
        <h3>Item Details</h3>
        <p>
          <strong>Category:</strong> {currentItem.category}
        </p>
        <p>
          <strong>Location:</strong> {currentItem.location || 'N/A'}
        </p>
        <p>
          <strong>Posted On:</strong>{' '}
          {new Date(currentItem.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div style={infoStyle}>
        <h3>Contact Info</h3>
        <p>
          <strong>Posted by:</strong> {currentItem.user.name}
        </p>
        <p>
          <strong>Contact Email:</strong> {currentItem.user.email}
        </p>
        <p>
          <strong>Contact Phone:</strong>{' '}
          {currentItem.user.contactNumber || 'N/A'}
        </p>
      </div>

      {isOwner && currentItem.status === 'open' && (
        <button 
          onClick={handleCloseCase} 
          style={closeButtonStyle}
          disabled={loading}
        >
          {loading ? 'Closing...' : 'Mark as Resolved (Close Case)'}
        </button>
      )}

      {currentItem.status === 'closed' && (
         <p style={{...closeButtonStyle, background: '#6c757d', textAlign: 'center'}}>This case is closed.</p>
      )}
      
    </div>
  );
};

export default ItemDetailsPage;