import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SelloLogo from "../assets/images/sello-logo.svg"
import MainImage from "../assets/images/main.jpg"

const Home = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="home-container">
      {/* Навигационная панель */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm navbar-custom">
        <div className="container">
          {/* Логотип */}
          <Link className="navbar-brand" to="/">
            <img
              src={SelloLogo}
              alt="Sello Logo"
              style={{ height: "40px" }}
            />
          </Link>

          {/* Ссылки авторизации или личный кабинет */}
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="text-dark me-3">
                  Привет, {user?.first_name || user?.username}
                </span>
                <Link
                  to="/profile"
                  className="text-dark text-decoration-none me-3"
                >
                  Личный кабинет
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-dark text-decoration-none me-2"
                >
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

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            
            {/* Главный текст */}
            <h1 className="home-title">
              СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ<br />ИНТЕРНЕТ-МАГАЗИН ЛЕГКО И БЫСТРО
            </h1>

            {/* Абзац */}
            <p className="home-subtitle mb-4">
              Весь ваш бизнес на одной платформе. Управляйте заказами, <br /> продавайте и доставляйте товары. <br /> Попробуйте прямо сейчас!
            </p>

            {/* Кнопка */}
            <div>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn btn-success fw-semibold d-inline-flex align-items-center justify-content-center"
                  style={{ 
                    width: '250px', 
                    height: '45px',
                    fontSize: '18px'
                  }}
                >
                  ПЕРЕЙТИ В КАБИНЕТ
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="btn btn-primary fw-semibold d-inline-flex align-items-center justify-content-center"
                  style={{ 
                    width: '250px', 
                    height: '45px',
                    fontSize: '18px'
                  }}
                >
                  НАЧАТЬ
                </Link>
              )}
            </div>

            {/* Фото */}
            <div className="mt-3">
              <img
                src={MainImage}
                alt="Интернет-магазин"
                className="img-fluid rounded shadow"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home