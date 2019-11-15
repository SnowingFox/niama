import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/public.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/index.vue') },
      { name: 'about', path: 'a-propos', component: () => import('pages/about.vue') },
      { name: 'contact', path: 'contact', component: () => import('pages/contact.vue') },
      {
        path: 'articles',
        component: () => import('layouts/common.vue'),
        children: [
          { name: 'posts', path: '', component: () => import('pages/posts.vue') },
          { name: 'post', path: ':id', component: () => import('pages/post.vue') },
        ],
      },
    ],
  },
];

if (process.env.MODE !== 'ssr') routes.push({ path: '*', component: () => import('pages/error404.vue') });

export default routes;
