import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="bg-[var(--bgcolorpage)] text-white px-6 py-3 rounded-lg hover:bg-[var(--activeColor)]"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;