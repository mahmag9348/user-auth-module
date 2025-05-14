import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Configure axios defaults for CORS
axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// Configure axios to include token in requests
axios.interceptors.request.use(config => {
  const token = store.state.auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
