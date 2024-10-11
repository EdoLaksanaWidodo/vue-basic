<template>
    <div class="w-screen navbar bg-base-100 justify-between">
        <div class="flex items-center">
            <label for="my-drawer" class="btn btn-primary drawer-button p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </label>
            <a class="btn btn-ghost text-xl">Terizla </a>
        </div>

        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li @click="logout"><a>Logout</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
    setup () {
        const router = useRouter();

        const logout = () => {
            Swal.fire({
                toast: true,
                position: 'top-right',
                icon: 'info',
                title: 'Logout berhasil',
                showConfirmButton: false,
                timer: 1500
            });

            // Menghapus semua data dari localStorage
            localStorage.removeItem('userFullName');
            localStorage.removeItem('token1');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('nik');
            localStorage.removeItem('roles');

            // Mengalihkan ke halaman login setelah 1.5 detik
            setTimeout(() => {
                router.push({ name: 'Login' });
            }, 1500);
        };

        return { logout };
    }
}
</script>

<style lang="scss" scoped>
/* Tambahkan style scoped Anda di sini */
</style>
