import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import SelloLogo from "../assets/images/sello-logo.svg"
import LoginBg from "../assets/images/login-bg.jpg"
import XIcon from "../assets/icon/x-icon.svg"
import EyeOpenIcon from "../assets/icon/eye-open-icon.svg"
import EyeCloseIcon from "../assets/icon/eye-close-icon.svg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем через контекст
        login(data.user, data.tokens);
        
        // Переходим на главную страницу
        navigate("/");
      } else {
        setError(data.error || "Ошибка входа");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  const clearEmail = () => setEmail("");
  const clearPassword = () => setPassword("");

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
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
                <h4 className="mt-3">ВОЙТИ В АККАУНТ</h4>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email*"
                    required
                  />
                  {email && (
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 p-0 text-decoration-none"
                      onClick={clearEmail}
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
                
                <div className="mb-4 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль*"
                    required
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
                    {password && (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={clearPassword}
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
                
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-2 fw-semibold mb-3 btn-login"
                  disabled={loading}
                >
                  {loading ? "ВХОД..." : "ВОЙТИ"}
                </button>
              </form>
              
              <div className="text-center">
                <span className="register-text">
                  <a href="/register" className="register-link">
                    Зарегистрировать
                  </a>{" "}
                  новый аккаунт
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;