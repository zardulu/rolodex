import React, { useState, useEffect } from 'react';
import './App.css';
import UserDetails from './components/UserDetails';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [usersPerPage] = useState(6); 
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Fetch user data from an API when the component mounts
  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => setError('Error fetching data'));
  }, []);

  // Calculate the index of the last and first user in the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input changes
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredUsers);
  };

  const handleExpandCard = (cardId) => {
    setExpandedCardId(cardId);
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black min-h-screen p-8">
      <div className="container font-sans mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6">Rolodex.</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Search by name"
          className="w-full p-3 border rounded mb-4 focus:outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="bg-white p-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUsers.map((user) => (
              <div
                className={`bg-white rounded-lg p-4`}
                key={user.id}
              >
                <UserDetails user={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
              } rounded`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
