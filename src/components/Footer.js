import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DNS Manager. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
