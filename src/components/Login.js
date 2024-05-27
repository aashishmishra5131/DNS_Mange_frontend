import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post(`https://dns-mange-backend.onrender.com/api/auth/login`, { email, password });
      if (response.status === 200) {
        console.log(response.data.user.id);
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('userId', response.data.user.id);
        console.log(response.data.user.email,"hsfshh")
        navigate('/dashboard');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      window.alert("Invaild")
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-900">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
        <div className="mt-4 text-sm">
          <p>Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
