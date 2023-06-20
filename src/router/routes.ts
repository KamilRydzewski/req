import { Page } from 'src/types';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {

    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: Page.USER_LIST,component: () => import('pages/ListPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
