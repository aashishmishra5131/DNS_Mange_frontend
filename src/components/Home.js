import React from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import { Fade } from 'react-awesome-reveal';

import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center bg-purple-200">
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-3xl text-center font-bold mb-4">Hi there!</div>
        <h2 className="text-4xl text-center font-bold mb-6">Welcome! to DNS Manager</h2>
        <h3 className="text-lg text-center mb-6">
          <ReactTyped
            strings={[
              'You will Directly Connect to DNS system on AWS Route 53',
              'One Click Deal',
            ]}
            typeSpeed={50}
            backSpeed={50}
            attr="placeholder"
            loop
          >
            <input type="text" className="border-b-2 border-blue-600 outline-none" disabled />
          </ReactTyped>
        </h3>
        <div className="text-center mb-6">
          <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300">Get started</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Fade className="p-4 bg-white rounded-lg shadow-md" cascade damping={0.1}>
            <p className="flex items-center">
              <IoMdCheckmarkCircleOutline className="text-green-500 mr-2" />
              <span className="font-bold">Seamless Backend API Integration:</span> Easily manage DNS settings with Directly Connect to DNS system on AWS Route 53.
            </p>
            <p className="flex items-center">
              <IoMdCheckmarkCircleOutline className="text-green-500 mr-2" />
              <span className="font-bold">Complete Control with CRUD Operations:</span> Enjoy full control over DNS records through intuitive Create, Read, Update, and Delete functions.
            </p>
            <p className="flex items-center">
              <IoMdCheckmarkCircleOutline className="text-green-500 mr-2" />
              <span className="font-bold">Guided User Experience:</span> Stay informed with clear alerts and notifications for hassle-free DNS management.
            </p>
            <p className="flex items-center">
              <IoMdCheckmarkCircleOutline className="text-green-500 mr-2" />
              <span className="font-bold">Secure Access Control:</span> Ensure data safety with robust user authentication and authorization.
            </p>
          </Fade>
          <Fade className="p-4 bg-white rounded-lg shadow-md" cascade damping={0.1}>
            <p className="flex items-center">
              <span className="font-bold">User-Friendly Dashboard:</span> Conveniently manage domains and records in a clear, organized dashboard.
              <IoMdCheckmarkCircleOutline className="text-green-500 ml-2" />
            </p>
            <p className="flex items-center">
              <span className="font-bold">Effortless Management:</span> Add, edit, or delete DNS records effortlessly with streamlined forms and modals.
              <IoMdCheckmarkCircleOutline className="text-green-500 ml-2" />
            </p>
            <p className="flex items-center">
              <span className="font-bold">Advanced Search and Filtering:</span> Quickly find information with powerful search and filtering options.
              <IoMdCheckmarkCircleOutline className="text-green-500 ml-2" />
            </p>
            <p className="flex items-center">
              <span className="font-bold">Insightful Data Visualization:</span> Gain insights with graphical charts illustrating domain and record type distribution.
              <IoMdCheckmarkCircleOutline className="text-green-500 ml-2" />
            </p>
            <p className="flex items-center">
              <span className="font-bold">Efficient Data Management:</span> Simplify tasks with CSV or JSON bulk uploads for seamless data handling.
              <IoMdCheckmarkCircleOutline className="text-green-500 ml-2" />
            </p>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Home;
