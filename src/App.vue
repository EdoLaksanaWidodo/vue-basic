<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center">
    <!-- <header class="w-full py-4 bg-blue-600 text-white text-center font-bold text-2xl">
      My Application
    </header> -->
    <main class="flex flex-col items-center w-full max-w-4xl p-6 space-y-4">
      <!-- Komponen Dashboard dengan slot -->
      <!-- <Dashboard
        :Hari="Days"
        Text="Welcome to the Dashboard"
        Color="secondary"
        class="w-full border border-gray-300 p-4 rounded-lg bg-white shadow-md"
      >
        <p>This content is from App.vue</p>
      </Dashboard> -->
      
      <!-- Komponen Login -->
      <Login class="w-full max-w-md"/>
    </main>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Auth/Login.vue";

export default {
  components: {
    Dashboard,
    Login,
  },
  setup() {
    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return { Days };
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
