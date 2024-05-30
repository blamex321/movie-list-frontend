import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from './Navbar';

const MyListsPage = () => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/lists`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLists(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLists();
  }, []);

  const handleDeleteMovie = async (listId, movieId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/lists/${listId}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the local state to reflect the deletion
      setLists(prevLists => {
        return prevLists.map(list => {
          if (list._id === listId) {
            return {
              ...list,
              movies: list.movies.filter(movie => movie._id !== movieId)
            };
          }
          return list;
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/lists/${listId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the local state to remove the deleted list
      setLists(prevLists => prevLists.filter(list => list._id !== listId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-4">
        <nav className="flex items-center justify-between mb-4">
          <div>
            <Link to="/search" className="text-indigo-400 hover:text-indigo-200 mr-4">Back to Search</Link>
          </div>
        </nav>
        <h1 className="text-2xl font-bold mb-4">My Lists</h1>
        <div>
          {lists.map(list => (
            <div key={list._id} className="bg-white p-4 rounded shadow-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{list.name}</h2>
                <button onClick={() => handleDeleteList(list._id)} className="text-red-600 hover:text-red-800">Delete List</button>
              </div>
              <p className="text-sm text-gray-500 mb-2">{list.movies.length} movies</p>
              <ul>
                {list.movies.map(movie => (
                  <li key={movie._id} className="flex items-center justify-between">
                  {console.log(movie)}
                    <span>{movie.title} ({movie.year}{console.log(movie._id)})</span>
                    <button onClick={() => handleDeleteMovie(list._id, movie.imdbID)} className="text-red-600 hover:text-red-800">Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListsPage;
