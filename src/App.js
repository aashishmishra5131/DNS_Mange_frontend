import './App.css';
import Navbar from './components/Navbar';
import {Route, Routes } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login';
import Home from './components/Home';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
