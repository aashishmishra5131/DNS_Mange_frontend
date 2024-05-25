import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FiUsers, FiSettings, FiBarChart2, FiClipboard } from 'react-icons/fi';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const handleLogout = async () => {
    // Logout logic
  };

  const handleUsersClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/users');
      setUsers(response.data);
      setShowUsers(true);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-gray-800 text-white p-4 md:w-1/4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <ul className="mt-4">
          <li className="flex items-center py-2" onClick={handleUsersClick}>
            <FiUsers className="mr-2" />
            Users
          </li>
          <li className="flex items-center py-2">
            <FiSettings className="mr-2" />
            Settings
          </li>
          <li className="flex items-center py-2">
            <FiBarChart2 className="mr-2" />
            Charts
          </li>
          <li className="flex items-center py-2">
            <FiClipboard className="mr-2" />
            Reports
          </li>
        </ul>
        <button onClick={handleLogout} className="bg-red-900 text-white mt-4 px-4 py-2 rounded">Logout</button>
      </div>
      <div className="bg-white p-4 md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        {showUsers && (
         <ul>
         {users.map(user => (
           <li key={user._id} className="mb-4">
             <p className="mb-1">Name: {user.fullname}</p>
             <p>Email: {user.email}</p>
           </li>
         ))}
       </ul>
        )}
        {!showUsers && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg">Widget 1</div>
            <div className="bg-green-500 text-white p-4 rounded-lg">Widget 2</div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg">Widget 3</div>
            <div className="bg-red-500 text-white p-4 rounded-lg">Widget 4</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
