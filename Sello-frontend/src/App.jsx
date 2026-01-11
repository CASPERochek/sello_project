import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import NewsPage from './components/NewsPage'
import BrandsPage from './components/BrandsPage'
import ProductsPage from './components/ProductsPage'
import CatalogTree from './components/CatalogTree'
import ConstructorPage from "./components/ConstructorPage";
import PreviewPage from "./components/PreviewPage";
import CreatorDashboard from './components/CreatorDashboard';
import UserDashboard from './components/UserDashboard';
import CartPage from './components/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Главная страница */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/catalog" element={<CatalogTree />} />
        <Route path="/constructor" element={<ConstructorPage />} /> {/* Конструктор */}
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/creator" element={<CreatorDashboard />} />
        <Route path="/user" element={<UserDashboard />} /> 
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  )
}

export default App;