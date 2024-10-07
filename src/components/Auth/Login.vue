<template>
    <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-500">Login</h2>
        <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
            <div>
            <label for="email" class="label">
                <span class="label-text">Email</span>
            </label>
            <input 
                type="email" 
                class="input input-bordered w-full"
                placeholder="Enter your email"
            />
            </div>
            <div>
            <label for="password" class="label">
                <span class="label-text">Password</span>
            </label>
            <input 
                type="password" 
                class="input input-bordered w-full"
                placeholder="Enter your password"
            />
            </div>
        </div>
        <div class="flex items-center justify-between mt-6">
            <button 
            type="submit"
            class="btn btn-primary w-full"
            :disabled="isLoading" 
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

export default {
    setup() {
    const isLoading = ref(false);
  
    const handleSubmit = () => {
        isLoading.value = true;
  
        setTimeout(() => {
        isLoading.value = false;
        console.log("Login process completed");
        }, 2000);
    };
  
    return { isLoading, handleSubmit };
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
  