
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

export default function App() {
  return (
    <>
      <h1>app is rendering</h1>
      <NavBar />

      <Routes>
        <Route path='/' element={<Cars />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element= {<Checkout/>}/>  
        <Route path='/login' element= {<Login/>}/> 
        <Route path='/payment' element= {<Payment/>}/> 
        <Route path='/register' element= {<Register/>}/> 
        <Route path='/success' element= {<Success/>}/> 
      </Routes>
    </>
  )
}
