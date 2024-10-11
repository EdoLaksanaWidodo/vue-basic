import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import MainLayout from '../components/Layout/partials/MainLayout.vue';
import Home from '../components/Pages/Home.vue';
import About from '../components/Pages/About.vue';
import Universitas from '../components/Pages/Universitas.vue';
import Register from '../components/Pages/Register.vue';
import Role from '../components/Pages/Role.vue';
import AkunRole from '../components/Pages/AkunRole.vue';
import Swal from 'sweetalert2';

// Middleware untuk memeriksa autentikasi
const isAuthenticated = () => {
  return !!localStorage.getItem('token1'); // Ganti 'token1' dengan kunci yang sesuai
};

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: (route) => ({
      email: route.query.email
    }),
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        Swal.fire({
          icon: 'error',
          title: 'Akses Ditolak',
          text: 'Anda harus login untuk mengakses halaman ini',
        }).then(() => {
          next({ name: 'Login' }); // Arahkan ke halaman login
        });
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            Swal.fire({
              icon: 'error',
              title: 'Akses Ditolak',
              text: 'Anda harus login untuk mengakses halaman ini',
            }).then(() => {
              next({ name: 'Login' }); // Arahkan ke halaman login
            });
          } else {
            next();
          }
        },
      },
      {
        path: "about",
        name: "about",
        component: About,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            Swal.fire({
              icon: 'error',
              title: 'Akses Ditolak',
              text: 'Anda harus login untuk mengakses halaman ini',
            }).then(() => {
              next({ name: 'Login' }); // Arahkan ke halaman login
            });
          } else {
            next();
          }
        },
      },
      {
        path: "universitas",
        name: "universitas",
        component: Universitas,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            Swal.fire({
              icon: 'error',
              title: 'Akses Ditolak',
              text: 'Anda harus login untuk mengakses halaman ini',
            }).then(() => {
              next({ name: 'Login' }); // Arahkan ke halaman login
            });
          } else {
            next();
          }
        },
      },
      {
        path: "register",
        name: "register",
        component: Register,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            Swal.fire({
              icon: 'error',
              title: 'Akses Ditolak',
              text: 'Anda harus login untuk mengakses halaman ini',
            }).then(() => {
              next({ name: 'Login' }); // Arahkan ke halaman login
            });
          } else {
            next();
          }
        },
      },
      {
        path: "role",
        name: "role",
        component: Role,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            Swal.fire({
              icon: 'error',
              title: 'Akses Ditolak',
              text: 'Anda harus login untuk mengakses halaman ini',
            }).then(() => {
              next({ name: 'Login' }); // Arahkan ke halaman login
            });
          } else {
            next();
          }
        },
      },
      {
        path: "accountRole",
        name: "accountRole",
        component: AkunRole,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            Swal.fire({
              icon: 'error',
              title: 'Akses Ditolak',
              text: 'Anda harus login untuk mengakses halaman ini',
            }).then(() => {
              next({ name: 'Login' }); // Arahkan ke halaman login
            });
          } else {
            next();
          }
        },
      },
    ]
  }  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
