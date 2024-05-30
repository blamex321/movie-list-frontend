import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddMovieToList from './AddMovieToList';
import NavBar from './Navbar';
const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
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

  const handleListCreated = (newList) => {
    setLists([...lists, newList]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      setMovies(res.data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <NavBar />
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="mt-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(movie => (
          <div key={movie.imdbID} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">{movie.Title}</h3>
            <p className="text-sm">{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} className="w-full"/>
            <AddMovieToList movie={movie} lists={lists} onListCreated={handleListCreated} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MovieSearch;
