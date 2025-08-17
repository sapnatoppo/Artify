import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="mt-2">Page Not Found</p>
      <Link to="/" className="text-blue-600 underline mt-4 block">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
