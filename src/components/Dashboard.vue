<template>
    <div class="p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
      <h1 class="text-2xl font-semibold text-green-500">{{ MyData }}</h1>
      <div class="border-2 border-yellow-400 p-4 rounded-lg">
        <slot></slot>
      </div>
  
      <button 
        class="btn btn-outline" 
        :class="stateshowModal ? 'loading loading-spinner text-error' : 'btn-primary'"
        @click="showModal"
      >
        Click
      </button>
  
      <div v-if="stateshowModal" class="p-4 mt-4 border-2 border-sky-400 rounded-lg bg-sky-100">
        <DashboardModal />
      </div>
      <div v-else class="p-4 mt-4 border-2 border-red-400 rounded-lg bg-red-100 text-red-600">
        <p>Tak de modal</p>
      </div>
  
      <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-300 mt-6">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">No</th>
              <th class="border border-gray-300 px-4 py-2">Months</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(month, index) in arrays" :key="index" class="text-center">
              <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ month }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="flex flex-col space-y-2 mt-4">
        <p class="text-gray-600">Hari: {{ Hari }}</p>
        <p class="text-gray-600">Text: {{ Text }}</p>
        <p class="text-gray-600">Color: {{ Color }}</p>
        <p class="text-gray-600">HariPayload: {{ HariPayload }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import DashboardModal from './Dashboard/DashboardModal.vue';
  
  export default {
    props: ["Hari", "Text", "Color"],
    components: {
      DashboardModal,
    },
    setup(props) {
      const MyData = "Rafly Kecepetan";
      const HariPayload = props.Hari.slice(0, 1);
      const stateshowModal = ref(false);
      const arrays = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
  
      const showModal = () => {
        stateshowModal.value = !stateshowModal.value;
      };
  
      return { MyData, stateshowModal, arrays, HariPayload, showModal };
    },
  };
  </script>
  
  <style scoped>
  /* Kosongkan atau tambahkan style spesifik yang Anda butuhkan */
  </style>
  