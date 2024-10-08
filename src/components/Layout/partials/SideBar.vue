<template>
    <div>
        <div class="drawer">
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
                        <a href="#dashboard" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18V3H3z" />
                            </svg>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#profile" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A4.992 4.992 0 005 20a5 5 0 0010 0c0-.597-.104-1.17-.294-1.707M15 5a5 5 0 00-10 0v4h10V5zM5 9v2a5 5 0 0010 0V9H5z" />
                            </svg>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="#settings" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.428 4.5H5a1.5 1.5 0 00-1.5 1.5v10a1.5 1.5 0 001.5 1.5h14a1.5 1.5 0 001.5-1.5v-5.03a1.5 1.5 0 00-1.5-1.5H14.57M9 7v10m5-5h5" />
                            </svg>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#logout" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m8 4l-4-4m4-4l-4 4M19 12h2a2 2 0 002-2V8a2 2 0 00-2-2h-3V3a1 1 0 00-1.514-.857l-8.243 6A1 1 0 005 10v4a1 1 0 001 1h11a1 1 0 001-1v-2z" />
                            </svg>
                            <span>Logout</span>
                        </a>
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
