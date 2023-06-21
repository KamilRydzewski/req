import { Page } from 'src/types';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: Page.USER_LIST } },
      {
        path: '/users',
        name: Page.USER_LIST,
        component: () => import('pages/UserListPage.vue'),
      },
      {
        path: '/create',
        name: Page.USER_CREATE,
        component: () => import('pages/UserPage.vue'),
      },
      {
        path: '/users/:id',
        name: Page.USER,
        component: () => import('pages/UserPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
