import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SelloLogo from "../assets/images/sello-logo.svg"
import LoginBg from "../assets/images/login-bg.jpg"
import XIcon from "../assets/icon/x-icon.svg"
import EyeOpenIcon from "../assets/icon/eye-open-icon.svg"
import EyeCloseIcon from "../assets/icon/eye-close-icon.svg"

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Пароли не совпадают")
      return
    }
    
    setPasswordError("")
    setLoading(true)

    try {
      // Отправка данных в бэк
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.login,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Регистрация успешна:', data)
        
        // Автоматически логиним пользователя после регистрации
        try {
          const loginResponse = await fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.login,
              password: formData.password,
            }),
          })

          const loginData = await loginResponse.json()

          if (loginResponse.ok) {
            // Сохраняем через контекст
            login(loginData.user, loginData.tokens)
            // Перенаправление на главную страницу
            navigate("/")
          } else {
            // Если автоматический вход не удался, переходим на страницу логина
            navigate("/login")
          }
        } catch (loginError) {
          console.error('Ошибка автоматического входа:', loginError)
          navigate("/login")
        }
      } else {
        console.error('Ошибка регистрации:', data)
        // Обработка ошибок с бэкенда
        if (data.error) {
          setError(data.error)
        } else if (data.username) {
          setError(`Ошибка логина: ${data.username[0]}`)
        } else if (data.email) {
          setError(`Ошибка email: ${data.email[0]}`)
        } else if (data.password) {
          setError(`Ошибка пароля: ${data.password[0]}`)
        } else {
          setError('Ошибка регистрации: ' + JSON.stringify(data))
        }
      }
    } catch (error) {
      console.error('Ошибка сети:', error)
      setError('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Очищаем ошибку пароля при изменении полей
    if ((name === 'password' || name === 'confirmPassword') && passwordError) {
      setPasswordError("")
    }
    
    // Очищаем общую ошибку при изменении любого поля
    if (error) {
      setError("")
    }
  }

  const clearField = (fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: ""
    })
    
    // Очищаем ошибку пароля если очищаем поля паролей
    if ((fieldName === 'password' || fieldName === 'confirmPassword') && passwordError) {
      setPasswordError("")
    }
    
    // Очищаем общую ошибку
    if (error) {
      setError("")
    }
  }

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        {/* Изображение */}
        <div className="col-md-6 d-none d-md-block">
          <div
            className="h-100 w-100"
            style={{
              backgroundImage: `url(${LoginBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Правая часть - форма регистрации */}
        <div className="col-md-6 col-12">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="w-75" style={{ maxWidth: "400px" }}>
              <div className="text-center mb-4">
                <img
                  src={SelloLogo}
                  alt="Sello Logo"
                  className="mb-3"
                  style={{ height: "50px" }}
                />
                <h4 className="mt-3">СОЗДАТЬ АККАУНТ</h4>
              </div>

              {/* Сообщение об ошибке */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Имя */}
                <div className="mb-3 position-relative">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Имя*"
                    required
                  />
                  {formData.firstName && (
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0 text-decoration-none"
                      onClick={() => clearField("firstName")}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={XIcon}
                        alt="Clear"
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                  )}
                </div>

                {/* Фамилия */}
                <div className="mb-3 position-relative">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Фамилия*"
                    required
                  />
                  {formData.lastName && (
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0 text-decoration-none"
                      onClick={() => clearField("lastName")}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={XIcon}
                        alt="Clear"
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                  )}
                </div>

                {/* Логин */}
                <div className="mb-3 position-relative">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Логин*"
                    required
                  />
                  {formData.login && (
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0 text-decoration-none"
                      onClick={() => clearField("login")}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={XIcon}
                        alt="Clear"
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3 position-relative">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    required
                  />
                  {formData.email && (
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0 text-decoration-none"
                      onClick={() => clearField("email")}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={XIcon}
                        alt="Clear"
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                  )}
                </div>

                {/* Пароль */}
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Пароль*"
                    required
                    minLength="8"
                  />
                  <div className="position-absolute end-0 top-50 translate-middle-y me-2 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                        alt={showPassword ? "Hide" : "Show"}
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                    {formData.password && (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => clearField("password")}
                        style={{ width: "24px", height: "24px", padding: "0" }}
                      >
                        <img
                          src={XIcon}
                          alt="Clear"
                          width="20"
                          height="20"
                          style={{ filter: "grayscale(80%) opacity(0.7)" }}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Подтверждение пароля */}
                <div className="mb-3 position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control form-control-lg ${passwordError ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Подтвердите пароль*"
                    required
                    minLength="8"
                  />
                  <div className="position-absolute end-0 top-50 translate-middle-y me-2 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ width: "24px", height: "24px", padding: "0" }}
                    >
                      <img
                        src={showConfirmPassword ? EyeOpenIcon : EyeCloseIcon}
                        alt={showConfirmPassword ? "Hide" : "Show"}
                        width="20"
                        height="20"
                        style={{ filter: "grayscale(80%) opacity(0.7)" }}
                      />
                    </button>
                    {formData.confirmPassword && (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => clearField("confirmPassword")}
                        style={{ width: "24px", height: "24px", padding: "0" }}
                      >
                        <img
                          src={XIcon}
                          alt="Clear"
                          width="20"
                          height="20"
                          style={{ filter: "grayscale(80%) opacity(0.7)" }}
                        />
                      </button>
                    )}
                  </div>
                  
                  {/* Сообщение об ошибке */}
                  {passwordError && (
                    <div className="invalid-feedback d-block">
                      {passwordError}
                    </div>
                  )}
                </div>

                {/* Кнопка регистрации */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-2 fw-semibold mb-3 btn-login"
                  disabled={loading}
                >
                  {loading ? "РЕГИСТРАЦИЯ..." : "ЗАРЕГИСТРИРОВАТЬСЯ"}
                </button>
              </form>

              {/* Ссылка на вход */}
              <div className="text-center">
                <span className="register-text">
                  <a href="/login" className="register-link">
                    Войти
                  </a>{" "}
                  в уже существующий аккаунт
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register