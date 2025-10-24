import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        background: '#eee',
      }}
    >
      <Link to="/">
        <h2>Lost & Found</h2>
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/create-post" style={{ marginRight: '1rem' }}>
              Create Post
            </Link>

            <Link to="/profile" style={{ marginRight: '1rem' }}>
              Hi, {user.name}
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;