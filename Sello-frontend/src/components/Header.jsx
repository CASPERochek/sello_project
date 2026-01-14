import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SelloLogo from "../assets/images/sello-logo.svg";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="navbar-custom shadow-sm" style={{ height: '56px' }}>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm navbar-custom h-100" style={{
        backgroundColor: '#ffe082'
      }}>
        <div className="container h-100">
          {/* Логотип */}
          <Link className="navbar-brand d-flex align-items-center h-100 ps-3" to="/">
            <img src={SelloLogo} alt="Sello Logo" style={{ height: "40px" }} />
          </Link>

          {/* Ссылки авторизации */}
          <div className="d-flex align-items-center h-100">
            {isAuthenticated ? (
              <>
                <span className="text-dark me-3">
                  Привет, {user?.first_name || user?.username}
                </span>
                
                
                
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-dark text-decoration-none me-2">
                  Вход
                </Link>
                <span className="text-dark mx-1">/</span>
                <Link
                  to="/register"
                  className="text-dark text-decoration-none ms-2"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;