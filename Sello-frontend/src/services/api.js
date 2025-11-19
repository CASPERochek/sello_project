const API_BASE_URL = 'http://localhost:8000/api';

// Функция для регистрации
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Функция для логина
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// Сохранение токена в localStorage
export const saveTokens = (tokens) => {
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
};

// Получение access token
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};