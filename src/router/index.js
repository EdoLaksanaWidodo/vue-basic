import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import MainLayout from '../components/Layout/partials/MainLayout.vue';
import Home from '../components/Pages/Home.vue';
import About from '../components/Pages/About.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true,
  },
  {
    path: '/dashboard',
    name: 'dashboard', // Nama harus lowercase
    component: Dashboard,
    props: (route) =>({
        email: route.query.email
    }),
  },
  {
    path: '/',
    component: MainLayout,
    children: [{
        path: "home",
        name: "home",
        component: Home,
    },
    {
        path: "about",
        name: "about",
        component: About,
    }]
  }  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router