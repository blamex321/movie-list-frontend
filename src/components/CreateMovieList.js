import React, { useState } from 'react';
import axios from 'axios';

const CreateMovieList = ({ onListCreated }) => {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/lists`, { name, movies: [], isPublic }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onListCreated(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col mb-4">
        <label className="mb-2">List Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2">Public</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Create List
      </button>
    </form>
  );
};

export default CreateMovieList;
