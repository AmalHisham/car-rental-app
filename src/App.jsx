
import './App.css'
import {Routes, Route} from 'react-router-dom'

import NavBar from './components/common/NavBar'
import Cars from './pages/Cars'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Register from './pages/Register'
import Success from './pages/Success'

import ProtectedRoute from './components/common/ProtectedRoute'

export default function App() {
  return (
    <>
      
      <NavBar />

      <Routes>
        <Route path='/' element={<Cars/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path='/checkout' element= {<Checkout/>}/>  
        <Route path='/login' element= {<Login/>}/> 
        <Route path='/payment' element= {<Payment/>}/> 
        <Route path='/register' element= {<Register/>}/> 
        <Route path='/success' element= {<Success/>}/> 
      </Routes>
    </>
  )
}
