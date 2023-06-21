<template>
  <custom-card>
    <q-card-section class="full-height">
      <q-form
        class="column justify-between full-height"
        @submit="$emit('on-submit', userData)"
      >
        <div class="row q-col-gutter-xl">
          <custom-input
            v-model="userData.firstName"
            class="col-6"
            label="First Name"
            dense
            filled
          />
          <custom-input
            v-model="userData.lastName"
            class="col-6"
            label="Last Name"
            dense
            filled
          />
        </div>
        <div class="row">
          <custom-btn
            type="submit"
            color="primary"
            :label="editMode ? 'Update details' : 'Add user'"
            rounded
            filled
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
    editMode: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<User>,
      default: null,
    },
  },
  setup(props) {
    const userData = reactive({
      firstName: props.data?.first_name ?? '',
      lastName: props.data?.last_name ?? '',
    });

    watch(
      () => ({ ...props.data }),
      () => {
        userData.firstName = props.data.first_name;
        userData.lastName = props.data.last_name;
      }
    );

    return { userData };
  },
});
</script>
