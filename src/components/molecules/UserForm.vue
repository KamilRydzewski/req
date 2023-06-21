<template>
  <custom-card>
    <q-card-section class="full-height">
      <q-form
        id="userForm"
        class="column justify-between full-height"
        @submit.prevent="onSubmit"
      >
        <div class="row q-col-gutter-x-xl q-col-gutter-y-sm">
          <custom-input
            v-model="userData.firstName"
            class="col-md-6 col-xs-12"
            label="First Name"
            dense
            filled
            :disable="isLoading"
            lazy-rules
            :rules="[
              (val: string) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <custom-input
            v-model="userData.lastName"
            class="col-md-6 col-xs-12"
            label="Last Name"
            dense
            filled
            :disable="isLoading"
            lazy-rules
            :rules="[
              (val: string) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </div>
        <div class="row">
          <custom-btn
            form="userForm"
            type="submit"
            color="primary"
            :label="editMode ? 'Update details' : 'Add user'"
            rounded
            filled
            :disable="isLoading"
            :loading="isLoading"
          />
        </div>
      </q-form>
    </q-card-section>
  </custom-card>
</template>

<script lang="ts">
import { PropType, defineComponent, watch, reactive } from 'vue';
import CustomCard from 'src/components/atoms/CustomCard.vue';
import CustomInput from 'src/components/atoms/CustomInput.vue';
import CustomBtn from 'src/components/atoms/CustomButton.vue';
import { User } from 'src/types';

export default defineComponent({
  name: 'UserCard',
  components: {
    CustomCard,
    CustomBtn,
    CustomInput,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<User>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const userData = reactive({
      firstName: props.data?.first_name ?? '',
      lastName: props.data?.last_name ?? '',
    });

    watch(
      () => [{ ...props.data }],
      () => {
        userData.firstName = props.data?.first_name ?? '';
        userData.lastName = props.data?.last_name ?? '';
      }
    );

    watch(
      () => userData,
      () => {
        emit('on-change', userData);
      },
      { deep: true }
    );

    const onSubmit = () => {
      emit('on-submit', userData);
    };

    return { userData, onSubmit };
  },
});
</script>
