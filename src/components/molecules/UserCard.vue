<template>
  <custom-card>
    <q-card-section class="full-height column items-center">
      <div
        class="q-mb-xl"
        style="
          overflow: hidden;
          border-radius: 50%;
          width: 150px;
          height: 150px;
        "
      >
        <q-img
          width="150px"
          height="150px"
          :src="uploadedImage"
          loading="lazy"
        />
      </div>
      <custom-btn
        @click="runPrompt"
        class="full-width q-mt-auto"
        color="primary"
        label="Change photo"
        outline
        icon="camera_alt"
        :disable="isLoading"
      />
    </q-card-section>
  </custom-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import CustomCard from 'src/components/atoms/CustomCard.vue';
import CustomBtn from 'src/components/atoms/CustomButton.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'UserCard',
  components: {
    CustomCard,
    CustomBtn,
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
    imgSrc: {
      type: String,
      default: 'https://cdn.quasar.dev/img/boy-avatar.png',
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const uploadedImage = ref<string>(props.imgSrc);

    const runPrompt = () => {
      $q.dialog({
        message: 'Image Url',
        prompt: {
          model: uploadedImage.value,
          type: 'text',
        },
        cancel: true,
        persistent: true,
      })
        .onOk((data) => {
          uploadedImage.value = data;
          emit('on-image-change', uploadedImage.value);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    onMounted(() => {
      //sending default img
      if (!props.editMode) {
        emit('on-image-change', uploadedImage.value);
      }
    });

    watch(
      () => props.imgSrc,
      () => {
        uploadedImage.value = props.imgSrc;
      }
    );

    return {
      runPrompt,
      uploadedImage,
    };
  },
});
</script>
