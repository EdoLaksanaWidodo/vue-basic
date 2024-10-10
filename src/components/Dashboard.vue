<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <NavBar />
      <div class="w-screen p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
        <h1 class="text-3xl font-bold text-gray-800">Welcome, {{ email }}</h1>
        <h1 class="border-2 border-red-700 text-2xl font-semibold text-red-500 text-center p-4 rounded-lg">{{ MyData }}</h1>

        <button 
          class="btn btn-outline" 
          :class="stateshowModal ? 'loading loading-spinner text-error' : 'btn-primary'"
          @click="showModal"
        >
          Toggle Modal
        </button>

        <div v-if="stateshowModal" class="p-4 mt-4 border-2 border-sky-400 rounded-lg bg-sky-100 shadow-md">
          <DashboardModal />
        </div>

        <div v-else class="p-4 mt-4 border-2 border-red-400 rounded-lg bg-red-100 text-red-600">
          <p>No modal currently displayed</p>
        </div>

        <div class="overflow-x-auto mt-6">
          <table class="table-auto w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-gray-300 px-4 py-2">No</th>
                <th class="border border-gray-300 px-4 py-2">Months</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(month, index) in arrays" :key="index" class="text-center hover:bg-gray-100 transition-colors">
                <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ month }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <div class="flex flex-col space-y-2 mt-4">
          <p class="text-gray-600">Hari: {{ Hari }}</p>
          <p class="text-gray-600">Text: {{ Text }}</p>
          <p class="text-gray-600">Color: {{ Color }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DashboardModal from './Dashboard/DashboardModal.vue';
import NavBar from './Layout/partials/NavBar.vue';
import Sidebar from './Layout/partials/Sidebar.vue';

export default {
  props: ["Hari", "Text", "Color", "email"],
  components: {
    DashboardModal,
    NavBar,
    Sidebar,
  },
  setup(props) {
    const MyData = "Rafly Kecepetan";
    const stateshowModal = ref(false);
    const arrays = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const showModal = () => {
      stateshowModal.value = !stateshowModal.value;
    };

    // Ambil email dari localStorage
    // const email = localStorage.getItem("email");

    return { MyData, stateshowModal, arrays, showModal};
  },
};
</script>

<style scoped>
/* Customize styles further as needed */
</style>
