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

    <header> 
      <Link to="/">
        <h2>Lost & Found</h2>
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/create-post">
              Create Post
            </Link>
            <Link to="/profile">
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