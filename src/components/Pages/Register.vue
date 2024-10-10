<template>
    <div class="container mx-auto p-6">
        <!-- <h1 class="text-4xl font-bold text-center my-10 text-blue-700">Register Account</h1> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <!-- <p class="text-center text-gray-600 mb-12">
            Isi data di bawah untuk mendaftar ke universitas yang Anda pilih.
        </p> -->

        <!-- Tombol untuk menambah universitas -->
        <div class="text-left mb-4">
            <button @click="addUniversity" class="bg-blue-500 text-white px-4 py-2 rounded" title="Tambah Universitas">
                <i class="fas fa-plus"></i>
            </button>
        </div>

        <!-- Tabel Daftar Universitas -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="py-3 px-4 text-left">No</th>
                        <th class="py-3 px-4 text-left">Universitas ID</th>
                        <th class="py-3 px-4 text-left">Nama Universitas</th>
                        <th class="py-3 px-4 text-left">GPA</th>
                        <th class="py-3 px-4 text-left">Degree</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(university, index) in universities" :key="university.id">
                        <td class="border-b py-2 px-4 text-center">{{ index + 1 }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ university.id }}</td>
                        <td class="border-b py-2 px-4">{{ university.name }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ university.gpa }}</td>
                        <td class="border-b py-2 px-4 text-center">{{ university.degree }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    setup() {
        const universities = [
            { id: 1, name: "Universitas Indonesia", gpa: 3.5, degree: "Sarjana" },
            { id: 2, name: "Institut Teknologi Bandung", gpa: 3.7, degree: "Magister" },
            { id: 3, name: "Universitas Gadjah Mada", gpa: 3.6, degree: "Doktor" }
        ];

        const addUniversity = () => {
            console.log("Add university");
        };

        return {
            universities,
            addUniversity
        };
    }
};
</script>

<style lang="scss" scoped>
.container {
    max-width: 1200px;
}

h1 {
    font-size: 2.5rem;
    color: #1a73e8;
}

.bg-white {
    background-color: #fff;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr:hover {
    background-color: #f1f1f1;
}

.fas {
    margin-right: 5px;
    font-size: 1.2rem;
}
</style>
