<template>
  <div class="dashboard">
    <div class="header">
      <h1>Welcome to the application, {{ currentUser?.name }}</h1>
    </div>
    <div class="content">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="user-info">
        <h2>Your Profile</h2>
        <div class="info-item">
          <strong>Email:</strong> {{ currentUser?.email }}
        </div>
        <div class="info-item">
          <strong>Name:</strong> {{ currentUser?.name }}
        </div>
        <div class="info-item">
          <strong>Account Created:</strong> 
          {{ new Date(currentUser?.createdAt).toLocaleDateString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { userApi } from '@/services/api'

export default {
  name: 'UserDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)
    const error = ref(null)

    const currentUser = computed(() => store.getters['auth/currentUser'])

    onMounted(async () => {
      try {
        const { data } = await userApi.getProfile()
        store.commit('auth/SET_USER', data)
      } catch (err) {
        error.value = 'Failed to load profile data'
        if (err.response?.status === 401) {
          store.dispatch('auth/logout')
          router.push('/signin')
        }
      } finally {
        loading.value = false
      }
    })

    return {
      currentUser,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 2rem;
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
  padding: 1rem;
  background: #ffebee;
  border-radius: 4px;
  margin: 1rem 0;
}
</style>
