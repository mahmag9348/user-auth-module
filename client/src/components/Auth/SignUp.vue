<template>
  <div class="sign-up">
    <h2>Sign Up</h2>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
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
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          class="form-control"
        />
        <div class="error" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
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
        <div class="password-requirements">
          Password must be at least 8 characters long and include a letter, number, and special character.
        </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Signing up...' : 'Sign Up' }}
      </button>
      <p>
        Already have an account?
        <router-link to="/signin">Sign In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const passwordRegex = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

export default {
  name: 'SignUp',
  setup() {
    const store = useStore()
    const router = useRouter()
    const error = ref(null)
    const isLoading = ref(false)

    const formData = reactive({
      email: '',
      name: '',
      password: ''
    })

    const rules = {
      email: { 
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Please enter a valid email', email)
      },
      name: { 
        required: helpers.withMessage('Name is required', required),
        minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3))
      },
      password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8)),
        strongPassword: helpers.withMessage(
          'Password must include a letter, number, and special character',
          passwordRegex
        )
      }
    }

    const v$ = useVuelidate(rules, formData)

    const handleSubmit = async () => {
      error.value = null
      const isFormCorrect = await v$.value.$validate()
      
      if (!isFormCorrect) {
        return
      }

      isLoading.value = true

      try {
        // Create a clean copy of the form data
        const userData = {
          email: formData.email,
          name: formData.name,
          password: formData.password
        }

        await store.dispatch('auth/signUp', userData)
        router.push('/signin')
      } catch (err) {
        error.value = err.message || 'Failed to sign up. Please try again.'
        console.error('Sign up error:', err)
      } finally {
        isLoading.value = false
      }
    }

    return {
      formData,
      v$,
      handleSubmit,
      error,
      isLoading
    }
  }
}
</script>

<style scoped>
.sign-up {
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

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.password-requirements {
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #45a049;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
