// src/App.js
import React from "react";
import PrivateRoute from "./components/routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllArtworksPage from "./pages/AllArtworksPage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import UploadArtworkPage from "./pages/UploadArtworkPage";
import EditBlog from "./pages/EditBlogPage";import MyArtworksPage from "./pages/MyArtworksPage";
import MySalesPage from "./pages/MySalesPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import CheckoutPage from "./pages/CheckoutPage";

import AdminRoute from "./components/routes/AdminRoute";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminArtworksPage from "./pages/AdminArtworksPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";




function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/artworks" element={<AllArtworksPage />} />
            <Route path="/artworks/:id" element={<ArtworkDetailPage />} />
            <Route path="/upload" element={<UploadArtworkPage />} />
            <Route path="/artwork/:id/edit-blog" element={<EditBlog />} />

            <Route path="/my-artworks" element={<MyArtworksPage />} />
            <Route path="/my-sales" element={<MySalesPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route
              path="/checkout/:id"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsersPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/artworks"
              element={
                <AdminRoute>
                  <AdminArtworksPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrdersPage />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />



      </div>
    </Router>
  );
}

export default App;

