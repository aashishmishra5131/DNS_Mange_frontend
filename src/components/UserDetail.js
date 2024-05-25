import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      <button onClick={() => navigate('/dashboard')} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Back to Dashboard</button>
      {user ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <p>Name: {user.fullname}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
