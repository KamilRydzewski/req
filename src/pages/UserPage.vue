<template>
  <q-page class="row justify-between q-col-gutter-lg" style="min-height: 400px">
    <div class="col-md-6 col-xs-12">
      <user-form
        class="full-height"
        @on-submit="handleSubmit"
        :data="user"
        :edit-mode="userRouteParam != undefined"
        :is-loading="isLoading"
      />
    </div>
    <div class="col-md-6 col-xs-12">
      <user-card
        class="full-height"
        @on-image-change="handleChangedImage"
        :edit-mode="userRouteParam != undefined"
        :img-src="user.avatar"
        :is-loading="isLoading"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import UserForm from 'src/components/molecules/UserForm.vue';
import UserCard from 'src/components/molecules/UserCard.vue';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useUsers } from 'src/composables/useUsers';
import { User } from 'src/types';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UserPage',

  components: { UserForm, UserCard },
  setup() {
    const { users, createNewUser, getUser, updateUser } = useUsers();
    const user = reactive<User>({} as User);
    const route = useRoute();
    const isLoading = ref(false);
    const userRouteParam = computed(() =>
      !isNaN(Number(route.params?.id)) ? Number(route.params?.id) : undefined
    );

    const handleChangedImage = (imgUrl: string) => {
      user.avatar = imgUrl;
    };

    const handleSubmit = async (data: {
      firstName: string;
      lastName: string;
    }) => {
      const { firstName, lastName } = data;
      user.first_name = firstName;
      user.last_name = lastName;
      try {
        isLoading.value = true;
        if (userRouteParam.value) {
          updateUser(userRouteParam.value, user);
        } else {
          await createNewUser(user);
        }
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };

    const handleGetUserData = async () => {
      if (!userRouteParam.value) return;
      try {
        isLoading.value = true;
        const resp = await getUser(userRouteParam.value);
        user.first_name = resp.first_name;
        user.last_name = resp.last_name;
        user.avatar = resp.avatar;
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      handleGetUserData();
    });

    return {
      isLoading,
      userRouteParam,
      handleSubmit,
      handleChangedImage,
      users,
      user,
    };
  },
});
</script>
