<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-lg p-10 space-y-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-blue-500">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="email" class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              type="email" 
              v-model="email"
              class="input input-bordered w-full bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label for="password" class="label">
              <span class="label-text">Password</span>
            </label>
            <input 
              type="password" 
              v-model="password"
              class="input input-bordered w-full bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <button 
            type="button"
            class="btn btn-primary w-full"
            :disabled="isLoading" 
            @click.prevent="login"
          >
            <span v-if="isLoading" class="loading spinner-border"></span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        Don't have an account? 
        <a href="#" class="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);

    const parseJwt = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    };

    const login = () => {
      isLoading.value = true;
      const loginData = {
        username: email.value,
        password: password.value,
      };

      fetch("https://localhost:7241/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
      .then(response => response.json())
      .then(result => {
        if (result.data && result.data.token) {
          const payload = parseJwt(result.data.token);
          localStorage.setItem('userFullName', result.data.fullName);
          localStorage.setItem('token1', result.data.token);
          localStorage.setItem('jwtToken', result.data.token);
          localStorage.setItem('nik', payload.NIK);
          localStorage.setItem('roles', JSON.stringify(payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']));

          Swal.fire({
            position: "center",
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push('/dashboard');
          });
        } else {
          Swal.fire({
            position: "center",
            icon: 'error',
            title: result.message,
            showConfirmButton: false,
          });
        }
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: 'error',
          title: "An error occurred while logging in.",
          showConfirmButton: false,
        });
      })
      .finally(() => {
        isLoading.value = false;
      });
    };

    return { email, password, isLoading, login };
  },
};
</script>

<style scoped>
.loading {
  border: 2px solid transparent;
  border-top: 2px solid blue;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
