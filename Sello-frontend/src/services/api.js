// src/services/api.js
const API_BASE_URL = 'http://localhost:8000';
const CONSTRUCTOR_API_BASE = `${API_BASE_URL}/api`;

class ApiService {
    // ==================== АВТОРИЗАЦИЯ ====================
    
    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Ошибка регистрации: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            throw error;
        }
    }

    async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Ошибка входа: ${response.status}`);
            }
            
            const data = await response.json();
            this.saveTokens(data);
            return data;
        } catch (error) {
            console.error('Ошибка входа:', error);
            throw error;
        }
    }

    async refreshToken() {
        try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
                throw new Error('Нет refresh токена');
            }

            const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
            
            if (!response.ok) {
                throw new Error('Не удалось обновить токен');
            }
            
            const data = await response.json();
            this.saveTokens(data);
            return data.access;
        } catch (error) {
            console.error('Ошибка обновления токена:', error);
            this.clearTokens();
            throw error;
        }
    }

    async logout() {
        try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
                await fetch(`${API_BASE_URL}/auth/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.getAccessToken()}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
            }
        } catch (error) {
            console.error('Ошибка выхода:', error);
        } finally {
            this.clearTokens();
        }
    }

    // ==================== УПРАВЛЕНИЕ ТОКЕНАМИ ====================
    
    saveTokens(tokens) {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        localStorage.setItem('user', JSON.stringify(tokens.user || {}));
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }

    isAuthenticated() {
        return !!this.getAccessToken();
    }

    // ==================== КОНСТРУКТОР ====================
    
    async getNews() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/content-items/news/`, {
                headers: this.getAuthHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
            return [];
        }
    }

    async getProducts() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/content-items/products/`, {
                headers: this.getAuthHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            return [];
        }
    }

    async saveDesign(designData) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/`, {
                method: 'POST',
                headers: this.getAuthHeadersWithContent(),
                body: JSON.stringify(designData),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Ошибка сохранения: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка сохранения дизайна:', error);
            throw error;
        }
    }

    async saveDesignWithJson(designData, jsonData) {
        try {
            const dataToSend = {
                ...designData,
                json_data: jsonData  // Добавляем JSON данные
            };
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/`, {
                method: 'POST',
                headers: this.getAuthHeadersWithContent(),
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.error || `Ошибка сохранения: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка сохранения дизайна с JSON:', error);
            throw error;
        }
    }

    async updateDesignWithJson(id, designData, jsonData) {
        try {
            const dataToSend = {
                ...designData,
                json_data: jsonData
            };
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/${id}/`, {
                method: 'PUT',
                headers: this.getAuthHeadersWithContent(),
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.error || `Ошибка обновления: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка обновления дизайна с JSON:', error);
            throw error;
        }
    }

    async loadDesign(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/${id}/`, {
                headers: this.getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки дизайна:', error);
            throw error;
        }
    }

    async getSavedDesigns() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/`, {
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                console.log('Response status:', response.status);
                return [];
            }
            
            const data = await response.json();
            console.log('API Response data:', data);
            return data;
        } catch (error) {
            console.error('Ошибка загрузки списка дизайнов:', error);
            return [];
        }
    }

    async deleteDesign(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/${id}/`, {
                method: 'DELETE',
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok && response.status !== 204) {
                throw new Error(`Ошибка удаления: ${response.status}`);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Ошибка удаления дизайна:', error);
            throw error;
        }
    }

    async downloadDesignJson(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/page-designs/${id}/download_json/`, {
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Ошибка загрузки: ${response.status}`);
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `design_${id}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            return { success: true };
        } catch (error) {
            console.error('Ошибка скачивания JSON:', error);
            throw error;
        }
    }

    // ==================== УТИЛИТЫ ====================
    
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        const token = this.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }

    getAuthHeadersWithContent() {
        return this.getAuthHeaders();
    }

    async checkConnection() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/content-items/`, {
                headers: this.getAuthHeaders(),
            });
            return response.ok;
        } catch (error) {
            console.warn('Нет подключения к Django API:', error.message);
            return false;
        }
    }

    async checkAuthConnection() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/`);
            return response.ok;
        } catch (error) {
            console.warn('Нет подключения к API авторизации');
            return false;
        }
    }
}

export const apiService = new ApiService();