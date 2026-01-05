
import './App.css'
import {Routes, Route} from 'react-router-dom'

import NavBar from './components/common/NavBar'
import Cars from './pages/Cars'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResults'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'

import FloatingChatbot from './components/chatbot/FloatingChatbot'
import MyBookings from "./pages/MyBookings"

import ProtectedRoute from './components/common/ProtectedRoute'

import AdminRoute from "./components/common/AdminRoute"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminUsers from "./pages/admin/AdminUsers"
// import UserDetails from "./pages/admin/UserDetails"


export default function App() {
  return (
    <>
      
      <NavBar />

      <Routes>
        <Route path='/' element={<Cars/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path='/login' element= {<Login/>}/> 
        <Route path='/register' element= {<Register/>}/>
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path='/my-bookings' element={<ProtectedRoute><MyBookings/></ProtectedRoute>}/>


        <Route path='/admin' element={<AdminRoute><AdminLayout/></AdminRoute>}>
          <Route index element={<h2>Admin Dashboard</h2>} />
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='users' element={<AdminUsers/>}/>
        </Route>
      </Routes>

      <FloatingChatbot/>
    </>
  )
}
