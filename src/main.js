import { createApp } from 'vue';
import './assets/css/main.css'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
// import { createToast, ToastPlugin } from 'vue-toastification';
// import 'vue-toastification/dist/index.css';

// const options = {
//     // Opsi-opsi bisa disesuaikan sesuai kebutuhan
//     timeout: 3000,
//     position: 'top-right',
//   };

const app = createApp(App)
app.use(router);
app.use(createPinia());
// // Menggunakan plugin Toast
// app.use(ToastPlugin, options);
app.mount('#app')