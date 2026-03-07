import "./App.css"
import { Routes, Route, useLocation } from "react-router-dom"

import NavBar from "./components/common/NavBar"
import Cars from "./pages/Cars"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SearchResults from "./pages/SearchResults"
import Checkout from "./pages/Checkout"
import PaymentSuccess from "./pages/PaymentSuccess"
import MyBookings from "./pages/MyBookings"

import FloatingChatbot from "./components/chatbot/FloatingChatbot"

import ProtectedRoute from "./components/common/ProtectedRoute"
import AdminRoute from "./components/common/AdminRoute"

import AdminLayout from "./pages/admin/AdminLayout"
import AdminCars from "./pages/admin/AdminCars"
import AdminUsers from "./pages/admin/AdminUsers"
import UserDetails from "./pages/admin/UserDetails"
import AdminDashboard from "./pages/admin/AdminDashboard"

export default function App() {
  const location = useLocation()

  // 👇 Hide navbar on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <>
      {!isAdminRoute && <NavBar />}

      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/cars" element={<Cars />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-results" element={<SearchResults />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<UserDetails />} />
        </Route>
      </Routes>

      {/* Optional: hide chatbot for admin too */}
      {!isAdminRoute && <FloatingChatbot />}
    </>
  )
}
