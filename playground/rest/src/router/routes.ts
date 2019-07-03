import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/public.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/index.vue') },
      {
        path: 'articles',
        component: () => import('layouts/common.vue'),
        children: [
          {
            name: 'posts',
            path: '',
            component: () => import('pages/posts.vue'),
            meta: { breadcrumbs: [{ icon: 'home', to: '/' }, { label: 'Articles' }] },
          },
          {
            name: 'post',
            path: ':id',
            component: () => import('pages/post.vue'),
            meta: { breadcrumbs: [{ icon: 'home', to: '/' }, { label: 'Articles', to: '/articles' }] },
          },
        ],
      },
    ],
  },
];

if (process.env.MODE !== 'ssr') routes.push({ path: '*', component: () => import('pages/404.vue') });

export default routes;
