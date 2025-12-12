import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NewsPage from './components/NewsPage';
import BrandsPage from './components/BrandsPage';
import ProductsPage from './components/ProductsPage';

// Компонент для защиты маршрутов
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;