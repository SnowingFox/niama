import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/public.vue'),
    children: [
      { name: 'contact', path: 'contact', component: () => import('pages/contact.vue') },
      { name: 'index', path: '', component: () => import('pages/index.vue') },
    ],
  },
];

if (process.env.MODE !== 'ssr') routes[0].children!.push({ path: '*', component: () => import('pages/error404.vue') });

export default routes;
