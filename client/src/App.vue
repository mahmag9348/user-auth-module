<template>
  <div id="app">
    <nav v-if="isAuthenticated" class="nav">
      <span class="welcome">Welcome, {{ currentUser?.name }}</span>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { authApi } from '@/services/api'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const currentUser = computed(() => store.getters['auth/currentUser'])

    const handleLogout = async () => {
      try {
        await authApi.logout()
        store.commit('auth/CLEAR_AUTH')
        router.push({ name: 'SignIn', replace: true })
      } catch (error) {
        console.error('Logout failed:', error)
        // Still clear auth and redirect on error
        store.commit('auth/CLEAR_AUTH')
        router.push({ name: 'SignIn', replace: true })
      }
    }

    return {
      isAuthenticated,
      currentUser,
      handleLogout
    }
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.nav {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome {
  font-weight: 500;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
