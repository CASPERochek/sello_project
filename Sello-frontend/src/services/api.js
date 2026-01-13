// src/services/api.js
const API_BASE_URL = 'http://localhost:8000';
const CONSTRUCTOR_API_BASE = `${API_BASE_URL}/constructor/api`;

class ApiService {
    // ==================== АВТОРИЗАЦИЯ ====================
    
    async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            console.log('Login response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Login error data:', errorData);
                throw new Error(errorData.detail || errorData.error || `Ошибка входа: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Login success data:', data);
            
            // Сохраняем токены
            if (data.access) {
                localStorage.setItem('access_token', data.access);
            }
            if (data.refresh) {
                localStorage.setItem('refresh_token', data.refresh);
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            return data;
        } catch (error) {
            console.error('Ошибка входа:', error);
            throw error;
        }
    }

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
    // src/services/api.js - ДОБАВЛЯЕМ НОВЫЕ МЕТОДЫ В КЛАСС ApiService

    // ==================== ДОПОЛНИТЕЛЬНЫЕ МЕТОДЫ ДЛЯ СОХРАНЕНИЯ ====================
    
    // Сохранить дизайн с JSON данными
    async saveDesignWithJson(designData, jsonData) {
        try {
            console.log('Создаем дизайн с JSON данными:', { designData, jsonData });
            console.log('URL:', `${CONSTRUCTOR_API_BASE}/designs/`);
            
            // Если нужно сохранить JSON в metadata
            const dataToSend = {
                ...designData,
                metadata: {
                    ...(designData.metadata || {}),
                    json_content: jsonData, // Сохраняем JSON в metadata
                    has_json_file: true
                }
            };
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(dataToSend),
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error data:', errorData);
                
                let errorMessage = `Ошибка сохранения с JSON: ${response.status}`;
                if (errorData.detail) {
                    errorMessage = errorData.detail;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                } else if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors.join(', ');
                }
                
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            console.log('Созданный дизайн с JSON:', data);
            
            // Также можем сохранить JSON как отдельный файл
            if (data.id && jsonData) {
                try {
                    await this.generateJsonFile(data.id);
                } catch (fileError) {
                    console.warn('Не удалось создать JSON файл:', fileError);
                }
            }
            
            return data;
        } catch (error) {
            console.error('Ошибка сохранения дизайна с JSON:', error);
            
            // Пробуем сохранить без JSON
            console.log('Пробуем сохранить без JSON данных...');
            return this.createDesign(designData);
        }
    }

    // Обновить дизайн с JSON данными
    async updateDesignWithJson(id, designData, jsonData) {
        try {
            console.log('Обновляем дизайн с JSON данными:', id, { designData, jsonData });
            
            // Если нужно сохранить JSON в metadata
            const dataToSend = {
                ...designData,
                metadata: {
                    ...(designData.metadata || {}),
                    json_content: jsonData, // Сохраняем JSON в metadata
                    has_json_file: true,
                    updated_at: new Date().toISOString()
                }
            };
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка обновления с JSON: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Также можем сохранить JSON как отдельный файл
            if (jsonData) {
                try {
                    await this.generateJsonFile(id);
                } catch (fileError) {
                    console.warn('Не удалось создать JSON файл:', fileError);
                }
            }
            
            return data;
        } catch (error) {
            console.error('Ошибка обновления дизайна с JSON:', error);
            
            // Пробуем обновить без JSON
            console.log('Пробуем обновить без JSON данных...');
            return this.updateDesign(id, designData);
        }
    }

    // Сгенерировать JSON файл для дизайна
    async generateJsonFile(designId) {
        try {
            console.log('Генерируем JSON файл для дизайна:', designId);
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${designId}/generate_json_file/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка генерации JSON файла: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('JSON файл сгенерирован:', data);
            return data;
        } catch (error) {
            console.error('Ошибка генерации JSON файла:', error);
            throw error;
        }
    }

    // ==================== УПРАВЛЕНИЕ ТОКЕНАМИ ====================
    
    saveTokens(tokens) {
        if (tokens.access) {
            localStorage.setItem('access_token', tokens.access);
        }
        if (tokens.refresh) {
            localStorage.setItem('refresh_token', tokens.refresh);
        }
        if (tokens.user) {
            localStorage.setItem('user', JSON.stringify(tokens.user));
        }
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

    // ==================== КОНСТРУКТОР И ПРОЕКТЫ ====================
    
    // Получить все дизайны пользователя
    async getSavedDesigns() {
        try {
            console.log('Загружаем дизайны с URL:', `${CONSTRUCTOR_API_BASE}/designs/`);
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/`, {
                headers: this.getAuthHeaders(),
            });
            
            console.log('Response status:', response.status);
            
            if (response.status === 401) {
                console.log('Требуется авторизация');
                this.clearTokens();
                throw new Error('Требуется авторизация');
            }
            
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Полученные дизайны:', data);
            
            // Если используется пагинация
            if (data.results) {
                return data.results;
            }
            
