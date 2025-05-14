import { authApi, userApi, handleApiError } from '@/services/api'

export default {
  namespaced: true,
  
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    loading: false,
    error: null
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, { token, refreshToken }) {
      state.token = token
      state.refreshToken = refreshToken
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
    },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      state.refreshToken = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async signUp({ commit }, userData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const { data } = await authApi.signUp(userData)
        commit('SET_USER', data.user)
        commit('SET_TOKEN', {
          token: data.access_token,
          refreshToken: data.refresh_token
        })
        return data.user
      } catch (error) {
        const errorMessage = handleApiError(error)
        commit('SET_ERROR', errorMessage)
        throw errorMessage
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async signIn({ commit }, credentials) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const { data } = await authApi.signIn(credentials)
        commit('SET_USER', data.user)
        commit('SET_TOKEN', {
          token: data.access_token,
          refreshToken: data.refresh_token
        })
        return data.user
      } catch (error) {
        const errorMessage = handleApiError(error)
        commit('SET_ERROR', errorMessage)
        throw errorMessage
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async refreshToken({ commit, state }) {
      try {
        const { data } = await authApi.refreshToken(state.refreshToken)
        commit('SET_TOKEN', {
          token: data.access_token,
          refreshToken: data.refresh_token
        })
        return data.access_token
      } catch (error) {
        commit('CLEAR_AUTH')
        throw handleApiError(error)
      }
    },

    async logout({ commit }) {
      try {
        await authApi.logout()
        commit('CLEAR_AUTH')
      } catch (error) {
        console.error('Logout error:', error)
        // Still clear auth on error
        commit('CLEAR_AUTH')
        throw error
      }
    },

    async updateProfile({ commit }, userData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const { data } = await userApi.updateProfile(userData)
        commit('SET_USER', data)
        return data
      } catch (error) {
        const errorMessage = handleApiError(error)
        commit('SET_ERROR', errorMessage)
        throw errorMessage
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async changePassword({ commit }, passwordData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        await userApi.changePassword(passwordData)
      } catch (error) {
        const errorMessage = handleApiError(error)
        commit('SET_ERROR', errorMessage)
        throw errorMessage
      } finally {
        commit('SET_LOADING', false)
      }
    },

    clearError({ commit }) {
      commit('SET_ERROR', null)
    }
  },

  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
}
