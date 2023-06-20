<template>
  <q-page class="row items-center justify-evenly">
    <template v-for="user in users" :key="user.email">
      <p>
        {{ user.email }}
      </p>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUsers } from 'src/composables/useUsers';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const { getAllUsers, users } = useUsers();
    onMounted(async () => {
      await getAllUsers();
    });
    return {
      users,
    };
  },
});
</script>
