import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Optionally, you can redirect the user to the login page or any other page after logout.
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div>
        <Link to="/lists" className="text-indigo-400 hover:text-indigo-200 mr-4">My Lists</Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.username}</span>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-200">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-indigo-400 hover:text-indigo-200">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
