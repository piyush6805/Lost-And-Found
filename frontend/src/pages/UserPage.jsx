import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/users/${id}`);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('User not found');
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  const profileCardStyle = {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const avatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 1rem',
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={profileCardStyle}>
      {user && (
        <>
          <img
            src={user.profilePicture}
            alt={user.name}
            style={avatarStyle}
          />
          <h2>{user.name}</h2>
          <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
        </>
      )}
    </div>
  );
};

export default UserPage;