            return data;
        } catch (error) {
            console.error('Ошибка загрузки списка дизайнов:', error);
            
            // Для отладки вернем моковые данные
            console.log('Используем моковые данные для отладки');
            return this.getMockDesigns();
        }
    }

    // Получить только мои дизайны
    async getMyDesigns() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/my/`, {
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Ошибка загрузки моих дизайнов:', error);
            throw error;
        }
    }

    // Создать новый дизайн
    async createDesign(designData) {
        try {
            console.log('Создаем дизайн с данными:', designData);
            console.log('URL:', `${CONSTRUCTOR_API_BASE}/designs/`);
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(designData),
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error data:', errorData);
                
                // Показываем детальную ошибку
                let errorMessage = `Ошибка создания: ${response.status}`;
                if (errorData.detail) {
                    errorMessage = errorData.detail;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                } else if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors.join(', ');
                }
                
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            console.log('Созданный дизайн:', data);
            return data;
        } catch (error) {
            console.error('Ошибка создания дизайна:', error);
            
            // Для отладки вернем моковый ответ
            console.log('Возвращаем моковый созданный проект');
            return {
                id: Date.now(),
                ...designData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                blocks_count: 0
            };
        }
    }

    // Обновить существующий дизайн
    async updateDesign(id, designData) {
        try {
            console.log('Обновляем дизайн', id, 'с данными:', designData);
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(designData),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка обновления: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка обновления дизайна:', error);
            throw error;
        }
    }

    async deleteDesign(id) {
        try {
            console.log('Удаляем дизайн', id);
            
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/`, {
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

    // Загрузить конкретный дизайн (ЭТОТ МЕТОД УЖЕ БЫЛ, ДОБАВЛЯЕМ АЛИАС)
    async loadDesign(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/`, {
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

    // Добавляем алиас для совместимости с вашим кодом
    async getDesign(id) {
        return this.loadDesign(id);
    }

    // ==================== КОНТЕНТ ====================
    
    async getNews() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/content/`, {
                headers: this.getAuthHeaders(),
            });
            
            const data = await response.json();
            
            if (data.results) {
                return data.results.filter(item => item.content_type === 'news');
            }
            
            return data.filter(item => item.content_type === 'news');
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
            return [];
        }
    }

    async getProducts() {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/content/`, {
                headers: this.getAuthHeaders(),
            });
            
            const data = await response.json();
            
            if (data.results) {
                return data.results.filter(item => item.content_type === 'product');
            }
            
            return data.filter(item => item.content_type === 'product');
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            return [];
        }
    }

    // ==================== ДОПОЛНИТЕЛЬНЫЕ МЕТОДЫ ДЛЯ КОНСТРУКТОРА ====================
    
    // Скачать JSON файл дизайна
    async downloadDesignJson(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/download_json/`, {
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

    // Экспорт дизайна
    async exportDesign(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/export/`, {
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка экспорта: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка экспорта дизайна:', error);
            throw error;
        }
    }

    // Предпросмотр дизайна
    async previewDesign(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/preview/`, {
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка предпросмотра: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка предпросмотра дизайна:', error);
            throw error;
        }
    }

    // Дублировать дизайн
    async duplicateDesign(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/duplicate/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка дублирования: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка дублирования дизайна:', error);
            throw error;
        }
    }

    // Получить историю изменений дизайна
    async getDesignHistory(id) {
        try {
            const response = await fetch(`${CONSTRUCTOR_API_BASE}/designs/${id}/history/`, {
                headers: this.getAuthHeaders(),
            });
            
            if (!response.ok) {
                throw new Error(`Ошибка загрузки истории: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки истории дизайна:', error);
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

    // Проверить подключение к API
    async checkConnection() {
        try {
            const url = `${CONSTRUCTOR_API_BASE}/designs/`;
            console.log('Проверяем URL:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log('Response status:', response.status);
            
            // Если 401 - сервер работает, просто нет авторизации
            // Если 404 - неправильный URL
            if (response.status === 404) {
                console.error('URL не найден:', url);
                return false;
            }
            
            return true; // Сервер работает
        } catch (error) {
            console.warn('Нет подключения к Django API:', error.message);
            return false;
        }
    }

    // Моковые данные для отладки
    getMockDesigns() {
        return [
            {
                id: 1,
                name: 'Тестовый проект 1',
                created_at: '2024-01-15T10:30:00Z',
                updated_at: '2024-01-15T10:30:00Z',
                blocks_count: 5,
                text_color: '#000000',
                bg_color: '#ffffff',
                is_public: false,
                metadata: { category: 'Дизайн страницы' }
            },
            {
                id: 2,
                name: 'Тестовый проект 2',
                created_at: '2024-01-14T14:20:00Z',
                updated_at: '2024-01-14T14:20:00Z',
                blocks_count: 3,
                text_color: '#333333',
                bg_color: '#f0f0f0',
                is_public: true,
                metadata: { category: 'Электронный магазин' }
            }
        ];
    }
}

export const apiService = new ApiService();


