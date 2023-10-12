import React, { useState } from 'react';

const UserDetails = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false); // Control the visibility of additional details

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{user.name}</h2>
      {user.company && <p>Company: {user.company.name}</p>}
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      
       {/* Additional details are shown when 'showDetails' is true */}
      {showDetails && (
        <div>
          <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default UserDetails;
