import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const postTypeStyle = {
    fontWeight: 'bold',
    color: item.postType === 'lost' ? 'red' : 'green',
    textTransform: 'uppercase',
  };

  return (
    <div style={cardStyle}>
      <img src={item.itemImage} alt={item.title} style={imageStyle} />
      <h3>{item.title}</h3>
      <p style={postTypeStyle}>{item.postType}</p>
      <p>
        Posted by: {item.user.name}
      </p>
      <p>Location: {item.location || 'N/A'}</p>
      {/* We'll link to a details page later */}
      <Link to={`/item/${item._id}`}>View Details</Link>
    </div>
  );
};

export default ItemCard;