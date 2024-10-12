<template>
    <div class="container mx-auto p-6">
    <br />
    <div class="bg-white shadow-lg rounded-lg p-6 space-y-6">
    <button @click="showModal = true" class="btn btn-primary bg-blue-500 text-white">Register</button>

        <!-- Input Pencarian -->
        <div class="mb-4 flex justify-end">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search..." 
                class="w-1/4 p-1 border rounded shadow bg-white">
        </div>

    <div v-if="showModal" class="modal modal-open">
        <div class="modal-box">
        <h2 class="text-xl font-bold fas fa-plus"></h2>
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
                <input v-model="formData.phone" type="tel" class="input input-bordered" required pattern="[0-9]*" />
            </div>
            <div class="form-control mb-4">
                <label for="birthDate" class="label">
                    <span class="label-text">Birth Date<span class="text-danger">*</span></span>
                </label>
                <input v-model="formData.birthDate" type="date" class="input input-bordered" 
                    :max="maxBirthDate" required />
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
                <option value="" disabled>-- Select a Degree --</option>
                <option value="0">D3</option>
                <option value="1">D4</option>
                <option value="2">S1</option>
                <option value="3">S2</option>
                <option value="4">S3</option>
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
                <option value="" disabled>-- Select a University --</option>
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

    <div class="overflow-x-auto mt-4">
    <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr class="bg-gray-200">
                <th class="py-3 px-4 text-left" >No</th>
                <th class="py-3 px-4 text-left" >NIK</th>
                <th class="py-3 px-4 text-left" >Full Name</th>
                <th class="py-3 px-4 text-left" >Phone</th>
                <th class="py-3 px-4 text-left" >Birth Date</th>
                <th class="py-3 px-4 text-left" >Email</th>
                <th class="py-3 px-4 text-left" >Degree</th>
                <th class="py-3 px-4 text-left" >GPA</th>
                <th class="py-3 px-4 text-left" >University Name</th>
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
                <td class="border-b py-2 px-4">{{ account.univ_Name }}</td>
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
    </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2"; // Import SweetAlert2

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
        const perPage = ref(5);

        // Max birth date computed property
        const maxBirthDate = computed(() => {
        const today = new Date();
        // Tidak perlu mengatur jam di sini
        return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        });

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

        const submitForm = async () => {
            try {
                formData.value.gpa = parseFloat(formData.value.gpa);
                formData.value.degree = parseInt(formData.value.degree);
                await axios.post("https://localhost:7241/api/Account/register", formData.value, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token1")}` },
                });

                await fetchAccounts();
                showModal.value = false;
                resetForm();

                // SweetAlert for success
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Account registered successfully!',
                    confirmButtonColor: '#3085d6',
                    timer: 1500
                });
            } catch (error) {
                console.error("Error submitting form:", error);
                
                // SweetAlert for error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while registering the account.',
                    confirmButtonColor: '#d33'
                });
            }
        };

        const resetForm = () => {
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
        };

        const changePage = (page) => {
            currentPage.value = page;
        };

        const totalItems = computed(() => accounts.value.length);
        const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));
        const paginatedAccounts = computed(() => {
            const start = (currentPage.value - 1) * perPage.value;
            return accounts.value.slice(start, start + perPage.value);
        });

        const isFormValid = computed(() => {
            return (
                formData.value.firstname &&
                formData.value.lastname &&
                formData.value.phone &&
                formData.value.birthDate &&
                formData.value.email &&
                formData.value.degree &&
                !isNaN(formData.value.gpa) &&
                formData.value.univ_Id
            );
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
            submitForm,
            changePage,
            totalItems,
            totalPages,
            paginatedAccounts,
            isFormValid,
            maxBirthDate,
        };
    },
};
</script>


<style scoped>
</style>


