<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center">
    <!-- <header class="w-full py-4 bg-blue-600 text-white text-center font-bold text-2xl">
      My Application
    </header> -->
    <RouterView />
    <!-- <main class="flex flex-col items-center w-full max-w-4xl p-6 space-y-4">
      
    </main> -->
  </div>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
