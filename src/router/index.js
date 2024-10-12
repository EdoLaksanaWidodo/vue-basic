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
import NotFound from '../components/Pages/NotFound.vue';
import Swal from 'sweetalert2';

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token1');
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next({ name: 'dashboard' });
      } else {
        next();
      }
    },
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
          next({ name: 'Login' });
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
              next({ name: 'Login' });
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
              next({ name: 'Login' });
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
              next({ name: 'Login' });
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
              next({ name: 'Login' });
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
              next({ name: 'Login' });
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
              next({ name: 'Login' });
            });
          } else {
            next();
          }
        },
      },
    ]
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for handling 404
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
