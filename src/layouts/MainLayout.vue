<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> </q-header>

    <q-page-container class="bg-grey-3" style="min-height: 100vh">
      <div class="q-pa-xl">
        <h1 class="q-ma-none text-h3 q-mb-lg">{{ pathNames[routeName] }}</h1>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { Page } from 'src/types/index';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const route = useRoute();
    const routeName = computed(() => route?.name ?? 'unknown');

    const pathNames = {
      ['unknown']: '-',
      [Page.USER_LIST]: 'User list',
      [Page.USER_CREATE]: 'Add User',
      [Page.USER]: 'User',
    };
    return {
      routeName,
      pathNames,
    };
  },
});
</script>
