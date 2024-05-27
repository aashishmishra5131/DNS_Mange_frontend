import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log formData for debugging

    try {
      const response = await axios.post(`https://dns-mange-backend.onrender.com/api/auth/register`, formData);
      if (response.status === 201) {
        console.log('Registration successful');
        window.alert("Registration successful");
        navigate('/login');
      } else {
        console.error('Registration failed:', response.statusText);
        window.alert(`Registration failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      window.alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-bold mb-2">FullName</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-600"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
        </form>
        <div className="mt-4 text-sm">
          <p>Already have an account? <Link to="/login" className="text-blue-600">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
