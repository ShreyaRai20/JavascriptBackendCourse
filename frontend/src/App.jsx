
import { Outlet } from 'react-router-dom'
import './App.css'

import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/register.jsx';

function Logout() {
  localStorage.clear()
  return <Navigate to="login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterAndLogout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
