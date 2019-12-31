import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/public.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/index.vue') },
      { name: 'about', path: 'a-propos', component: () => import('pages/about.vue') },
      { name: 'profile', path: 'mon-profil', component: () => import('pages/profile.vue') },
      { name: 'signin', path: 'connexion', component: () => import('pages/signin.vue') },
      { name: 'signup', path: 'inscription', component: () => import('pages/signup.vue') },
      { name: 'verifyEmail', path: 'verify-email/:token', component: () => import('pages/verify-email.vue'), props: true },
    ],
  },
];

if (process.env.MODE !== 'ssr') routes[0].children!.push({ path: '*', component: () => import('pages/error404.vue') });

export default routes;
