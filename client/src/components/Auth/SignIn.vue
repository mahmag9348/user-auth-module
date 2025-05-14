<template>
  <div class="sign-in">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          class="form-control"
        />
        <div class="error" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          class="form-control"
        />
        <div class="error" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Sign In</button>
      <p>
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'SignIn',
  setup() {
    const store = useStore()
    const router = useRouter()

    const formData = reactive({
      email: '',
      password: ''
    })

    const rules = {
      email: { required, email },
      password: { required }
    }

    const v$ = useVuelidate(rules, formData)

    const handleSubmit = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return

      try {
        await store.dispatch('auth/signIn', formData)
        router.push('/dashboard')
      } catch (error) {
        console.error('Sign in error:', error)
      }
    }

    return {
      formData,
      v$,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.sign-in {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-control {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 0.875rem;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}
</style>
