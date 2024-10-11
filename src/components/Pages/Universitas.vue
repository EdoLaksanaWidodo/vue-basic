<template>
    <div class="container mx-auto p-6">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <br>
        <!-- Tombol untuk menambah universitas -->
        <div class="text-left mb-4">
            <div class="relative inline-block">
                <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded" title="Tambah Universitas">
                    <i class="fas fa-plus"></i>
                </button>
                <span class="tooltip">Tambah Data</span>
            </div>
        </div>

        <!-- Input Pencarian -->
        <div class="mb-4 flex justify-end">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Cari Universitas..." 
                class="w-1/4 p-1 border rounded shadow bg-white">
        </div>

        <!-- Modal untuk tambah/edit universitas -->
        <dialog ref="myModal" class="modal">
            <div class="modal-box">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
                <form @submit.prevent="submitUniversity" id="universityForm" class="m-3">
                    <div class="mb-4">
                        <input v-model="university.id" type="text" placeholder="ID Universitas" class="hidden">
                    </div>
                    <div class="mb-4">
                        <label for="inputNama" class="block text-gray-700 font-semibold mb-2">Nama Universitas</label>
                        <input v-model="university.name" type="text" placeholder="Nama Universitas" class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="btn" :class="isEditing ? 'btn-warning' : 'btn-primary'">
                            {{ isEditing ? 'Edit' : 'Submit' }}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

        <!-- Tabel Daftar Universitas -->
        <div class="overflow-x-auto mt-4">
            <table class="min-w-full bg-white shadow-md rounded-lg">
                <thead class="text-black">
                    <tr class="bg-gray-200">
                        <th class="py-3 px-4 text-center">No</th>
                        <th class="py-3 px-4 text-center">Universitas ID</th>
                        <th class="py-3 px-4 text-center">Nama Universitas</th>
                        <th class="py-3 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="hover">
                    <tr v-for="(university, index) in filteredUniversities" :key="university.id" class="hover:bg-gray-50">
                        <td class="border-b py-2 px-4 text-center">{{ index + 1 + (currentPage - 1) * perPage }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ university.id }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ university.name }}</td>
                        <td class="border-b py-2 px-4 text-center">
                            <div class="relative inline-block">
                                <span class="tooltip">Edit</span>
                                <button @click="editUniversity(university)" class="btn btn-sm btn-warning mr-2" title="Edit">
                                <i class="fas fa-edit text-white"></i>
                                </button>
                            </div>
                            <div class="relative inline-block">
                                <span class="tooltip">Hapus</span>
                                <button @click="confirmDelete(university.id)" class="btn btn-sm btn-error" title="Delete">
                                <i class="fas fa-trash-alt text-white"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex justify-center mt-4">
            <button 
                @click="changePage(currentPage - 1)" 
                :disabled="currentPage === 1" 
                class="px-3 py-1 mx-1 rounded bg-red-500 text-white hover:bg-red-700"
                :class="{'opacity-50 cursor-not-allowed': currentPage === 1}">
                Previous
            </button>
            <span class="px-3 py-1 mx-1">{{ currentPage }} / {{ totalPages }}</span>
            <button 
                @click="changePage(currentPage + 1)" 
                :disabled="currentPage === totalPages || totalItems <= perPage" 
                class="px-3 py-1 mx-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages || totalItems <= perPage}">
                Next
            </button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            universities: [],
            university: {
                id: '',
                name: ''
            },
            searchQuery: '', // State untuk input pencarian
            isEditing: false,
            currentPage: 1,
            perPage: 5,
            totalItems: 0,
            totalPages: 0,
        };
    },
    mounted() {
        this.fetchUniversities();
    },

    computed: {
        filteredUniversities() {
            const filtered = this.universities.filter(university => 
                university.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            this.totalItems = filtered.length; // Update total item setelah filtering
            this.totalPages = Math.ceil(this.totalItems / this.perPage); // Update total halaman
            return filtered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        },
    },

    methods: {
        fetchUniversities() {
            axios
                .get('https://localhost:7241/api/University', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then((response) => {
                    this.universities = response.data.data;
                    this.totalItems = this.universities.length; // Menghitung total item
                    this.totalPages = Math.ceil(this.totalItems / this.perPage); // Menghitung total halaman
                    this.changePage(1);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchUniversityById(id) {
            return axios
                .get(`https://localhost:7241/api/University/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then((response) => {
                    return response.data.data;
                })
                .catch((error) => {
                    console.error('Error fetching university by ID:', error);
                });
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },

        openModal() {
            this.clearForm();
            this.isEditing = false;
            this.$refs.myModal.showModal();
        },
        closeModal() {
            this.$refs.myModal.close();
        },
        clearForm() {
            this.university = { id: '', name: '' };
        },
        submitUniversity() {
            if (this.isEditing) {
                this.updateUniversity();
            } else {
                this.addUniversity();
            }
        },
        addUniversity() {
            axios
                .post('https://localhost:7241/api/University/create', this.university, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then(() => {
                    this.fetchUniversities();
                    this.closeModal();
                    Swal.fire('Berhasil', 'Universitas berhasil ditambahkan!', 'success');
                })
                .catch((error) => {
                    console.error('Error adding university:', error);
                    Swal.fire('Gagal', 'Gagal menambahkan universitas!', 'error');
                });
        },
        editUniversity(university) {
            this.isEditing = true;
            this.fetchUniversityById(university.id).then((data) => {
                this.university = data;
                this.$refs.myModal.showModal();
            });
        },
        updateUniversity() {
            axios
                .put(`https://localhost:7241/api/University/${this.university.id}`, this.university, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then(() => {
                    this.fetchUniversities();
                    this.closeModal();
                    Swal.fire('Berhasil', 'Universitas berhasil diperbarui!', 'success');
                })
                .catch((error) => {
                    console.error('Error updating university:', error);
                    Swal.fire('Gagal', 'Gagal memperbarui universitas!', 'error');
                });
        },
        confirmDelete(id) {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: 'Data ini akan dihapus secara permanen!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUniversity(id);
                }
            });
        },
        deleteUniversity(id) {
            axios
                .delete(`https://localhost:7241/api/University/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then(() => {
                    this.fetchUniversities();
                    Swal.fire('Dihapus!', 'Universitas berhasil dihapus.', 'success');
                })
                .catch((error) => {
                    console.error('Error deleting university:', error);
                    Swal.fire('Gagal', 'Gagal menghapus universitas!', 'error');
                });
        },
    },
};
</script>

<style>
.tooltip {
    display: inline-block;
    position: absolute;
    bottom: 120%; /* Posisi di atas tombol */
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
}

.relative:hover .tooltip {
    opacity: 1;
}
</style>
