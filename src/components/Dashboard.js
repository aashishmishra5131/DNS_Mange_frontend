import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUsers, FiBarChart2, FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import ModalChart from './ModalChart';


const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showAddData, setShowAddData] = useState(false);
  const [dnsRecord, setDnsRecord] = useState({
    type: 'A',
    name: '',
    value: '',
    ttl: 3600,
    priority: null
  });
  const [dnsRecords, setDnsRecords] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [nameError, setNameError] = useState('');
  const [valueError, setValueError] = useState('');
const [loading, setLoading] = useState(true);
const [showTable, setShowTable] = useState(true);
const [isUpdateMode, setIsUpdateMode] = useState(false);
const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);


  const userId = localStorage.getItem('userId');
  console.log(userId);

useEffect(() => {
  const fetchDnsRecords = async () => {
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

      const response = await axios.get(`https://dns-mange-backend.onrender.com/api/dnsrecords`, config);
      setDnsRecords(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching DNS records:', error.message);
    }
  };
  fetchDnsRecords();
}, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    logout();
    navigate('/');
  };

  const handleUpdate = (id) => {
    const recordToUpdate = dnsRecords.find(record => record._id === id);
    
    setDnsRecord({
      _id: recordToUpdate._id,  // Set the _id of the record to update
      type: recordToUpdate.type,
      name: recordToUpdate.name,
      value: recordToUpdate.value,
      ttl: recordToUpdate.ttl,
      priority: recordToUpdate.priority
    });
  
    setIsUpdateMode(true); // Set form mode to update
    setShowAddData(true);
    setShowTable(false);
  };
  
  
  
  const handleDelete = async (id) => {
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

      await axios.delete(`https://dns-mange-backend.onrender.com/api/dnsrecords/${id}`, config);
      setDnsRecords(dnsRecords.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting DNS record:', error.message);
    }
  };

  const handleUsersClick = async () => {
    try {
      const response = await axios.get(`https://dns-mange-backend.onrender.com/api/auth/users`);
      setUsers(response.data);
      setShowUsers(true);
      setShowAddData(false);
      setShowTable(true);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  

  const handleAddDataClick = () => {
    setShowUsers(false);
    setShowAddData(true);
    setShowTable(false); // Hide the table when add data is clicked
  };

  const handleChartsClick = () => {
    // Prepare data for charts
    const recordCounts = dnsRecords.reduce((acc, record) => {
      acc[record.type] = (acc[record.type] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.keys(recordCounts).map(type => ({
      name: type,
      value: recordCounts[type]
    }));

    setChartData(formattedData);
    setIsChartModalOpen(true);
    setShowUsers(false);
    setShowAddData(false);
    setShowTable(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDnsRecord({ ...dnsRecord, [name]: value });

    if (name === 'name') {
      const urlPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!urlPattern.test(value)) {
        setNameError('Please enter a valid URL (e.g., google.com)');
      } else {
        setNameError('');
      }
    }

    if (name === 'value') {
      const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
      const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;
      if (!ipv4Pattern.test(value) && !ipv6Pattern.test(value)) {
        setValueError('Please enter a valid IPv4 or IPv6 address');
      } else {
        setValueError('');
      }
    }
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (nameError || valueError) return;

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    if (isUpdateMode) {
      const response = await axios.put(`https://dns-mange-backend.onrender.com/api/dnsrecords/${dnsRecord._id}`, dnsRecord, config);
      setSubmittedData(response.data);
      // Update the DNS records in the state with the updated record
      setDnsRecords(dnsRecords.map(record => (record._id === dnsRecord._id ? response.data : record)));
      // Reset form and mode
      setIsUpdateMode(false);
      setDnsRecord({
        type: 'A',
        name: '',
        value: '',
        ttl: 3600,
        priority: null
      });
    } else {
      // Create new record
      const response = await axios.post(`https://dns-mange-backend.onrender.com/api/dnsrecords`, dnsRecord, config);
      setSubmittedData(response.data);
      // Add the new record to the DNS records in the state
      setDnsRecords([...dnsRecords, response.data]);
      // Reset form
      setDnsRecord({
        type: 'A',
        name: '',
        value: '',
        ttl: 3600,
        priority: null
      });
    }
  } catch (error) {
    console.error('Error submitting DNS record:', error.message);
  }
};

  

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-gray-800 text-white p-4 md:w-1/4">
        <Link to="/dashboard" className="text-white">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </Link>
        <ul className="mt-4">
          <li className="flex items-center py-2" onClick={handleUsersClick}>
            <FiUsers className="mr-2" />
            Users
          </li>
          <li className="flex items-center py-2" onClick={handleAddDataClick}>
            <FiPlusCircle className="mr-2" />
            Add Data
          </li>
          <li className="flex items-center py-2" onClick={handleChartsClick}>
            <FiBarChart2 className="mr-2" />
            Charts
          </li>
        </ul>
        <button onClick={handleLogout} className="bg-red-900 text-white mt-4 px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <div className="bg-white p-4 md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>



        {showUsers && (
          <ul>
            {users.map((user) => (
              <li key={user._id} className="mb-4">
                <p className="mb-1">Name: {user.fullname}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        )}

        {showAddData && (
          <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap">
            <div className="mb-2 w-full md:w-1/5 pr-2">
              <label className="block text-gray-700">Type:</label>
              <select
                name="type"
                value={dnsRecord.type}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                required
              >
                <option value="A">A</option>
                <option value="AAAA">AAAA</option>
                <option value="CNAME">CNAME</option>
                <option value="MX">MX</option>
                <option value="NS">NS</option>
                <option value="PTR">PTR</option>
                <option value="SOA">SOA</option>
                <option value="SRV">SRV</option>
                <option value="TXT">TXT</option>
                <option value="DNSSEC">DNSSEC</option>
              </select>
            </div>
            <div className="mb-2 w-full md:w-1/5 pr-2">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={dnsRecord.name}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                required
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
            <div className="mb-2 w-full md:w-1/5 pr-2">
              <label className="block text-gray-700">Value:</label>
              <input
                type="text"
                name="value"
                value={dnsRecord.value}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                required
              />
              {valueError && <p className="text-red-500 text-sm">{valueError}</p>}
            </div>
            <div className="mb-2 w-full md:w-1/5 pr-2">
              <label className="block text-gray-700">TTL:</label>
              <input
                type="number"
                name="ttl"
                value={dnsRecord.ttl}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-2 w-full md:w-1/5 pr-2">
              <label className="block text-gray-700">Priority:</label>
              <input
                type="number"
                name="priority"
                value={dnsRecord.priority || ''}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-2 w-full md:w-auto">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </form>
        )}
         
        {!loading && (
          <table className="border-collapse border border-gray-500 w-full">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">Type</th>
                <th className="border border-gray-500 px-4 py-2">Name</th>
                <th className="border border-gray-500 px-4 py-2">Value</th>
                <th className="border border-gray-500 px-4 py-2">TTL</th>
                <th className="border border-gray-500 px-4 py-2">Priority</th>
                <th className="border border-gray-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dnsRecords.map(record => (
                <tr key={record._id}>
                  <td className="border border-gray-500 px-4 py-2">{record.type}</td>
                  <td className="border border-gray-500 px-4 py-2">{record.name}</td>
                  <td className="border border-gray-500 px-4 py-2">{record.value}</td>
                  <td className="border border-gray-500 px-4 py-2">{record.ttl}</td>
                  <td className="border border-gray-500 px-4 py-2">{record.priority || '-'}</td>
                  <td className="border border-gray-500 px-4 py-2">
                    {record.userId === userId && (
                      <>
                        <button onClick={() => handleUpdate(record._id)} className="bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-green-700">Update</button>
                        <button onClick={() => handleDelete(record._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
         <ModalChart
          isOpen={isChartModalOpen}
          onRequestClose={() => setIsChartModalOpen(false)}
          data={chartData}
        />
      </div>
    </div>
  );
};

export default Dashboard;


