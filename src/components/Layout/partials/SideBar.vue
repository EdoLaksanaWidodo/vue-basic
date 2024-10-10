<template>
    <div>
        <div class="drawer z-50">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <NavBar />
                <!-- Page content here -->
            </div>

            <div class="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu bg-gray-800 text-gray-200 min-h-full w-80 p-6 space-y-4">
                    <!-- User Profile Section -->
                    <div class="flex items-center gap-3 mb-6">
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="User Avatar" />
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold">Username</p>
                            <p class="text-sm">user@example.com</p>
                        </div>
                    </div>
                    <!-- Sidebar content here -->
                    <li>
                        <router-link to="/dashboard" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18V3H3z" />
                            </svg>
                            <span>Dashboard</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/home" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18V3H3z" />
                            </svg>
                            <span>Home</span>
                        </router-link>
                    </li> -->
                    <li>
                        <router-link to="/about" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A4.992 4.992 0 005 20a5 5 0 0010 0c0-.597-.104-1.17-.294-1.707M15 5a5 5 0 00-10 0v4h10V5zM5 9v2a5 5 0 0010 0V9H5z" />
                            </svg>
                            <span>About</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/universitas" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18V3H3z" />
                            </svg>
                            <span>Universitas</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Register</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/accountRole" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m5-8h3a2 2 0 012 2v10a2 2 0 01-2 2h-3m-2-18H8a2 2 0 00-2 2v3" />
                            </svg>
                            <span>Account Role</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/role" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6h12v12H6z" />
                            </svg>
                            <span>Role</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
export default {
    components: {
        NavBar,
    },
    setup() {
        // Dummy data for user profile
        const user = {
            name: 'John Doe',
            email: 'user@example.com',
            avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        };

        return {
            user
        };
    },
};
</script>

<style lang="scss" scoped>
/* Add your scoped styles here */
</style>
