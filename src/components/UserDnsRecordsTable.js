import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDNSRecordModal = ({ userId }) => {
  const [userDNSRecords, setUserDNSRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDNSRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://localhost:5000/api/dnsrecords/user/${userId}`, config);
        setUserDNSRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user DNS records:', error.message);
      }
    };
    fetchUserDNSRecords();
  }, [userId]);

  return (
    <div>
      <h2>User DNS Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userDNSRecords.map(record => (
            <li key={record._id}>
              <p>Type: {record.type}</p>
              <p>Name: {record.name}</p>
              <p>Value: {record.value}</p>
              <p>TTL: {record.ttl}</p>
              <p>Priority: {record.priority || '-'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDNSRecordModal;
