import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '300px', // Fixed width
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    background: '#fff',
  };

  const imageContainerStyle = {
    width: '100%',
    height: '200px', // Fixed height for the container
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden', // Hide overflow
  };

  const imageStyle = {
    width: '100%',
    height: '100%', // Make image fill the container
    objectFit: 'cover', // Cover the container, cropping if necessary
  };

  const postTypeStyle = {
    fontWeight: 'bold',
    color: item.postType === 'lost' ? 'red' : 'green',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  };

  // Define placeholder
  const placeholder = 'https://via.placeholder.com/350x250.png?text=No+Image';

  return (
    <div style={cardStyle}>
      <Link
        to={`/item/${item._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div style={imageContainerStyle}>
          <img
            src={item.itemImage || placeholder}
            alt={item.title}
            style={imageStyle}
          />
        </div>
        <h3>{item.title}</h3>
      </Link>
      <p style={postTypeStyle}>{item.postType}</p>
      
      {/* --- THIS IS THE CHANGE --- */}
      <p style={{ fontSize: '0.9rem', color: '#555' }}>
        Posted by: <Link to={`/user/${item.user._id}`}>{item.user.name}</Link>
      </p>
      {/* --- END OF CHANGE --- */}

      <p style={{ fontSize: '0.9rem', color: '#555' }}>
        Location: {item.location || 'N/A'}
      </p>

      <Link
        to={`/item/${item._id}`}
        className="button-link"
        style={{ marginTop: '1rem', display: 'block' }}
      >
        View Details
      </Link>
    </div>
  );
};

export default ItemCard;