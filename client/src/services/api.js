import axios from 'axios'
import store from '../store'
import router from '../router'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
  validateStatus: function (status) {
    return status < 500; // Handle all statuses less than 500
  }
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post('http://localhost:4000/auth/refresh', {
            refreshToken
          })
          
          const { token } = response.data
          localStorage.setItem('token', token)
          api.defaults.headers.Authorization = `Bearer ${token}`
          originalRequest.headers.Authorization = `Bearer ${token}`
          
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh token fails, logout user and redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        store.dispatch('auth/logout')
        router.push('/signin')
      }
    }

    // Handle other common errors
    if (error.response?.data?.message) {
      store.dispatch('setError', error.response.data.message)
    } else if (error.message) {
      store.dispatch('setError', error.message)
    }

    return Promise.reject(error)
  }
)

export const authApi = {
  signIn: (credentials) => api.post('/auth/signin', credentials),
  signUp: (userData) => api.post('/auth/signup', userData),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  logout: async () => {
    let success = false;
    try {
      await api.post('/auth/logout');
      success = true;
    } catch (error) {
      console.log('Logout failed on server, clearing locally');
    }
    return { data: { message: success ? 'Logged out successfully' : 'Logged out locally' } };
  }
}

export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.post('/users/change-password', passwordData)
}

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  return error.message || 'An unexpected error occurred'
}
