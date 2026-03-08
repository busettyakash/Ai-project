import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Deals from './pages/Deals'
import AnalyticsPage from './pages/AnalyticsPage'
import Documents from './pages/Documents'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
