<template>
    <div class="container mx-auto p-6">
      <h1 class="text-4xl font-bold text-center mb-6 text-black">Account Role List</h1>
      
      <!-- Input Pencarian -->
      <div class="mb-4 flex justify-end">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="w-1/4 p-1 border rounded shadow bg-white"
        />
      </div>
      
      <!-- Tabel -->
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full bg-white shadow-md rounded-lg">
          <thead class="text-black">
            <tr class="bg-gray-200">
              <th class="py-3 px-4 text-center">No</th>
              <th class="py-3 px-4 text-center">Account Name</th>
              <th class="py-3 px-4 text-center">Role Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(accountRole, index) in filteredAccountRoles"
              :key="accountRole.accountRoleId"
              class="hover:bg-gray-50"
            >
              <td class="border-b py-2 px-4 text-center">
                {{ index + 1 + (currentPage - 1) * perPage }}
              </td>
              <td class="border-b py-2 px-4 text-center">
                {{ accountRole.accountName }}
              </td>
              <td class="border-b py-2 px-4 text-center">
                {{ accountRole.roleName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination -->
      <div class="flex justify-center mt-4">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 mx-1 rounded bg-red-500 text-white hover:bg-red-700"
          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
        >
          Previous
        </button>
        <span class="px-3 py-1 mx-1">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages || totalItems <= perPage"
          class="px-3 py-1 mx-1 rounded bg-blue-500 text-white hover:bg-blue-700"
          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages || totalItems <= perPage}"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        accountRoles: [],
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
        totalPages: 0,
        searchQuery: '',
      };
    },
    mounted() {
      this.fetchAccountRoles();
    },
    computed: {
      filteredAccountRoles() {
        const filtered = this.accountRoles.filter((accountRole) => {
          return (
            accountRole.accountName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            accountRole.roleName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
        this.totalItems = filtered.length;
        this.totalPages = Math.ceil(this.totalItems / this.perPage);
  
        const start = (this.currentPage - 1) * this.perPage;
        return filtered.slice(start, start + this.perPage);
      },
    },
    methods: {
      fetchAccountRoles() {
        axios
          .get('https://localhost:7241/api/AccountRole', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token1'),
            },
          })
          .then((response) => {
            this.accountRoles = response.data.data;
            this.totalItems = this.accountRoles.length;
            this.totalPages = Math.ceil(this.totalItems / this.perPage);
            this.changePage(1);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      },
      changePage(page) {
        if (page > 0 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Style dapat disesuaikan di sini sesuai kebutuhan */
  </style>
  