/*import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo *///}
     /*   <Link to="/" className="text-2xl font-bold text-indigo-700">
          Artify
        </Link>

        {/* Nav Links *///}
        /*<div className="flex items-center space-x-6">
          <Link to="/artworks" className="text-gray-700 hover:text-indigo-700 font-medium">
            All Artworks
          </Link>

          {userInfo?.role === "artist" && (
            <>
              <Link to="/upload" className="text-gray-700 hover:text-indigo-700 font-medium">
                Upload
              </Link>
              <Link to="/my-artworks" className="text-gray-700 hover:text-indigo-700 font-medium">
                My Artworks
              </Link>
              <Link to="/my-sales" className="text-gray-700 hover:text-indigo-700 font-medium">
                My Sales
              </Link>
            </>
          )}

          {userInfo?.role === "admin" && (
            <>
              <Link to="/admin/users" className="text-gray-700 hover:text-indigo-700 font-medium">
                Users
              </Link>
              <Link to="/admin/artworks" className="text-gray-700 hover:text-indigo-700 font-medium">
                Artworks
              </Link>
              <Link to="/admin/orders" className="text-gray-700 hover:text-indigo-700 font-medium">
                Orders
              </Link>
            </>
          )}

          {userInfo ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-700 font-medium">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-700 font-medium">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-700 font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;*/

// src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/userSlice";

// const Navbar = () => {
//   const { userInfo } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md px-4 md:px-10 py-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-indigo-700">Artify</Link>

//         <div className="flex items-center space-x-6">
//           <Link to="/artworks" className="text-gray-700 hover:text-indigo-700 font-medium">
//             All Artworks
//           </Link>

//           {userInfo?.role === "artist" && (
//             <>
//               <Link to="/upload">Upload</Link>
//               <Link to="/my-artworks">My Artworks</Link>
//               <Link to="/my-sales">My Sales</Link>
//             </>
//           )}

//           {userInfo?.role === "admin" && (
//             <>
//               <Link to="/admin/users">Users</Link>
//               <Link to="/admin/artworks">Artworks</Link>
//               <Link to="/admin/orders">Orders</Link>
//             </>
//           )}

//           {userInfo ? (
//             <>
//               <Link to="/profile">Profile</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import "./Navbar.css"; // Import your CSS

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Artify</Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/artworks">All Artworks</Link>

          {userInfo?.role === "artist" && (
            <>
              <Link to="/upload">Upload</Link>
              <Link to="/my-artworks">My Artworks</Link>
              <Link to="/my-sales">My Sales</Link>
            </>
          )}

          {userInfo?.role === "admin" && (
            <>
              <Link to="/admin/users">Users</Link>
              <Link to="/admin/artworks">Artworks</Link>
              <Link to="/admin/orders">Orders</Link>
            </>
          )}

          {userInfo ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
