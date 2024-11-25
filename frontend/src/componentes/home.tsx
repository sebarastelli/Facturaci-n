// LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Sistema de Facturación</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Home
        </Link>
        <Link
          to="/product-form"
          className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          Product Form
        </Link>
        <Link
          to="/product-list"
          className="px-6 py-3 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition"
        >
          Product List
        </Link>
        <Link
          to="/add-client-list"
          className="px-6 py-3 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition"
        >
          Add Client Form
        </Link>
        <Link
          to="/bill-form"
          className="px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
        >
          Bill Form
        </Link>
        <Link
          to="/bill-list"
          className="px-6 py-3 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition"
        >
          Bill List
        </Link>
        <Link
          to="/client-list"
          className="px-6 py-3 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600 transition"
        >
          Client List
        </Link>
      </div>
    </div>
  );
};

export default Home;
