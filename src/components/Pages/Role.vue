<template>
    <div class="container mx-auto p-6">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <br>
        <!-- Tombol untuk menambah universitas -->
        <div class="text-left mb-4">
            <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded" title="Tambah Roles">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <!-- Input untuk mencari roles -->
        <div class="mb-4 flex justify-end">
            <label for="searchInput" class="block text-gray-700 font-semibold mb-2"></label>
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Cari berdasarkan nama roles" 
                class="w-1/4 p-1 border rounded shadow">
        </div>

        <!-- Modal untuk tambah/edit roles -->
        <dialog ref="myModal" class="modal">
            <div class="modal-box">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
                <form @submit.prevent="submitRole" id="rolesForm" class="m-3">
                    <div class="mb-4">
                        <input v-model="role.roleId" type="text" placeholder="ID roles" class="hidden">
                    </div>
                    <div class="mb-4">
                        <label for="inputRoles" class="block text-gray-700 font-semibold mb-2">Nama Roles</label>
                        <input v-model="role.roleName" type="text" placeholder="Nama Roles" class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="btn" :class="isEditing ? 'btn-warning' : 'btn-primary'">
                            {{ isEditing ? 'Edit' : 'Submit' }}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

        <!-- Tabel Daftar universitas -->
        <div class="overflow-x-auto mt-4">
            <table class="min-w-full bg-white shadow-md rounded-lg">
                <thead class="text-black">
                    <tr class="bg-gray-200">
                        <th class="py-3 px-4 text-center">No</th>
                        <th class="py-3 px-4 text-center">Role ID</th>
                        <th class="py-3 px-4 text-center">Nama Roles</th>
                        <th class="py-3 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="hover">
                    <tr v-for="(role, index) in computedRoles" :key="role.roleId" class="hover:bg-gray-50">
                        <td class="border-b py-2 px-4 text-center">{{ index + 1 + (currentPage - 1) * perPage }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ role.roleId }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ role.roleName }}</td>
                        <td class="border-b py-2 px-4 text-center">
                            <button @click="editRole(role)" class="btn btn-sm btn-warning mr-2" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button @click="confirmDelete(role.roleId)" class="btn btn-sm btn-error" title="Delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
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
            roles: [],
            role: {
                roleId: '',
                roleName: ''
            },
            isEditing: false,
            currentPage: 1,
            perPage: 5,
            totalItems: 0,
            totalPages: 0,
            searchQuery: '', // Tambahkan data untuk menyimpan input pencarian
        };
    },
    mounted() {
        this.fetchRoles();
    },

    computed: {
        computedRoles() {
            const start = (this.currentPage - 1) * this.perPage;
            const filteredRoles = this.roles.filter(role => 
                role.roleName.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            this.totalItems = filteredRoles.length; // Update total items
            this.totalPages = Math.ceil(this.totalItems / this.perPage); // Update total pages
            return filteredRoles.slice(start, start + this.perPage);
        },
    },

    methods: {
        fetchRoles() {
            axios
                .get('https://localhost:7241/api/Role', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then((response) => {
                    this.roles = response.data.data;
                    this.totalItems = this.roles.length; // Menghitung total item
                    this.totalPages = Math.ceil(this.totalItems / this.perPage); // Menghitung total halaman
                    this.changePage(1);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchRolesById(id) {
            return axios
                .get(`https://localhost:7241/api/Role/${id}`, {
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
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },
        openModal() {
            this.role = { roleId: '', roleName: '' };
            this.isEditing = false;
            this.$refs.myModal.showModal();
        },
        closeModal() {
            this.$refs.myModal.close();
        },
        submitRole() {
            if (this.isEditing) {
                this.updateRole();
            } else {
                this.createRole();
            }
        },
        createRole() {
            axios
                .post('https://localhost:7241/api/Role', this.role, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then((response) => {
                    this.roles.push(response.data.data);
                    this.closeModal();
                    Swal.fire('Success', 'Role created successfully!', 'success');
                })
                .catch((error) => {
                    console.error('Error creating role:', error);
                });
        },
        editRole(role) {
            this.role = { ...role };
            this.isEditing = true;
            this.$refs.myModal.showModal();
        },
        updateRole() {
            axios
                .put(`https://localhost:7241/api/Role/${this.role.roleId}`, this.role, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then((response) => {
                    const index = this.roles.findIndex(r => r.roleId === this.role.roleId);
                    this.$set(this.roles, index, response.data.data);
                    this.closeModal();
                    Swal.fire('Success', 'Role updated successfully!', 'success');
                })
                .catch((error) => {
                    console.error('Error updating role:', error);
                });
        },
        confirmDelete(roleId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'This will delete the role permanently!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteRole(roleId);
                }
            });
        },
        deleteRole(roleId) {
            axios
                .delete(`https://localhost:7241/api/Role/${roleId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token1')
                    }
                })
                .then(() => {
                    this.roles = this.roles.filter(role => role.roleId !== roleId);
                    Swal.fire('Deleted!', 'Role has been deleted.', 'success');
                })
                .catch((error) => {
                    console.error('Error deleting role:', error);
                });
        },
    }
};
</script>

<style scoped>
.modal {
    /* Style untuk modal */
}
</style>
