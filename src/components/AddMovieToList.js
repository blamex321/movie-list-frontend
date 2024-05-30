import React, { useState } from 'react';
import axios from 'axios';

const AddMovieToList = ({ movie, lists, onListCreated }) => {
  const [selectedList, setSelectedList] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleAddMovie = async () => {
    if (!selectedList) {
      alert('Please select a list');
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/lists/${selectedList}/movies`,
        { imdbID: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Movie added to list');
    } catch (err) {
      console.error('Error adding movie to list:', err.response ? err.response.data : err.message);
      alert('Failed to add movie to list');
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/lists`,
        { name: newListName, isPublic },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onListCreated(res.data);
      setSelectedList(res.data._id);
      setShowCreateForm(false);
      setNewListName('');
      setIsPublic(false);
    } catch (err) {
      console.error('Error creating list:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      {showCreateForm ? (
        <form onSubmit={handleCreateList} className="p-4 bg-white rounded shadow-md mb-4">
          <h2 className="text-xl mb-4">Create New List</h2>
          <div className="mb-2">
            <label className="block text-gray-700">List Name</label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Public</label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            Make this list public
          </div>
          <button type="submit" className="mt-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Create List
          </button>
        </form>
      ) : (
        <>
          <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} className="p-2 border border-gray-300 rounded">
            <option value="">Select a list</option>
            {lists.map(list => (
              <option key={list._id} value={list._id}>{list.name}</option>
            ))}
            <option value="create">Create new list</option>
          </select>
          {selectedList === 'create' && (
            <button onClick={() => setShowCreateForm(true)} className="ml-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Create New List
            </button>
          )}
          <button onClick={handleAddMovie} className="ml-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Add to List
          </button>
        </>
      )}
    </div>
  );
};

export default AddMovieToList;
