<template>
    <div class="register-page mx-auto max-w-6xl px-4">
      <br />
      <button @click="showModal = true" class="btn btn-primary bg-blue-500 text-white">Register</button>
  
      <div v-if="showModal" class="modal modal-open">
        <div class="modal-box">
          <h2 class="text-xl font-bold">Register</h2>
          <form @submit.prevent="submitForm">
            <div class="form-control mb-4">
              <label for="firstname" class="label">
                <span class="label-text">First Name<span class="text-danger">*</span></span>
              </label>
              <input v-model="formData.firstname" type="text" class="input input-bordered" required />
            </div>
            <div class="form-control mb-4">
              <label for="lastname" class="label">
                <span class="label-text">Last Name<span class="text-danger">*</span></span>
              </label>
              <input v-model="formData.lastname" type="text" class="input input-bordered" required />
            </div>
            <div class="form-control mb-4">
              <label for="phone" class="label">
                <span class="label-text">Phone<span class="text-danger">*</span></span>
              </label>
              <input v-model="formData.phone" type="text" class="input input-bordered" required />
            </div>
            <div class="form-control mb-4">
              <label for="birthDate" class="label">
                <span class="label-text">Birth Date<span class="text-danger">*</span></span>
              </label>
              <input v-model="formData.birthDate" type="date" class="input input-bordered" required />
            </div>
            <div class="form-control mb-4">
              <label for="email" class="label">
                <span class="label-text">Email<span class="text-danger">*</span></span>
              </label>
              <input v-model="formData.email" type="email" class="input input-bordered" required />
            </div>
            <div class="form-control mb-4">
              <label for="degree" class="label">
                <span class="label-text">Degree<span class="text-danger">*</span></span>
              </label>
              <select v-model="formData.degree" class="select select-bordered" required>
                <option value="">-- Select a Degree --</option>
                <option value="D3">D3</option>
                <option value="D4">D4</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
            </div>
            <div class="form-control mb-4">
              <label for="gpa" class="label">
                <span class="label-text">GPA<span class="text-danger">*</span></span>
              </label>
              <input
                v-model="formData.gpa"
                type="number"
                class="input input-bordered"
                min="1"
                max="4"
                step="0.01"
                placeholder="e.g. 3.89"
                required
              />
            </div>
            <div class="form-control mb-4">
              <label for="univName" class="label">
                <span class="label-text">University<span class="text-danger">*</span></span>
              </label>
              <select v-model="formData.univ_Id" class="select select-bordered" required>
                <option value="">-- Select a University --</option>
                <option v-for="university in universities" :key="university.id" :value="university.id">
                  {{ university.name }}
                </option>
              </select>
            </div>
            <div class="modal-action">
              <button type="button" class="btn" @click="showModal = false">Close</button>
              <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Save changes</button>
            </div>
          </form>
        </div>
      </div>
  
      <table class="min-w-full bg-white shadow-md rounded-lg mt-5">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-3 px-4 text-left">No</th>
            <th class="py-3 px-4 text-left">NIK</th>
            <th class="py-3 px-4 text-left">Full Name</th>
            <th class="py-3 px-4 text-left">Phone</th>
            <th class="py-3 px-4 text-left">Birth Date</th>
            <th class="py-3 px-4 text-left">Email</th>
            <th class="py-3 px-4 text-left">Degree</th>
            <th class="py-3 px-4 text-left">GPA</th>
            <th class="py-3 px-4 text-left">University Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in paginatedAccounts" :key="account.id">
            <td class="border-b py-2 px-4 text-center">{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td class="border-b py-2 px-4 text-center">{{ account.nik }}</td>
            <td class="border-b py-2 px-4">{{ account.fullName }}</td>
            <td class="border-b py-2 px-4 text-center">{{ account.phone }}</td>
            <td class="border-b py-2 px-4 text-center">{{ account.birthDate }}</td>
            <td class="border-b py-2 px-4">{{ account.email }}</td>
            <td class="border-b py-2 px-4 text-center">{{ account.degree }}</td>
            <td class="border-b py-2 px-4 text-center">{{ account.gpa }}</td>
            <td class="border-b py-2 px-4">{{ getUniversityName(account.univ_Id) }}</td>
          </tr>
        </tbody>
      </table>
  
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
  import axios from "axios";
  import { ref, onMounted, computed } from "vue";
  
  export default {
    setup() {
      const showModal = ref(false);
      const accounts = ref([]);
      const universities = ref([]);
      const formData = ref({
        firstname: "",
        lastname: "",
        phone: "",
        birthDate: "",
        email: "",
        degree: "",
        gpa: "",
        univ_Id: "",
      });
      const currentPage = ref(1);
      const perPage = ref(10);
  
      const fetchAccounts = async () => {
        try {
          const response = await axios.get("https://localhost:7241/api/Account/GetAllAccounts", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token1")}` },
          });
          accounts.value = response.data.data;
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };
  
      const fetchUniversities = async () => {
        try {
          const response = await axios.get("https://localhost:7241/api/University", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token1")}` },
          });
          universities.value = response.data.data;
        } catch (error) {
          console.error("Error fetching universities:", error);
        }
      };
  
      const getUniversityName = (id) => {
        const university = universities.value.find((uni) => uni.id === id);
        return university ? university.name : "N/A";
      };
  
      const submitForm = async () => {
        console.log('Form Data:', formData.value); // Logging form data
  
        try {
          const response = await axios.post(
            "https://localhost:7241/api/Account/register",
            formData.value,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token1")}` },
            }
          );
          console.log("Account created:", response.data);
          formData.value = {
            firstname: "",
            lastname: "",
            phone: "",
            birthDate: "",
            email: "",
            degree: "",
            gpa: "",
            univ_Id: "",
          };
          showModal.value = false;
          await fetchAccounts(); // Refresh account list after adding
        } catch (error) {
          console.error("Error creating account:", error);
        }
      };
  
      const totalItems = computed(() => accounts.value.length);
      const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
  
      const paginatedAccounts = computed(() => {
        const start = (currentPage.value - 1) * perPage.value;
        const end = start + perPage.value;
        return accounts.value.slice(start, end);
      });
  
      const changePage = (page) => {
        if (page < 1 || page > totalPages.value) return;
        currentPage.value = page;
      };
  
      const isFormValid = computed(() => {
        return Object.values(formData.value).every((value) => value !== "");
      });
  
      onMounted(() => {
        fetchAccounts();
        fetchUniversities();
      });
  
      return {
        showModal,
        accounts,
        universities,
        formData,
        currentPage,
        perPage,
        fetchAccounts,
        fetchUniversities,
        submitForm,
        getUniversityName,
        totalPages,
        paginatedAccounts,
        changePage,
        isFormValid,
      };
    },
  };
  </script>
  
  <style scoped>
  .register-page {
    padding: 20px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-box {
    background-color: white; /* Latar belakang modal putih */
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
  }
  
  .table {
    width: 100%;
  }
  
  input {
    background-color: white; /* Latar belakang input putih */
    border: 1px solid #ccc; /* Border input */
    border-radius: 4px; /* Sudut input */
    padding: 10px; /* Padding input */
    width: 100%; /* Lebar penuh */
    box-sizing: border-box; /* Menghitung padding dalam lebar */
  }
  
  .text-danger {
    color: red;
  }
  </style>
  
  